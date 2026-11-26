# QualityEdge validation

Sprint 001 checks the planning artifacts through Pack import verification, Git diff and independent review. The following checks belong to future implementation sprints.

| Check | Evidence expected |
| --- | --- |
| Replay | Repeat the same rule version, start state and decisions. Compare all outputs and next state across runs. |
| Budget and cash | An unused allowance can carry forward under the adopted rules without increasing cash. Reconcile closing cash and verify overspend is rejected without changing state. |
| Delayed effects | Use different current and prior allocations. Compare before activation, when due and after expiry under approved rules. Retrying resolution produces the same result without reapplying effects. |
| Scoring | Check higher- and lower-is-better KPIs, caps, zero denominators, selected rounding and an ineligible team with high QES. Assert ties and final aggregation once defined. |
| Team isolation | In an authorized test environment use two independent team sessions and an instructor session. Assert access decisions for own-team reads and writes, cross-team requests, out-of-session callers, publications and live subscriptions. |
| Round integrity | Check duplicate submissions or close requests, incomplete decisions, reconnect and recovery, and consistent published results across the three operator surfaces. |
| Pilot rehearsal | On separate computers, run one instructor and exactly two alias-based teams through six rounds and the debrief. Record timings, facilitator interventions, access or recovery failures, and whether each team can explain a decision trade-off. Approve thresholds before the rehearsal. |

The two-quarter worked example offers a candidate fixture shape. For example, using its prior-investment terms yields 8,850 on-time transactions for Team B in Q2. Omitting both prior terms yields 8,100. Adopt expected numbers only after approving the rules and recalculating them independently. Extend coverage with a six-round fixture before relying on the example to support full-session behavior.
