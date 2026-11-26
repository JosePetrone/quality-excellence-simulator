import assert from "node:assert/strict";
import test from "node:test";
import { initialTeamState, resolveQuarter, RULESET_VERSION } from "../src/simulation.ts";
import type { Decision, TeamState } from "../src/simulation.ts";

const zero: Decision = Object.freeze({ training: 0, process: 0, complaints: 0, technology: 0, risk: 0 });
const teamA = Object.freeze({ ...zero, process: 1, complaints: 2 });
const teamB = Object.freeze({ ...zero, training: 1, process: 2, technology: 1, risk: 1 });

function resolve(state: TeamState, decision: Decision = zero) {
  const resolution = resolveQuarter(state, decision);
  if (!resolution.ok) assert.fail(resolution.error);
  return resolution;
}

test("replay reproduces the full result and leaves inputs intact", () => {
  const initial = initialTeamState();
  Object.freeze(initial.pending);
  Object.freeze(initial);
  const first = resolve(initial, teamA);
  assert.deepEqual(first, resolve(initial, teamA));
  assert.deepEqual(initial, initialTeamState());
  assert.equal(first.result.rulesetVersion, RULESET_VERSION);
  assert.equal(first.result.quarter, 1);
  assert.deepEqual(first.nextState, {
    nextQuarter: 2, cash: 120_000, carriedAllowance: 20_000,
    pending: { training: 0, process: 1, technology: 0, risk: 0 },
  });
  assert.deepEqual(first.result.explanations, [
    "disruption.service-delay", "scheduled.process", "immediate.complaints",
  ]);
  assert.deepEqual(resolve(first.nextState).result.explanations, ["applied.process"]);
});

test("quarter 6 resolves and quarter 7 is unavailable", () => {
  let state = initialTeamState();
  for (let quarter = 1; quarter <= 6; quarter += 1) {
    const resolution = resolve(state);
    assert.equal(resolution.result.quarter, quarter);
    state = resolution.nextState;
  }
  assert.deepEqual(resolveQuarter(state, zero), { ok: false, error: "quarter-unavailable" });
});

const goldenFixtures = [
  {
    team: "A", decision: teamA, expected: [
      { spend: 30_000, profit: 20_000, cash: 120_000, allowance: 20_000, csat: 70, margin: 4, onTime: 81,
        defects: 500, cost: 50_000, hours: 5_000, productivity: 2, qes: 56.65, normalized: [70, 20, 81, 50, 50, 80] },
      { spend: 0, profit: 65_000, cash: 185_000, allowance: 70_000, csat: 73, margin: 13, onTime: 87,
        defects: 350, cost: 35_000, hours: 5_000, productivity: 2, qes: 71.80, normalized: [73, 65, 87, 65, 65, 80] },
      { spend: 0, profit: 60_000, cash: 245_000, allowance: 120_000, csat: 70, margin: 12, onTime: 85,
        defects: 400, cost: 40_000, hours: 5_000, productivity: 2, qes: 68.25, normalized: [70, 60, 85, 60, 60, 80] },
    ],
  },
  {
    team: "B", decision: teamB, expected: [
      { spend: 50_000, profit: 0, cash: 100_000, allowance: 0, csat: 64, margin: 0, onTime: 81,
        defects: 500, cost: 50_000, hours: 5_000, productivity: 2, qes: 51.15, normalized: [64, 0, 81, 50, 50, 80] },
      { spend: 0, profit: 75_000, cash: 175_000, allowance: 50_000, csat: 79, margin: 15, onTime: 91,
        defects: 250, cost: 25_000, hours: 4_700, productivity: 2.13, qes: 79.41, normalized: [79, 75, 91, 75, 75, 85.11] },
      { spend: 0, profit: 60_000, cash: 235_000, allowance: 100_000, csat: 70, margin: 12, onTime: 85,
        defects: 400, cost: 40_000, hours: 5_000, productivity: 2, qes: 68.25, normalized: [70, 60, 85, 60, 60, 80] },
    ],
  },
];

for (const { team, decision, expected } of goldenFixtures) {
  test(`team ${team} matches the approved three-quarter fixture`, () => {
    let state = initialTeamState();
    for (const [index, fixture] of expected.entries()) {
      const { result, nextState } = resolve(state, index === 0 ? decision : zero);
      const quarter = index + 1;
      assert.equal(result.quarter, quarter);
      assert.deepEqual(result.operations, {
        transactions: 10_000, onTime: 100 * fixture.onTime, nonconforming: fixture.defects,
        laborHours: fixture.hours,
      });
      assert.deepEqual(result.finances, {
        revenue: 500_000, baseExpense: 400_000, poorQualityCost: fixture.cost, improvementSpend: fixture.spend,
        operatingProfit: fixture.profit, openingCash: state.cash, closingCash: fixture.cash,
        availableAllowance: fixture.allowance + fixture.spend, closingAllowance: fixture.allowance,
      });
      assert.deepEqual(result.kpis, {
        satisfaction: fixture.csat, operatingMarginPercent: fixture.margin, onTimePercent: fixture.onTime,
        nonconformingPpm: fixture.cost, poorQualityCost: fixture.cost, transactionsPerHour: fixture.productivity,
      });
      const [satisfaction, operatingMargin, onTime, nonconformingPpm, poorQualityCost, productivity] = fixture.normalized;
      assert.deepEqual(result.normalizedScores, {
        satisfaction, operatingMargin, onTime, nonconformingPpm, poorQualityCost, productivity,
      });
      assert.equal(result.qes, fixture.qes);
      assert.equal(nextState.nextQuarter, quarter + 1);
      assert.equal(nextState.cash, fixture.cash);
      assert.equal(nextState.carriedAllowance, fixture.allowance);
      state = nextState;
    }
  });
}

