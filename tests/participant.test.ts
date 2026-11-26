import assert from "node:assert/strict";
import test from "node:test";
import { createParticipant, explain } from "../src/participant.ts";

const zero = { training: 0, process: 0, complaints: 0, technology: 0, risk: 0 };

test("rejected input preserves opening figures and a successful submission resolves once", () => {
  const player = createParticipant();
  const opening = { quarter: 1, authority: 50_000, cash: 100_000 };
  assert.deepEqual(player.budget, opening);
  assert.equal(player.continue(), false);
  assert.deepEqual(player.submit({ training: 1 }), { ok: false, error: "invalid-blocks" });
  assert.deepEqual(player.submit({ ...zero, process: 1.5 }), { ok: false, error: "invalid-blocks" });
  assert.deepEqual(player.submit({ ...zero, process: 6 }), { ok: false, error: "invalid-blocks" });
  assert.deepEqual(player.submit({ ...zero, process: 5, training: 1 }), { ok: false, error: "over-allowance" });
  assert.deepEqual(player.budget, opening);
  const first = player.submit({ ...zero, complaints: 2 });
  assert.ok(first.ok);
  assert.match(explain("immediate.complaints", 1), /improved customer satisfaction this quarter/);
  assert.ok(first.result.explanations.includes("immediate.complaints"));
  assert.deepEqual(player.submit(zero), { ok: false, error: "quarter-unavailable" });
  assert.equal(player.continue(), true);
  assert.deepEqual(player.budget, { quarter: 2, authority: 80_000, cash: 130_000 });
});

test("Team B carries scheduled effects into quarter two and the loop ends after quarter six", () => {
  const player = createParticipant();
  const first = player.submit({ training: 1, process: 2, complaints: 0, technology: 1, risk: 1 });
  assert.ok(first.ok);
  assert.ok(first.result.explanations.includes("scheduled.process"));
  assert.equal(player.continue(), true);
  assert.deepEqual(player.budget, { quarter: 2, authority: 50_000, cash: 100_000 });
  const second = player.submit(zero);
  assert.ok(second.ok);
  assert.equal(second.result.finances.closingCash, 175_000);
  assert.equal(second.result.kpis.onTimePercent, 91);
  assert.equal(second.result.qes, 79.41);
  assert.ok(second.result.explanations.includes("applied.process"));
  assert.equal(player.continue(), true);
  assert.deepEqual(player.budget, { quarter: 3, authority: 100_000, cash: 175_000 });
  for (let quarter = 3; quarter <= 6; quarter++) {
    const outcome = player.submit(quarter === 6 ? { ...zero, process: 1 } : zero);
    assert.ok(outcome.ok);
    assert.equal(outcome.result.quarter, quarter);
    assert.equal(player.continue(), quarter < 6);
  }
  assert.match(explain("scheduled.process", 6), /beyond the final quarter/);
  assert.deepEqual(player.submit(zero), { ok: false, error: "quarter-unavailable" });
  assert.equal(createParticipant().budget.quarter, 1);
});
