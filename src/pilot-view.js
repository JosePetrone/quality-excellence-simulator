import { BLOCK_COST, QUARTERS } from "./simulation.ts";
import { explain, investmentLabels } from "./participant.ts";

const element = (id) => document.getElementById(id);
const storageKey = "qualityedge-pilot-credential";
const currency = new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", maximumFractionDigits: 0,
});
const money = (value) => currency.format(value);
const fixed = (value) => value.toFixed(2);
const categories = Object.entries(investmentLabels);
const form = element("decision-form");
const errors = {
  "invalid-blocks": "Enter a whole number from 0 to 5 in each category.",
  "over-allowance": "Planned spend exceeds available spending authority.",
  "over-cash": "Planned spend exceeds opening cash.",
};
let credential = sessionStorage.getItem(storageKey);
let snapshot = null;
let pending = null;

function node(tag, content, className) {
  const item = document.createElement(tag);
  if (content !== undefined) item.textContent = content;
  if (className) item.className = className;
  return item;
}

function facts(rows, list = node("dl", undefined, "facts")) {
  list.replaceChildren(...rows.map(([name, value]) => {
    const row = node("div");
    row.append(node("dt", name), node("dd", value));
    return row;
  }));
  return list;
}

function decisionFacts(decision) {
  return facts(categories.map(([name, label]) => [label, decision[name]]));
}

function performanceRows(kpis) {
  return [
    ["Customer satisfaction", `${fixed(kpis.satisfaction)} / 100`],
    ["Operating profit margin", `${fixed(kpis.operatingMarginPercent)}%`],
    ["On-time delivery", `${fixed(kpis.onTimePercent)}%`],
    ["Nonconforming transactions", `${kpis.nonconformingPpm.toLocaleString("en-US")} PPM`],
    ["Cost of poor quality", money(kpis.poorQualityCost)],
    ["Employee productivity", `${fixed(kpis.transactionsPerHour)} transactions/hour`],
  ];
}

function detailResult(alias, decision, result, label = "") {
  const { quarter, finances, kpis, qes, explanations } = result;
  const detail = node("details");
  detail.append(
    node("summary", `Quarter ${quarter} · ${alias} · ${fixed(qes)} / 100${label}`),
    node("h3", "Submitted investment blocks"),
    decisionFacts(decision),
    node("h3", "Performance"),
    facts(performanceRows(kpis)),
    node("h3", "Financial results"),
    facts([
      ["Revenue", money(finances.revenue)], ["Base expense", money(finances.baseExpense)],
      ["Cost of poor quality", money(finances.poorQualityCost)], ["Improvement spend", money(finances.improvementSpend)],
      ["Operating profit", money(finances.operatingProfit)], ["Opening cash", money(finances.openingCash)],
      ["Closing cash", money(finances.closingCash)], ["Available spending authority", money(finances.availableAllowance)],
      ["Remaining spending authority", money(finances.closingAllowance)],
    ]),
    node("h3", "Decision effects"),
  );
  const effects = node("ul");
  const messages = explanations.length
    ? explanations.map((id) => explain(id, quarter))
    : ["The scenario recorded no disruption or investment effects this quarter."];
  effects.append(...messages.map((message) => node("li", message)));
  detail.append(effects);
  return detail;
}

const inputs = categories.map(([name, label]) => {
  const row = node("div", undefined, "input-row");
  const caption = node("label", label);
  caption.htmlFor = name;
  const input = node("input");
  Object.assign(input, { id: name, name, type: "number", min: "0", max: "5", step: "1", defaultValue: "0", required: true });
  row.append(caption, input);
  element("pilot-inputs").append(row);
  return input;
});

function displaySpend() {
  const valid = inputs.every((input) => input.validity.valid);
  const blocks = inputs.reduce((total, input) => total + input.valueAsNumber, 0);
  element("pilot-spend").value = valid ? money(blocks * BLOCK_COST) : "Enter valid block counts";
}

function showInstructor(state) {
  element("teams").replaceChildren(...state.teams.map(({ id, alias, decision }) => {
    const panel = node("section", undefined, "panel");
    const rotate = node("button", "Replace team credential", "secondary");
    rotate.id = `rotate-${id}`;
    rotate.type = "button";
    rotate.addEventListener("click", () => run("rotate-team", { teamId: id }));
    const submission = state.phase === "complete" ? "Session complete" : decision ? "Submitted" : "Awaiting submission";
    panel.append(node("h3", alias), node("p", submission));
    if (decision) panel.append(decisionFacts(decision));
    panel.append(rotate);
    return panel;
  }));
  element("resolve").disabled = state.phase !== "open" || !state.teams.every((team) => team.decision);
  element("publish").disabled = state.phase !== "resolved";
  return state.rounds.toReversed().flatMap((round) => round.teams.map(({ alias, decision, result }) =>
    detailResult(alias, decision, result, round.published ? "" : " · Awaiting publication")));
}