test("carried allowance funds a loss quarter and resulting effects can hit the defect floor", () => {
  const afterA2 = resolve(resolve(initialTeamState(), teamA).nextState).nextState;
  const q3 = resolve(afterA2, { ...zero, training: 5, process: 5, risk: 2 });
  assert.equal(q3.result.finances.operatingProfit, -60_000);
  assert.equal(q3.result.kpis.operatingMarginPercent, -12);
  assert.equal(q3.result.normalizedScores.operatingMargin, 0);
  assert.equal(q3.nextState.cash, 125_000);
  assert.equal(q3.nextState.carriedAllowance, 0);
  assert.equal(q3.result.qes, 56.25);
  const q4 = resolve(q3.nextState);
  assert.deepEqual(q4.result.operations, {
    transactions: 10_000, onTime: 10_000, nonconforming: 0, laborHours: 4_500,
  });
  assert.equal(q4.nextState.cash, 225_000);
  assert.equal(q4.nextState.carriedAllowance, 50_000);
  assert.equal(q4.result.qes, 97.14);
});

test("allowance and opening cash impose independent spending limits", () => {
  const initial = initialTeamState();
  Object.freeze(initial.pending);
  Object.freeze(initial);
  const lowCash = Object.freeze({ ...initial, cash: 40_000 });
  assert.deepEqual(resolveQuarter(initial, { ...zero, process: 5, training: 1 }), {
    ok: false, error: "over-allowance",
  });
  assert.deepEqual(resolveQuarter(lowCash, { ...zero, process: 5 }), { ok: false, error: "over-cash" });
  assert.deepEqual(initial, initialTeamState());
  assert.deepEqual(lowCash, { ...initialTeamState(), cash: 40_000 });
});

test("all five block counts must be explicit integers from 0 through 5", () => {
  const initial = initialTeamState();
  Object.freeze(initial.pending);
  Object.freeze(initial);
  const { risk, ...missingRisk } = zero;
  for (const decision of [missingRisk, { ...zero, risk: 0.5 }, { ...zero, risk: -1 },
    { ...zero, risk: 6 }, { ...zero, risk: "1" }, Object.create(zero), null]) {
    assert.deepEqual(resolveQuarter(initial, decision), { ok: false, error: "invalid-blocks" });
  }
  assert.deepEqual(initial, initialTeamState());
});

const singleInvestment = [
  ["training", 100, -25, -100],
  ["process", 200, -50, 0],
  ["technology", 100, 0, -200],
  ["risk", 0, -25, 0],
] as const;

for (const [category, onTime, nonconforming, laborHours] of singleInvestment) {
  test(`${category} takes effect in the following quarter only`, () => {
    const baseline1 = resolve(initialTeamState());
    const baseline2 = resolve(baseline1.nextState);
    const q1 = resolve(initialTeamState(), { ...zero, [category]: 1 });
    assert.deepEqual(q1.result.operations, baseline1.result.operations);
    assert.equal(q1.result.kpis.satisfaction, baseline1.result.kpis.satisfaction);
    assert.equal(q1.result.finances.operatingProfit, baseline1.result.finances.operatingProfit - 10_000);
    assert.deepEqual(q1.result.explanations, ["disruption.service-delay", `scheduled.${category}`]);

    const q2 = resolve(q1.nextState);
    const baseline = baseline2.result.operations;
    assert.deepEqual(q2.result.operations, {
      transactions: baseline.transactions, onTime: baseline.onTime + onTime,
      nonconforming: baseline.nonconforming + nonconforming, laborHours: baseline.laborHours + laborHours,
    });
    assert.deepEqual(q2.result.explanations, [`applied.${category}`]);
    const q3 = resolve(q2.nextState);
    assert.deepEqual(q3.result.operations, resolve(baseline2.nextState).result.operations);
    assert.deepEqual(q3.result.explanations, []);
  });
}

test("complaints immediately improve satisfaction and leave no effect for the next quarter", () => {
  const baseline = resolve(initialTeamState());
  const q1 = resolve(initialTeamState(), { ...zero, complaints: 1 });
  assert.equal(q1.result.kpis.satisfaction, baseline.result.kpis.satisfaction + 3);
  assert.deepEqual(q1.result.operations, baseline.result.operations);
  assert.deepEqual(q1.result.explanations, ["disruption.service-delay", "immediate.complaints"]);
  assert.deepEqual(resolve(q1.nextState).result.kpis, resolve(baseline.nextState).result.kpis);
});

test("QES rounds an exact half away from zero", () => {
  const afterRisk = resolve(initialTeamState(), { ...zero, risk: 1 }).nextState;
  assert.equal(resolve(afterRisk).result.qes, 69.63);
});
