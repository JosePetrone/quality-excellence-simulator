export const RULESET_VERSION = "professional-pilot-v1";

export const QUARTERS = 6;
const QUARTERLY_ALLOWANCE = 50_000;
export const BLOCK_COST = 10_000;
const TRANSACTIONS = 10_000;
const REVENUE = 500_000;
const BASE_EXPENSE = 400_000;
const BASE_ON_TIME = 8_500;
const BASE_NONCONFORMING = 400;
const BASE_HOURS = 5_000;

const delayedEffects = {
  training: { onTime: 100, nonconforming: -25, laborHours: -100 },
  process: { onTime: 200, nonconforming: -50, laborHours: 0 },
  technology: { onTime: 100, nonconforming: 0, laborHours: -200 },
  risk: { onTime: 0, nonconforming: -25, laborHours: 0 },
} as const;

type DelayedCategory = keyof typeof delayedEffects;
type DelayedBlocks = Readonly<Record<DelayedCategory, number>>;
export type Decision = DelayedBlocks & { readonly complaints: number };
const delayedCategories = Object.keys(delayedEffects) as DelayedCategory[];
const categories = [...delayedCategories, "complaints"] as const;

export interface TeamState {
  readonly nextQuarter: number;
  readonly cash: number;
  readonly carriedAllowance: number;
  readonly pending: DelayedBlocks;
}

type ExplanationId =
  | "disruption.service-delay"
  | "immediate.complaints"
  | `scheduled.${DelayedCategory}`
  | `applied.${DelayedCategory}`;

export function initialTeamState(): TeamState {
  return {
    nextQuarter: 1,
    cash: 100_000,
    carriedAllowance: 0,
    pending: { training: 0, process: 0, technology: 0, risk: 0 },
  };
}

function isDecision(value: unknown): value is Decision {
  if (value === null || typeof value !== "object") return false;
  const blocks = value as Partial<Record<keyof Decision, unknown>>;
  return categories.every((category) => {
    const count = blocks[category];
    return Object.hasOwn(blocks, category)
      && typeof count === "number" && Number.isInteger(count) && count >= 0 && count <= 5;
  });
}

function clamp(value: number, max: number): number {
  return Math.max(0, Math.min(max, value));
}

// All arguments are exact integers in this scenario. Keep any division
// until display so a true halfway value rounds away from zero.
function displayHundredths(numerator: number, denominator = 1): number {
  const magnitude = Math.floor((2 * Math.abs(numerator) + denominator) / (2 * denominator));
  return magnitude === 0 ? 0 : Math.sign(numerator) * magnitude / 100;
}

export function availableAllowance(state: TeamState) {
  return state.carriedAllowance + QUARTERLY_ALLOWANCE;
}

export function resolveQuarter(state: TeamState, decision: unknown) {
  const quarter = state.nextQuarter;
  if (!Number.isInteger(quarter) || quarter < 1 || quarter > QUARTERS) {
    return { ok: false, error: "quarter-unavailable" } as const;
  }
  if (!isDecision(decision)) return { ok: false, error: "invalid-blocks" } as const;

  const improvementSpend = BLOCK_COST * categories.reduce((sum, category) => sum + decision[category], 0);
  const authority = availableAllowance(state);
  if (improvementSpend > authority) return { ok: false, error: "over-allowance" } as const;
  if (improvementSpend > state.cash) return { ok: false, error: "over-cash" } as const;

  let onTime = BASE_ON_TIME;
  let nonconforming = BASE_NONCONFORMING;
  let laborHours = BASE_HOURS;
  const explanations: ExplanationId[] = [];
  if (quarter === 1) {
    onTime -= 400;
    nonconforming += 100;
    explanations.push("disruption.service-delay");
  }
  for (const category of delayedCategories) {
    const due = state.pending[category];
    const effect = delayedEffects[category];
    onTime += due * effect.onTime;
    nonconforming += due * effect.nonconforming;
    laborHours += due * effect.laborHours;
    if (due > 0) explanations.push(`applied.${category}`);
    if (decision[category] > 0) explanations.push(`scheduled.${category}`);
  }
  if (decision.complaints > 0) explanations.push("immediate.complaints");
  onTime = clamp(onTime, TRANSACTIONS);
  nonconforming = clamp(nonconforming, TRANSACTIONS);

  const poorQualityCost = 100 * nonconforming;
  const operatingProfit = REVENUE - BASE_EXPENSE - poorQualityCost - improvementSpend;
  const closingCash = state.cash + operatingProfit;
  const closingAllowance = authority - improvementSpend;
  const nextState: TeamState = {
    nextQuarter: quarter + 1,
    cash: closingCash,
    carriedAllowance: closingAllowance,
    pending: {
      training: decision.training,
      process: decision.process,
      technology: decision.technology,
      risk: decision.risk,
    },
  };

  const maximumScore = 10_000;
  const satisfaction = clamp(
    7_000 + (onTime - BASE_ON_TIME) - 2 * (nonconforming - BASE_NONCONFORMING) + 300 * decision.complaints,
    maximumScore,
  );
  // Percentages in hundredths use a scale of 100 × 100.
  const margin = operatingProfit * 10_000 / REVENUE;
  const onTimeDelivery = onTime * 10_000 / TRANSACTIONS;
  const nonconformingPpm = nonconforming * 1_000_000 / TRANSACTIONS;
  const productivityNumerator = TRANSACTIONS * 100;
  const normalizedMargin = clamp(5 * margin, maximumScore);
  const normalizedPpm = clamp(maximumScore - nonconformingPpm / 10, maximumScore);
  const normalizedPoorQualityCost = clamp(maximumScore - poorQualityCost / 10, maximumScore);
  const normalizedProductivityNumerator = clamp(40 * productivityNumerator, maximumScore * laborHours);

  const weightedIntegerScores = 25 * satisfaction + 20 * normalizedMargin
    + 15 * onTimeDelivery + 15 * normalizedPpm + 15 * normalizedPoorQualityCost;
  const qes = displayHundredths(
    weightedIntegerScores * laborHours + 10 * normalizedProductivityNumerator,
    100 * laborHours,
  );

  return {
    ok: true,
    nextState,
    result: {
      rulesetVersion: RULESET_VERSION,
      quarter,
      operations: { transactions: TRANSACTIONS, onTime, nonconforming, laborHours },
      finances: {
        revenue: REVENUE,
        baseExpense: BASE_EXPENSE,
        poorQualityCost,
        improvementSpend,
        operatingProfit,
        openingCash: state.cash,
        closingCash,
        availableAllowance: authority,
        closingAllowance,
      },
      kpis: {
        satisfaction: displayHundredths(satisfaction),
        operatingMarginPercent: displayHundredths(margin),
        onTimePercent: displayHundredths(onTimeDelivery),
        nonconformingPpm,
        poorQualityCost,
        transactionsPerHour: displayHundredths(productivityNumerator, laborHours),
      },
      normalizedScores: {
        satisfaction: displayHundredths(satisfaction),
        operatingMargin: displayHundredths(normalizedMargin),
        onTime: displayHundredths(onTimeDelivery),
        nonconformingPpm: displayHundredths(normalizedPpm),
        poorQualityCost: displayHundredths(normalizedPoorQualityCost),
        productivity: displayHundredths(normalizedProductivityNumerator, laborHours),
      },
      qes,
      explanations,
    },
  } as const;
}
