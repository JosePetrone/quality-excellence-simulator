============================================================
FILE: planning/sprints/002-deterministic-engine/requirements.md
============================================================

# Sprint 002 requirements

Implement one deterministic professional scenario for QualityEdge. Prove the same effective inputs yield the same finances, six KPIs, QES, next state and explanations. Pilot remains one invite-only session, one instructor and two alias-based teams. Engine is pure and resolves one team at a time for quarters 1–6. Defer UI, access, service orchestration, persistence, infrastructure, events beyond this fixed scenario, eligibility, ranking and ISO 9001 clause mapping.

============================================================
FILE: planning/sprints/002-deterministic-engine/blueprint.md
============================================================

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

============================================================
FILE: planning/sprints/002-deterministic-engine/acceptance.md
============================================================

# Sprint 002 acceptance

1. Replay identical effective inputs and compare all outputs and next state. Inputs stay intact, quarter 6 resolves and quarter 7 is unavailable. Explanations identify disruption, scheduled, applied and immediate effects.
2. Compare all financial and KPI outputs to these independently calculated fixtures. Q1 A blocks [training, process, complaints, technology, risk] = [0,1,2,0,0], B = [1,2,0,1,1]. Both spend zero thereafter.

| Team/Q | Profit | Cash | Authority | CSAT | Margin % | On-time % | PPM | Poor quality $ | Txns/hour | QES |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| A/1 | 20000 | 120000 | 20000 | 70 | 4 | 81 | 50000 | 50000 | 2 | 56.65 |
| B/1 | 0 | 100000 | 0 | 64 | 0 | 81 | 50000 | 50000 | 2 | 51.15 |
| A/2 | 65000 | 185000 | 70000 | 73 | 13 | 87 | 35000 | 35000 | 2 | 71.80 |
| B/2 | 75000 | 175000 | 50000 | 79 | 15 | 91 | 25000 | 25000 | 2.13 | 79.41 |
| A/3 | 60000 | 245000 | 120000 | 70 | 12 | 85 | 40000 | 40000 | 2 | 68.25 |
| B/3 | 60000 | 235000 | 100000 | 70 | 12 | 85 | 40000 | 40000 | 2 | 68.25 |

3. From A Q2, spend $120,000 on [5,5,0,0,2] in Q3. Assert −$60,000 profit, $125,000 cash, $0 authority, 56.25 QES. With no Q4 spend, assert 10,000 on-time, zero nonconforming, 4,500 hours, $225,000 cash, $50,000 authority, 97.14 QES.
4. Reject $60,000 in Q1 despite sufficient cash, and $50,000 with $40,000 cash despite enough authority. Reject missing, fractional, negative and over-limit counts. Preserve input state for every rejection.
5. Check each investment separately against zero spend, including when it activates and expires. Verify normalization, full precision QES and half-away rounding with discriminating inputs. One risk block in Q1 followed by zero Q2 spend yields exact QES 69.625, displayed as 69.63. Check the engine remains independent of any session or UI layer.

============================================================
FILE: planning/sprints/002-deterministic-engine/handoff-prompt.md
============================================================

# Sprint 002 Builder handoff

- **objective** — Implement the approved deterministic team-quarter transition and local fixtures.
- **owns** — `src/simulation.ts` and `tests/simulation.test.ts`. Architect owns the Pack and may perform standard close-out after independent acceptance review.
- **must_not** — Alter mechanics or pilot bounds, add dependencies, implement access/UI/persistence/ranking, commit, push or deploy.
- **acceptance** — Satisfy criteria 1–5 in the applied acceptance document.
- **verification** — Run `node --test tests/simulation.test.ts` and `git diff --check`. Report exact counts and any limitations. Inspect all changed files for scope.
