import { availableAllowance, initialTeamState, QUARTERS, resolveQuarter } from "./simulation.ts";

export const investmentLabels = {
  training: "Employee training",
  process: "Process improvement",
  complaints: "Complaint management",
  technology: "Technology and infrastructure",
  risk: "Risk prevention",
} as const;

export function createParticipant() {
  let state = initialTeamState();
  let showingResult = false;

  return {
    get budget() {
      return { quarter: state.nextQuarter, cash: state.cash, authority: availableAllowance(state) };
    },
    submit(decision: unknown) {
      if (showingResult) return { ok: false, error: "quarter-unavailable" } as const;
      const outcome = resolveQuarter(state, decision);
      if (outcome.ok) {
        state = outcome.nextState;
        showingResult = true;
      }
      return outcome;
    },
    continue() {
      if (!showingResult || state.nextQuarter > QUARTERS) return false;
      showingResult = false;
      return true;
    },
  };
}

type Result = Extract<ReturnType<typeof resolveQuarter>, { ok: true }>["result"];

export function explain(id: Result["explanations"][number], quarter: number) {
  if (id === "disruption.service-delay") return "The service delay reduced on-time delivery and increased nonconforming transactions this quarter.";
  if (id === "immediate.complaints") return "Complaint management improved customer satisfaction this quarter.";
  const [timing, category] = id.split(".") as [string, keyof typeof investmentLabels];
  const label = investmentLabels[category];
  if (timing === "applied") return `${label} from last quarter affected this quarter’s operations.`;
  if (quarter === QUARTERS) return `${label} was scheduled beyond the final quarter.`;
  return `${label} will affect operations next quarter.`;
}
