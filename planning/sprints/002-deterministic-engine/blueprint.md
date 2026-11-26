# Sprint 002 blueprint

Use a dependency-free TypeScript engine with Node native TypeScript stripping and Node test runner. Expose an initial state and a versioned pure transition from prior state and explicit block counts to success with next state and results, or an invalid decision with no transition. Track round, cash, carried authority, and pending training, process, technology and risk blocks. Stop after quarter 6. Choose stable explanation IDs for the disruption and each scheduled, applied or immediate effect. Replay needs no time, randomness, team identity or I/O.

Initial cash $100,000, authority $0, pending zero. Each quarter: 10,000 completed, $500,000 revenue, $400,000 base expense, 8,500 on time, 400 nonconforming, 5,000 labor hours. Q1 disruption subtracts 400 on-time and adds 100 nonconforming. Add $50,000 authority each quarter. Require explicit integer counts 0–5 in all five categories, each block $10,000. Reject spend over authority or opening cash. No deposits from authority. All unused authority carries over.

Each current complaint block gives +3 satisfaction. Due blocks affect the next quarter once: training +100 on-time, −25 nonconforming, −100 hours; process +200 on-time, −50 nonconforming; technology +100 on-time, −200 hours; risk −25 nonconforming. Apply due effects and disruption additively, clamp each transaction count to 0–10,000 independently, then replace pending blocks with current delayed blocks. On-time and nonconforming may overlap.

Cost of poor quality = $100 × nonconforming. Profit = revenue − base expense − poor quality cost − current spending. Closing cash = opening cash + profit. Closing authority = opening carried authority + $50,000 − spending.

Raw KPI / normalized (all normalized clamped to 0–100) / weight:
- Satisfaction = clamp(70 + (on-time − 8,500)/100 − (nonconforming − 400)/50 + 3 × current complaint blocks, 0, 100) / same / 25%.
- Margin = 100 × profit / revenue / 5 × margin / 20%.
- On-time = 100 × on-time / 10,000 / same / 15%.
- PPM = 1,000,000 × nonconforming / 10,000 / 100 − PPM/1,000 / 15%.
- Poor quality cost in dollars / 100 − cost/1,000 / 15%.
- Productivity = 10,000 / labor hours / 40 × productivity / 10%.

QES is weighted normalized scores at full precision. Round displayed KPIs, normalized scores and QES to two decimal places, exact halves away from zero. Keep money state and counts exact. Fixed revenue, volume and labor hours keep denominators positive.

## Flight evidence

Local. Pure engine is the sole runtime surface, so no cross-layer trace is needed. Source of truth is the owner-approved contract and clean baseline `794189a`, where src and tests contain only README files. Invariants are replay, cash/authority reconciliation, precise scoring and one-quarter effects. Team B Q2 discriminates absent effects (68.25 versus 79.41 QES), and the cash/authority negative cases separate their independent limits. Owner-approved numbers are pilot calibration values. Winning and live operations remain open.
