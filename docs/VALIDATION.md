# QualityEdge validation

Sprint 001 checked the planning artifacts through Pack import verification, Git diff and independent review. Sprint 002 adds engine checks. Run `node --test tests/simulation.test.ts` with a Node runtime that supports native TypeScript stripping. The close-out used Node 26.13.1. This command runs runtime tests. The repository has no configured static TypeScript check.

| Check | Evidence expected |
| --- | --- |
| Replay | Repeat the same rule version, start state and decisions. Compare all outputs and next state across runs. |
| Budget and cash | An unused allowance can carry forward under the adopted rules without increasing cash. Reconcile closing cash and verify overspend is rejected without changing state. |
| Delayed effects | Use different current and prior allocations. Compare before activation, when due and after expiry under approved rules. Retrying resolution produces the same result without reapplying effects. |
| Scoring | Check higher- and lower-is-better KPIs, caps, zero denominators, selected rounding and an ineligible team with high QES. Assert ties and final aggregation once defined. |
| Team isolation | In an authorized test environment use two independent team sessions and an instructor session. Assert access decisions for own-team reads and writes, cross-team requests, out-of-session callers, publications and live subscriptions. |
| Round integrity | Check duplicate submissions or close requests, incomplete decisions, reconnect and recovery, and consistent published results across the three operator surfaces. |
| Pilot rehearsal | On separate computers, run one instructor and exactly two alias-based teams through six rounds and the debrief. Record timings, facilitator interventions, access or recovery failures, and whether each team can explain a decision trade-off. Approve thresholds before the rehearsal. |

The approved Sprint 002 fixtures exercise two teams across three quarters, a loss and recovery branch, and a six-quarter transition and termination check. Team B reports 9,100 on-time transactions and 79.41 QES in Q2. Without its due effects, the results would be 8,500 and 68.25. Future sprints own final eligibility, aggregation, ties, isolation and the live rehearsal.
