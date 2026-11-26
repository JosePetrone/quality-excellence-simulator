import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { test, type TestContext } from "node:test";
import { startPilot } from "../scripts/serve-pilot.mjs";
import { provisionPilot, rotateInstructor } from "../src/pilot-store.mjs";

const zero = { training: 0, process: 0, complaints: 0, technology: 0, risk: 0 };
const teamA = { ...zero, complaints: 3 };
const teamB = { ...zero, training: 1, process: 2, technology: 1, risk: 1 };

async function setup(t: TestContext) {
  const directory = mkdtempSync(join(tmpdir(), "qualityedge-pilot-"));
  const path = join(directory, "pilot.sqlite");
  let server: Awaited<ReturnType<typeof startPilot>> | undefined;
  async function stop() {
    if (!server) return;
    const current = server;
    server = undefined;
    await new Promise<void>((resolve, reject) => {
      current.close((error) => error ? reject(error) : resolve());
    });
  }
  t.after(async () => {
    await stop();
    rmSync(directory, { recursive: true, force: true });
  });
  const credentials = provisionPilot(path, ["Cedar", "Maple"]);
  async function restart() {
    await stop();
    server = await startPilot(path, 0);
  }
  await restart();

  function inspect<T>(read: (db: DatabaseSync) => T): T {
    const db = new DatabaseSync(path);
    try {
      return read(db);
    } finally {
      db.close();
    }
  }
  async function call(credential: string | undefined, route = "session", input?: object) {
    const address = server?.address();
    assert.ok(address && typeof address === "object");
    const headers: Record<string, string> = {};
    if (credential) headers.Authorization = "Bearer " + credential;
    if (input) headers["Content-Type"] = "application/json";
    const response = await fetch("http://127.0.0.1:" + address.port + "/api/" + route, {
      method: input ? "POST" : "GET",
      headers,
      body: input ? JSON.stringify(input) : undefined,
    });
    assert.match(response.headers.get("cache-control") ?? "", /no-store/);
    return { status: response.status, body: await response.json() };
  }
  async function ok(credential: string, route?: string, input?: object) {
    const response = await call(credential, route, input);
    assert.equal(response.status, 200, JSON.stringify(response.body));
    return response.body;
  }
  return { path, credentials, inspect, restart, call, ok };
}

test("provisioning, credential expiry and both rotation paths enforce distinct access", async (t) => {
  const { credentials: { instructor, a, b }, path, inspect, call, ok } = await setup(t);
  assert.equal(new Set([instructor, a, b]).size, 3);
  assert.equal((await call(undefined)).status, 401);
  assert.equal((await call("not-a-valid-credential")).status, 401);
  assert.equal((await ok(instructor)).role, "instructor");
  assert.equal((await ok(a)).alias, "Cedar");
  assert.equal((await ok(b)).alias, "Maple");
  const rows = inspect((db) => db.prepare("SELECT role, digest, expires_at FROM pilot_credentials").all());
  assert.equal(rows.length, 3);
  const now = Date.now();
  for (const row of rows) {
    assert.ok(![instructor, a, b].includes(row.digest as string));
    assert.ok(Number(row.expires_at) > now + 23 * 60 * 60 * 1000);
    assert.ok(Number(row.expires_at) <= now + 24 * 60 * 60 * 1000);
  }
  inspect((db) => db.prepare("UPDATE pilot_credentials SET expires_at = ? WHERE role = 'a'").run(0));
  assert.equal((await call(a)).status, 401);
  const { credential: newB } = await ok(instructor, "rotate-team", { teamId: "b" });
  assert.equal((await call(b)).status, 401);
  assert.equal((await ok(newB)).alias, "Maple");
  const newInstructor = rotateInstructor(path);
  assert.equal((await call(instructor)).status, 401);
  assert.equal((await ok(newInstructor)).role, "instructor");
});