function showTeam(state, quarterChanged) {
  if (quarterChanged) {
    form.reset();
    displaySpend();
  }
  element("disruption").hidden = state.quarter !== 1 || state.phase !== "open";
  facts(state.budget ? [
    ["Available spending authority", money(state.budget.authority)],
    ["Opening cash", money(state.budget.cash)],
  ] : [], element("pilot-budget"));
  form.hidden = state.phase !== "open" || !!state.decision;
  const accepted = element("accepted-decision");
  accepted.replaceChildren();
  if (state.decision) accepted.append(node("p", "Decision submitted."), decisionFacts(state.decision));
  const published = element("published-rounds");
  published.replaceChildren(...state.published.toReversed().map(({ quarter, teams }) => {
    const card = node("section", undefined, "panel");
    card.append(node("h3", `Quarter ${quarter}`), facts(teams.map(({ alias, qes }) => [alias, `${fixed(qes)} / 100`])));
    return card;
  }));
  element("published-results").hidden = state.published.length === 0;
  return state.rounds.toReversed().map(({ decision, result }) => detailResult(state.alias, decision, result));
}

function resultsTable(caption, columns, rows) {
  const wrapper = node("div", undefined, "results-table");
  wrapper.tabIndex = 0;
  wrapper.setAttribute("role", "region");
  wrapper.setAttribute("aria-label", caption);
  const table = node("table");
  const headRow = table.createTHead().insertRow();
  for (const label of columns) {
    const heading = node("th", label);
    heading.scope = "col";
    headRow.append(heading);
  }
  const body = table.createTBody();
  for (const [label, ...values] of rows) {
    const row = body.insertRow();
    const heading = node("th", label);
    heading.scope = "row";
    row.append(heading, ...values.map((value) => node("td", value)));
  }
  table.createCaption().textContent = caption;
  wrapper.append(table);
  return wrapper;
}

function showStandings(standings) {
  const section = element("final-standings");
  section.hidden = !standings;
  const content = element("standings-content");
  content.replaceChildren();
  if (!standings) return;
  const winners = standings.teams.filter(({ rank }) => rank === 1).map(({ alias }) => alias);
  const headlines = {
    "single-winner": `${winners[0]} wins.`,
    "shared-winners": `${winners.join(" and ")} share first place.`,
    "no-winner": "No team met the financial eligibility rules.",
  };
  content.append(node("p", headlines[standings.outcome]), resultsTable("Six-quarter results",
    ["Team", "Financial eligibility", "Final QES", "Rank"],
    standings.teams.map(({ alias, eligible, qes, rank }) =>
      [alias, eligible ? "Eligible" : "Ineligible", `${fixed(qes)} / 100`, rank ?? "—"])));
}

function showDebrief(rounds) {
  const content = element("debrief-content");
  content.replaceChildren();
  element("debrief").hidden = !rounds;
  if (!rounds) return;
  const steps = [
    ["Standings · 2 min", "Review final QES, financial eligibility and the winning result above."],
    ["KPI trends · 4 min", "Compare changes across quarters and ask which measures moved together."],
    ["Decision impacts · 6 min", "Trace submitted blocks to immediate effects and effects scheduled for a later quarter."],
    ["ISO 9001 discussion · 5 min", "Connect the examples to monitoring performance, responding to problems and improving processes."],
    ["Lessons learned · 3 min", "Ask each team to explain one trade-off and what it would change in the next session."],
  ].map(([heading, prompt]) => {
    const section = node("section", undefined, "panel debrief-step");
    section.append(node("h3", heading), node("p", prompt));
    return section;
  });
  for (const [slot, { alias }] of rounds[0].teams.entries()) {
    const performance = rounds.map((round) => performanceRows(round.teams[slot].result.kpis));
    steps[1].append(resultsTable(`${alias} KPI trends`,
      ["KPI", ...rounds.map(({ quarter }) => `Q${quarter}`)],
      performance[0].map(([label], metric) => [label, ...performance.map((rows) => rows[metric][1])])));
    const effects = node("ul");
    for (const [index, round] of rounds.entries()) {
      for (const id of round.teams[slot].result.explanations) {
        const [timing, category] = id.split(".");
        if (!["immediate", "scheduled", "applied"].includes(timing)) continue;
        const source = timing === "applied" ? rounds[index - 1] : round;
        const blocks = source.teams[slot].decision[category];
        const unit = blocks === 1 ? "block" : "blocks";
        effects.append(node("li", `Q${round.quarter} · Q${source.quarter} decision: ${investmentLabels[category]}, ${blocks} ${unit}. ${explain(id, round.quarter)}`));
      }
    }
    steps[2].append(node("h4", alias), effects.childElementCount
      ? effects
      : node("p", "No investment effects were recorded for this team."));
  }
  content.append(...steps);
}

