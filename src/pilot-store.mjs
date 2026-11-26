import { createHash, randomBytes } from "node:crypto";
import { closeSync, openSync, realpathSync, statSync } from "node:fs";
import { dirname, isAbsolute, relative, sep } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { availableAllowance, initialTeamState, QUARTERS, resolveQuarter, RULESET_VERSION } from "./simulation.ts";

const repository = realpathSync(fileURLToPath(new URL("../", import.meta.url)));
const lifetime = 24 * 60 * 60 * 1000;
const decisionKeys = ["training", "process", "complaints", "technology", "risk"];

export class PilotError extends Error {
  constructor(status, code) {
    super(code);
    this.status = status;
  }
}

function assertOutsideRepository(path) {
  const location = relative(repository, path);
  if (location === "" || (!isAbsolute(location) && location !== ".." && !location.startsWith(".." + sep))) {
    throw new Error("Database path must be outside the repository.");
  }
}

function databasePath(path, create = false) {
  if (typeof path !== "string" || !isAbsolute(path)) {
    throw new Error("Use an absolute database path outside the repository.");
  }
  assertOutsideRepository(path);
  assertOutsideRepository(realpathSync(dirname(path)));
  if (create) {
    closeSync(openSync(path, "wx", 0o600));
  }
  const resolved = realpathSync(path);
  assertOutsideRepository(resolved);
  const stats = statSync(resolved);
  if (!stats.isFile() || stats.nlink !== 1) throw new Error("Use a regular, unlinked database file.");
  return resolved;
}

function openDatabase(path, create = false) {
  const db = new DatabaseSync(databasePath(path, create));
  db.exec("PRAGMA busy_timeout = 5000");
  return db;
}

function transaction(db, mode, work) {
  db.exec(mode);
  try {
    const value = work();
    db.exec("COMMIT");
    return value;
  } catch (error) {
    if (db.isTransaction) db.exec("ROLLBACK");
    throw error;
  }
}

function digest(credential) {
  return createHash("sha256").update(credential).digest();
}

function issue(db, role) {
  const credential = randomBytes(32).toString("base64url");
  db.prepare(`
    INSERT INTO pilot_credentials(role, digest, expires_at) VALUES (?, ?, ?)
    ON CONFLICT(role) DO UPDATE SET digest = excluded.digest, expires_at = excluded.expires_at
  `).run(role, digest(credential), Date.now() + lifetime);
  return credential;
}

function identify(db, credential) {
  if (typeof credential !== "string" || !/^[A-Za-z0-9_-]{43}$/.test(credential)) {
    throw new PilotError(401, "invalid-credential");
  }
  const entry = db.prepare("SELECT role FROM pilot_credentials WHERE digest = ? AND expires_at > ?")
    .get(digest(credential), Date.now());
  if (!entry) throw new PilotError(401, "invalid-credential");
  return entry.role;
}

function normalizeAliases(aliases) {
  if (!Array.isArray(aliases) || aliases.length !== 2 || aliases.some(alias => typeof alias !== "string")) {
    throw new Error("Supply two distinct team aliases.");
  }
  const normalized = aliases.map(alias => alias.trim().normalize("NFC"));
  if (normalized.some(alias => !alias || alias.length > 40 || /\p{C}/u.test(alias))
    || normalized[0].toLowerCase() === normalized[1].toLowerCase()) {
    throw new Error("Supply two distinct team aliases of 1 to 40 characters without control characters.");
  }
  return normalized;
}