test("team API responses enforce server-side isolation before and after publication", async (t) => {
  const { credentials: { instructor, a, b }, call, ok } = await setup(t);
  for (const [route, input] of [
    ["resolve", { quarter: 1 }],
    ["publish", { quarter: 1 }],
    ["rotate-team", { teamId: "b" }],
  ] as const) {
    assert.equal((await call(a, route, input)).status, 403);
  }
  assert.ok([400, 404].includes((await call(a, "session?teamId=b")).status));
  assert.equal((await call(a, "submit", { quarter: 1, teamId: "b", decision: teamA })).status, 400);
  assert.equal((await ok(b)).decision, null);
  await ok(a, "submit", { quarter: 1, decision: teamA });
  await ok(b, "submit", { quarter: 1, decision: teamB });
  const resolved = await ok(instructor, "resolve", { quarter: 1 });
  assert.equal(resolved.rounds[0].teams.length, 2);
  assert.deepEqual(resolved.rounds[0].teams[0].decision, teamA);
  assert.deepEqual(resolved.rounds[0].teams[1].decision, teamB);
  const [aResult, bResult] = resolved.rounds[0].teams.map(({ result }) => result);
  assert.notEqual(aResult.qes, bResult.qes);
  const parties = [[a, teamA, aResult], [b, teamB, bResult]];
  for (const [credential, decision] of parties) {
    const snapshot = await ok(credential);
    assert.deepEqual(Object.keys(snapshot).sort(), ["alias", "budget", "decision", "phase", "published", "quarter", "role", "rounds"]);
    assert.deepEqual(snapshot.decision, decision);
    assert.deepEqual(snapshot.budget, { cash: 100_000, authority: 50_000 });
    assert.deepEqual(snapshot.rounds, []);
    assert.deepEqual(snapshot.published, []);
  }
  await ok(instructor, "publish", { quarter: 1 });
  for (const [credential, decision, result] of parties) {
    const snapshot = await ok(credential);
    assert.deepEqual(Object.keys(snapshot).sort(), ["alias", "budget", "decision", "phase", "published", "quarter", "role", "rounds"]);
    assert.deepEqual(snapshot.rounds, [{ quarter: 1, decision, result }]);
    assert.deepEqual(snapshot.published, [{
      quarter: 1,
      teams: [{ alias: "Cedar", qes: aResult.qes }, { alias: "Maple", qes: bResult.qes }],
    }]);
  }
});

test("validation, immutable decisions and concurrent commands progress each team once", async (t) => {
  const { credentials: { instructor, a, b }, inspect, call, ok } = await setup(t);
  assert.deepEqual((await ok(a)).budget, { cash: 100_000, authority: 50_000 });
  assert.equal((await call(a, "submit", { quarter: 1, decision: { ...zero, training: 5, process: 1 } })).status, 400);
  assert.equal((await call(a, "submit", { quarter: 1, decision: { training: 0 } })).status, 400);
  assert.equal((await ok(a)).decision, null);
  assert.equal((await call(instructor, "publish", { quarter: 1 })).status, 409);
  await ok(a, "submit", { quarter: 1, decision: teamA });
  assert.ok([200, 409].includes((await call(a, "submit", { quarter: 1, decision: teamA })).status));
  assert.equal((await call(a, "submit", { quarter: 1, decision: zero })).status, 409);
  assert.deepEqual((await ok(a)).decision, teamA);
  assert.equal((await call(instructor, "resolve", { quarter: 1 })).status, 409);
  await ok(b, "submit", { quarter: 1, decision: teamB });
  const resolutions = await Promise.all([
    call(instructor, "resolve", { quarter: 1 }),
    call(instructor, "resolve", { quarter: 1 }),
  ]);
  assert.deepEqual(resolutions.map(({ status }) => status).sort(), [200, 409]);
  const state = inspect((db) => JSON.parse(db.prepare("SELECT state FROM pilot_session").get()?.state as string));
  assert.equal(state.rounds.length, 1);
  assert.equal(state.rounds[0].quarter, 1);
  assert.equal(state.rounds[0].teams.length, 2);
  assert.deepEqual(state.teams.map(({ state }) => state.nextQuarter), [2, 2]);
  await ok(instructor, "publish", { quarter: 1 });
  const after = await ok(b);
  assert.equal(after.quarter, 2);
  assert.equal((await call(instructor, "publish", { quarter: 1 })).status, 409);
  assert.equal((await call(a, "submit", { quarter: 1, decision: zero })).status, 409);
  assert.equal((await call(instructor, "resolve", { quarter: 1 })).status, 409);
  assert.deepEqual(await ok(b), after);
  await ok(a, "submit", { quarter: 2, decision: zero });
  await ok(b, "submit", { quarter: 2, decision: zero });
  const q2 = (await ok(instructor, "resolve", { quarter: 2 })).rounds[1].teams[1].result;
  assert.equal(q2.finances.closingCash, 175_000);
  assert.equal(q2.kpis.onTimePercent, 91);
  assert.equal(q2.qes, 79.41);
});

