import { BLOCK_COST, QUARTERS } from "./simulation.ts";
import { createParticipant, explain, investmentLabels } from "./participant.ts";

const participant = createParticipant();
const element = (id) => document.getElementById(id);
const form = element("investments");
const currency = new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", maximumFractionDigits: 0,
});
const money = (value) => currency.format(value);
const fixed = (value) => value.toFixed(2);
const errors = {
  "invalid-blocks": "Enter a whole number from 0 to 5 in each category.",
  "over-allowance": "Planned spend exceeds available spending authority. Reduce the number of blocks.",
  "over-cash": "Planned spend exceeds opening cash. Reduce the number of blocks.",
  "quarter-unavailable": "This quarter has already been resolved.",
};

const inputs = Object.entries(investmentLabels).map(([name, label]) => {
  const row = document.createElement("div");
  row.className = "input-row";
  const caption = document.createElement("label");
  caption.htmlFor = name;
  caption.textContent = label;
  const input = document.createElement("input");
  Object.assign(input, { id: name, name, type: "number", min: "0", max: "5", step: "1", defaultValue: "0", required: true });
  input.setAttribute("aria-describedby", "guidance");
  row.append(caption, input);
  element("inputs").append(row);
  return input;
});

function showMetrics(id, metrics) {
  element(id).replaceChildren(...metrics.map(([label, value]) => {
    const row = document.createElement("div");
    const term = document.createElement("dt");
    const detail = document.createElement("dd");
    term.textContent = label;
    detail.textContent = value;
    row.append(term, detail);
    return row;
  }));
}

function displaySpend() {
  const valid = inputs.every((input) => input.validity.valid);
  const blocks = inputs.reduce((total, input) => total + input.valueAsNumber, 0);
  element("total").value = valid ? money(blocks * BLOCK_COST) : "Enter valid block counts";
}

function showDecision(focus = false) {
  const { quarter, cash, authority } = participant.budget;
  element("progress").textContent = `Quarter ${quarter} of ${QUARTERS}`;
  element("title").textContent = "Decision center";
  element("disruption").hidden = quarter !== 1;
  showMetrics("budget", [["Available spending authority", money(authority)], ["Opening cash", money(cash)]]);
  form.reset();
  element("error").textContent = "";
  displaySpend();
  element("results").hidden = true;
  element("decision").hidden = false;
  if (focus) element("title").focus();
}

function showResult(result) {
  const { quarter, kpis, finances, qes, explanations } = result;
  element("title").textContent = "Quarter results";
  element("qes").textContent = `${fixed(qes)} / 100`;
  showMetrics("kpis", [
    ["Customer satisfaction", `${fixed(kpis.satisfaction)} / 100`],
    ["Operating profit margin", `${fixed(kpis.operatingMarginPercent)}%`],
    ["On-time delivery", `${fixed(kpis.onTimePercent)}%`],
    ["Nonconforming transactions", `${kpis.nonconformingPpm.toLocaleString("en-US")} PPM`],
    ["Cost of poor quality", money(kpis.poorQualityCost)],
    ["Employee productivity", `${fixed(kpis.transactionsPerHour)} transactions/hour`],
  ]);
  showMetrics("finances", [
    ["Revenue", money(finances.revenue)], ["Base expense", money(finances.baseExpense)],
    ["Cost of poor quality", money(finances.poorQualityCost)], ["Improvement spend", money(finances.improvementSpend)],
    ["Operating profit", money(finances.operatingProfit)], ["Opening cash", money(finances.openingCash)],
    ["Closing cash", money(finances.closingCash)], ["Available spending authority", money(finances.availableAllowance)],
    ["Remaining spending authority", money(finances.closingAllowance)],
  ]);
  const messages = explanations.length
    ? explanations.map((id) => explain(id, quarter))
    : ["The scenario recorded no disruption or investment effects this quarter."];
  element("effects").replaceChildren(...messages.map((message) => {
    const item = document.createElement("li");
    item.textContent = message;
    return item;
  }));
  element("complete").hidden = quarter !== QUARTERS;
  element("continue").hidden = quarter === QUARTERS;
  element("decision").hidden = true;
  element("results").hidden = false;
  element("title").focus();
}

element("guidance").textContent = `Choose 0 to 5 whole blocks per category. Each block costs ${money(BLOCK_COST)}.`;
form.addEventListener("input", () => {
  element("error").textContent = "";
  displaySpend();
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const invalid = inputs.find((input) => !input.validity.valid);
  if (invalid) {
    element("error").textContent = errors["invalid-blocks"];
    invalid.focus();
    return;
  }
  const decision = Object.fromEntries(inputs.map((input) => [input.name, input.valueAsNumber]));
  const outcome = participant.submit(decision);
  if (outcome.ok) showResult(outcome.result);
  else element("error").textContent = errors[outcome.error];
});
element("continue").addEventListener("click", () => {
  if (participant.continue()) showDecision(true);
});
showDecision();