export function provisionPilot(path, aliases) {
  const teamAliases = normalizeAliases(aliases);
  const db = openDatabase(path, true);
  try {
    return transaction(db, "BEGIN IMMEDIATE", () => {
      db.exec(`
        CREATE TABLE pilot_session (id INTEGER PRIMARY KEY CHECK(id = 1), state TEXT NOT NULL) STRICT;
        CREATE TABLE pilot_credentials (
          role TEXT PRIMARY KEY CHECK(role IN ('instructor', 'a', 'b')),
          digest BLOB UNIQUE NOT NULL CHECK(length(digest) = 32),
          expires_at INTEGER NOT NULL
        ) STRICT;
      `);
      const state = {
        version: 1, rulesetVersion: RULESET_VERSION, quarter: 1, phase: "open",
        teams: ["a", "b"].map((id, index) => ({
          id, alias: teamAliases[index], decision: null, state: initialTeamState(),
        })),
        rounds: [],
      };
      db.prepare("INSERT INTO pilot_session VALUES (1, ?)").run(JSON.stringify(state));
      return { instructor: issue(db, "instructor"), a: issue(db, "a"), b: issue(db, "b") };
    });
  } finally {
    db.close();
  }
}

function checkpointMatches(session, team, slot) {
  let state = initialTeamState();
  for (const round of session.rounds) {
    const { decision, result } = round.teams[slot];
    if (!exactKeys(decision, decisionKeys)) return false;
    const outcome = resolveQuarter(state, decision);
    if (!outcome.ok || !isDeepStrictEqual(outcome.result, result)) return false;
    state = outcome.nextState;
  }
  if (!isDeepStrictEqual(team.state, state) || !Object.hasOwn(team, "decision")) return false;
  if (session.phase === "resolved") {
    return isDeepStrictEqual(team.decision, session.rounds.at(-1).teams[slot].decision);
  }
  if (session.phase === "complete") return team.decision === null;
  return team.decision === null || (exactKeys(team.decision, decisionKeys) && resolveQuarter(state, team.decision).ok);
}

function load(db) {
  const stored = db.prepare("SELECT state FROM pilot_session WHERE id = 1").get();
  const session = JSON.parse(stored?.state ?? "null");
  if (!session || session.version !== 1 || session.rulesetVersion !== RULESET_VERSION
    || !Number.isInteger(session.quarter) || session.quarter < 1 || session.quarter > QUARTERS
    || !["open", "resolved", "complete"].includes(session.phase)
    || (session.phase === "complete" && session.quarter !== QUARTERS)
    || !Array.isArray(session.teams) || session.teams.length !== 2
    || session.teams.some((team, index) => !exactKeys(team, ["id", "alias", "decision", "state"])
      || team.id !== ["a", "b"][index] || typeof team.alias !== "string")
    || !Array.isArray(session.rounds)
    || session.rounds.length !== session.quarter - Number(session.phase === "open")
    || session.rounds.some((round, index) => !exactKeys(round, ["quarter", "published", "teams"])
      || round.quarter !== index + 1
      || round.published !== (session.phase !== "resolved" || index < session.rounds.length - 1)
      || !Array.isArray(round.teams) || round.teams.length !== 2
      || round.teams.some((team, slot) => !exactKeys(team, ["id", "alias", "decision", "result"])
        || team.id !== session.teams[slot].id || team.alias !== session.teams[slot].alias))
    || session.teams.some((team, slot) => !checkpointMatches(session, team, slot))) {
    throw new Error("Unreadable or unsupported pilot state.");
  }
  return session;
}

export function rotateInstructor(path) {
  const db = openDatabase(path);
  try {
    return transaction(db, "BEGIN IMMEDIATE", () => {
      load(db);
      return issue(db, "instructor");
    });
  } finally {
    db.close();
  }
}