test("restart retains lone acceptance, resolved protection, published history and terminal quarter", async (t) => {
  const { credentials: { instructor, a, b }, inspect, restart, call, ok } = await setup(t);
  async function rejectCorruptCheckpoint(jsonPath: string) {
    const checkpoint = inspect((db) => {
      const row = db.prepare("SELECT state FROM pilot_session WHERE id = 1").get();
      assert.equal(typeof row?.state, "string");
      db.prepare("UPDATE pilot_session SET state = json_remove(state, ?) WHERE id = 1").run(jsonPath);
      return row!.state;
    });
    try {
      await assert.rejects(restart(), /Unreadable or unsupported pilot state/);
    } finally {
      inspect((db) => db.prepare("UPDATE pilot_session SET state = ? WHERE id = 1").run(checkpoint));
    }
    await restart();
  }

  await ok(a, "submit", { quarter: 1, decision: teamA });
  await rejectCorruptCheckpoint("$.teams[0].decision");
  assert.deepEqual((await ok(a)).decision, teamA);
  assert.equal((await ok(b)).decision, null);
  assert.equal((await call(instructor, "resolve", { quarter: 1 })).status, 409);
  await ok(b, "submit", { quarter: 1, decision: teamB });
  const resolved = await ok(instructor, "resolve", { quarter: 1 });
  await rejectCorruptCheckpoint("$.teams[1].state.pending");
  await rejectCorruptCheckpoint("$.rounds[0].teams[1].result.finances");
  assert.deepEqual(await ok(instructor), resolved);
  assert.deepEqual((await ok(a)).rounds, []);
  assert.deepEqual((await ok(b)).published, []);
  await ok(instructor, "publish", { quarter: 1 });
  const afterRelease = await ok(b);
  await restart();
  assert.deepEqual(await ok(b), afterRelease);
  assert.equal(afterRelease.quarter, 2);
  assert.equal(afterRelease.published.length, 1);
  for (let quarter = 2; quarter <= 6; quarter++) {
    await ok(a, "submit", { quarter, decision: zero });
    await ok(b, "submit", { quarter, decision: zero });
    const snapshot = await ok(instructor, "resolve", { quarter });
    if (quarter === 2) {
      const q2 = snapshot.rounds[1].teams[1].result;
      assert.equal(q2.finances.closingCash, 175_000);
      assert.equal(q2.kpis.onTimePercent, 91);
      assert.equal(q2.qes, 79.41);
    }
    await ok(instructor, "publish", { quarter });
  }
  const complete = await ok(b);
  assert.equal(complete.phase, "complete");
  assert.equal(complete.quarter, 6);
  assert.equal(complete.budget, null);
  assert.deepEqual(complete.published.map(({ quarter }) => quarter), [1, 2, 3, 4, 5, 6]);
  assert.equal((await call(b, "submit", { quarter: 7, decision: zero })).status, 409);
});

test("database failure after a resolution write rolls back all state before a clean retry", async (t) => {
  const { credentials: { instructor, a, b }, inspect, call, ok } = await setup(t);
  await ok(a, "submit", { quarter: 1, decision: teamA });
  await ok(b, "submit", { quarter: 1, decision: teamB });
  const before = await ok(instructor);
  inspect((db) => db.exec(`
    CREATE TRIGGER reject_resolution AFTER UPDATE ON pilot_session
    BEGIN
      SELECT RAISE(ABORT, 'injected transaction failure');
    END;
  `));
  assert.equal((await call(instructor, "resolve", { quarter: 1 })).status, 500);
  assert.deepEqual(await ok(instructor), before);
  assert.deepEqual((await ok(b)).rounds, []);
  inspect((db) => db.exec("DROP TRIGGER reject_resolution"));
  const recovered = await ok(instructor, "resolve", { quarter: 1 });
  assert.equal(recovered.phase, "resolved");
  assert.equal(recovered.rounds.length, 1);
  assert.equal(recovered.rounds[0].teams.length, 2);
});