function render(state) {
  const previous = snapshot;
  if (JSON.stringify(previous) === JSON.stringify(state)) return;
  const instructor = state.role === "instructor";
  const phase = state.phase === "resolved" ? "Awaiting publication" : "Open for decisions";
  element("phase").textContent = state.phase === "complete" ? "Session complete" : `Quarter ${state.quarter} of ${QUARTERS} · ${phase}`;
  element("session-title").textContent = instructor ? "Instructor controls" : state.alias;
  element("instructor").hidden = !instructor;
  element("team").hidden = instructor || state.phase === "complete";
  if (instructor) element("published-results").hidden = true;
  const details = instructor ? showInstructor(state) : showTeam(state, previous?.quarter !== state.quarter);
  showStandings(state.finalStandings);
  showDebrief(instructor && state.finalStandings ? state.rounds : null);
  const privateRounds = element("private-rounds");
  const open = new Set([...privateRounds.querySelectorAll("details[open] summary")].map((summary) => summary.textContent));
  for (const detail of details) detail.open = open.has(detail.firstChild.textContent);
  privateRounds.replaceChildren(...details);
  element("private-results").hidden = details.length === 0;
  element("admission").hidden = true;
  element("session").hidden = false;
  element("sign-out").hidden = false;
  snapshot = state;
  if (!previous) element("session-title").focus();
}

function clearIssued() {
  element("issued-credential").textContent = "";
  element("issued").hidden = true;
}

function signOut() {
  credential = null;
  snapshot = null;
  sessionStorage.removeItem(storageKey);
  element("session").hidden = true;
  element("sign-out").hidden = true;
  element("admission").hidden = false;
  element("teams").replaceChildren();
  element("pilot-budget").replaceChildren();
  element("accepted-decision").replaceChildren();
  element("private-rounds").replaceChildren();
  element("published-rounds").replaceChildren();
  showStandings(null);
  showDebrief(null);
  element("session-title").textContent = "";
  element("phase").textContent = "";
  clearIssued();
  form.reset();
  element("credential").focus();
}

async function request(activeCredential, action, body) {
  const status = element("status");
  try {
    const headers = { Authorization: `Bearer ${activeCredential}` };
    const options = { headers, cache: "no-store", signal: AbortSignal.timeout(5000) };
    if (action) {
      headers["Content-Type"] = "application/json";
      options.method = "POST";
      options.body = JSON.stringify(body);
    }
    const response = await fetch(`/api/${action ?? "session"}`, options);
    if (credential !== activeCredential) return;
    if (response.status === 401) {
      signOut();
      status.textContent = "This access credential is invalid or expired. Enter a current credential.";
      return;
    }
    const data = await response.json();
    if (credential !== activeCredential) return;
    if (!response.ok) {
      status.textContent = errors[data.error] ?? (response.status === 409
        ? "The round changed or the action is no longer available. Check the current round."
        : "This action could not be completed.");
      return;
    }
    if (action === "rotate-team") {
      element("issued-credential").textContent = data.credential;
      element("issued").hidden = false;
    } else {
      render(data);
    }
    if (action || status.textContent.startsWith("Connection interrupted")) status.textContent = "";
  } catch {
    if (credential === activeCredential) status.textContent = "Connection interrupted. The session will reconnect when the service is available.";
  }
}

async function run(action, body) {
  const activeCredential = credential;
  if (!activeCredential) return;
  if (!action && pending) return;
  while (pending) await pending;
  if (credential !== activeCredential) return;
  pending = request(activeCredential, action, body).finally(() => { pending = null; });
  await pending;
}

element("guidance").textContent = `Choose 0 to 5 whole blocks per category. Each block costs ${money(BLOCK_COST)}.`;
element("sign-in").addEventListener("submit", (event) => {
  event.preventDefault();
  if (pending) return;
  const input = element("credential");
  credential = input.value.trim() || null;
  input.value = "";
  if (!credential) return;
  element("status").textContent = "";
  sessionStorage.setItem(storageKey, credential);
  run();
});
element("sign-out").addEventListener("click", () => {
  signOut();
  element("status").textContent = "";
});
element("dismiss-credential").addEventListener("click", clearIssued);
form.addEventListener("input", displaySpend);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const invalid = inputs.find((input) => !input.validity.valid);
  if (invalid) {
    element("status").textContent = errors["invalid-blocks"];
    invalid.focus();
    return;
  }
  const decision = Object.fromEntries(inputs.map((input) => [input.name, input.valueAsNumber]));
  run("submit", { quarter: snapshot.quarter, decision });
});
for (const action of ["resolve", "publish"]) {
  element(action).addEventListener("click", () => run(action, { quarter: snapshot.quarter }));
}
setInterval(run, 1000);
run();