function snapshot(session, role) {
  const { phase, quarter, teams, rounds } = session;
  if (role === "instructor") {
    return {
      role, phase, quarter,
      teams: teams.map(({ id, alias, decision }) => ({ id, alias, decision })),
      rounds,
    };
  }
  const team = teams.find(({ id }) => id === role);
  const published = rounds.filter(round => round.published);
  let budget = null;
  if (phase === "open") {
    budget = { cash: team.state.cash, authority: availableAllowance(team.state) };
  } else if (phase === "resolved") {
    const { openingCash, availableAllowance: authority } = rounds.at(-1)
      .teams.find(({ id }) => id === role).result.finances;
    budget = { cash: openingCash, authority };
  }
  return {
    role: "team", alias: team.alias, quarter, phase,
    budget,
    decision: team.decision,
    rounds: published.map(round => {
      const { decision, result } = round.teams.find(({ id }) => id === role);
      return { quarter: round.quarter, decision, result };
    }),
    published: published.map(round => ({
      quarter: round.quarter,
      teams: round.teams.map(({ alias, result }) => ({ alias, qes: result.qes })),
    })),
  };
}

function exactKeys(value, keys) {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    && Object.keys(value).length === keys.length && keys.every(key => Object.hasOwn(value, key));
}

function submit(session, role, decision) {
  const team = session.teams.find(({ id }) => id === role);
  if (!exactKeys(decision, decisionKeys)) throw new PilotError(400, "invalid-blocks");
  if (team.decision) {
    if (decisionKeys.every(key => decision[key] === team.decision[key])) return false;
    throw new PilotError(409, "decision-already-submitted");
  }
  const outcome = resolveQuarter(team.state, decision);
  if (!outcome.ok) throw new PilotError(400, outcome.error);
  team.decision = Object.fromEntries(decisionKeys.map(key => [key, decision[key]]));
  return true;
}

function resolve(session) {
  if (session.teams.some(team => !team.decision)) throw new PilotError(409, "missing-submission");
  const teams = session.teams.map(team => {
    const { id, alias, decision } = team;
    const outcome = resolveQuarter(team.state, decision);
    if (!outcome.ok) throw new Error("Stored decision could not be resolved.");
    team.state = outcome.nextState;
    return { id, alias, decision, result: outcome.result };
  });
  session.rounds.push({ quarter: session.quarter, published: false, teams });
  session.phase = "resolved";
}

function publish(session) {
  session.rounds.at(-1).published = true;
  session.teams.forEach(team => { team.decision = null; });
  if (session.quarter === QUARTERS) {
    session.phase = "complete";
  } else {
    session.quarter += 1;
    session.phase = "open";
  }
}

export function openPilot(path) {
  const db = openDatabase(path);
  try {
    load(db);
  } catch (error) {
    db.close();
    throw error;
  }
  return {
    read(credential) {
      return transaction(db, "BEGIN", () => {
        const role = identify(db, credential);
        return snapshot(load(db), role);
      });
    },
    command(credential, action, payload) {
      return transaction(db, "BEGIN IMMEDIATE", () => {
        const role = identify(db, credential);
        if ((role === "instructor") === (action === "submit")) throw new PilotError(403, "forbidden");
        const session = load(db);
        if (action === "rotate-team") {
          if (!exactKeys(payload, ["teamId"]) || !["a", "b"].includes(payload.teamId)) {
            throw new PilotError(400, "invalid-team");
          }
          return { credential: issue(db, payload.teamId) };
        }
        if (!exactKeys(payload, action === "submit" ? ["quarter", "decision"] : ["quarter"])
          || !Number.isInteger(payload.quarter)) {
          throw new PilotError(400, "invalid-command");
        }
        if (session.quarter !== payload.quarter || session.phase !== (action === "publish" ? "resolved" : "open")) {
          throw new PilotError(409, "quarter-unavailable");
        }
        if (action === "submit") {
          if (!submit(session, role, payload.decision)) return snapshot(session, role);
        } else if (action === "resolve") {
          resolve(session);
        } else if (action === "publish") {
          publish(session);
        } else {
          throw new PilotError(400, "invalid-command");
        }
        db.prepare("UPDATE pilot_session SET state = ? WHERE id = 1").run(JSON.stringify(session));
        return snapshot(session, role);
      });
    },
    close() {
      db.close();
    },
  };
}
