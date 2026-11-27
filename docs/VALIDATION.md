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

The approved Sprint 002 fixtures exercise two teams across three quarters, a loss and recovery branch, and a six-quarter transition and termination check. Team B reports 9,100 on-time transactions and 79.41 QES in Q2. Without its due effects, the results would be 8,500 and 68.25.

## Participant loop

Run `node --test tests/simulation.test.ts tests/participant.test.ts` on Node 26.13.1. Start `node scripts/serve-participant.mjs` and open the printed address. Verify invalid inputs and overspend leave Q1 open. Enter Team B's Q1 fixture and submit zero Q2 spend. Verify scheduled and applied effects and Q2 closing cash of $175,000, on-time delivery of 91.00% and QES of 79.41. Continue through Q6 and verify completion and refresh to Q1. In a separate run check that complaint investment produces an immediate explanation.

## Invite-only pilot

Run `node --test tests/simulation.test.ts tests/participant.test.ts tests/pilot.test.ts` with loopback access on Node 26.13.1. Sprint 004 passed 20 tests. The pilot tests use temporary SQLite files and exercise credential lifecycle, role-specific response fields, concurrent resolution, stale commands, restart, invalid checkpoint rejection and transaction rollback.

Run the [local pilot instructions](API.md) in three isolated browser contexts. Confirm that the instructor sees both submissions and can resolve and publish separately. Each team should recover its own view on refresh, have no shared scores before publication, and see both aliases and scores with only its own detailed results after release. Verify a separate-computer HTTPS run before inviting teams.

## Final standings and instructor debrief

The pilot suite also checks financial eligibility boundaries, ordering before display rounding, the profit tie-break, shared rank and no winner. The terminal-session test checks the Q6 publication boundary and reopened state for all roles. For a local browser fixture, give Cedar three complaint blocks in Q1 and Maple one training block, two process blocks, one technology block and one risk block. Use zero blocks in Q2–Q6. Before Q6 publication the final standings should be absent for each role. After publication Maple should rank first at 67.26 and Cedar second at 66.44. Open both instructor KPI tables and verify six labeled values per KPI. Verify that Cedar's Q1 complaint investment has an immediate explanation and that Maple's Q2 delayed effects link to its Q1 decisions. Each team should see the same standings and only its own detailed results.

## Private HTTPS rehearsal

1. The operator records ownership of the private HTTPS endpoint, how access is restricted to the three invited computers, the forwarding limits and health monitoring. Confirm it preserves the external Host header and forwards only to the loopback service. Keep authorization headers, request bodies and decisions out of logs. Use separate alias credentials issued privately for the instructor and both teams. Keep databases and backups in an operator-controlled directory outside the repository and retain them for seven days after the rehearsal.
2. On three separate computers, verify the instructor and two team aliases can join over HTTPS. Confirm access without a credential is denied and each team sees only its own detailed results. Give the 10-minute introduction, run six 15-minute rounds and record when each team submits and the instructor resolves and publishes. Check refresh recovery on each computer. Verify shared scores appear only when released and final standings appear only after Q6 publication. Record access or recovery problems and facilitator interventions as they happen.
3. Run the 20-minute instructor debrief with standings (2 minutes), KPI trends (4), decision impacts (6), ISO 9001 discussion (5), and lessons learned (3). Use general quality-management prompts until any quoted clause reference is verified against authorized text. Ask each team to explain one decision trade-off. Record whether the explanation was given and whether prompting was needed.
4. Mark the rehearsal passed after six published quarters and the debrief in about 120 minutes, zero access or isolation failures, and one explained trade-off per team. Record actual timings and any deviations. Keep unresolved incidents visible and repeat the affected verification before inviting pilot participants.

| Item | Evidence to record | Observed |
| --- | --- | --- |
| Environment | Date, endpoint owner, three device roles, TLS, access restriction, forwarding limits and monitoring | |
| Introduction and six quarters | Start and end, submit time for each team, instructor resolve and publication time per quarter | |
| Access and recovery | Sign-in, privacy and publication checks, refresh recovery, access and forwarding failures | |
| Instructor debrief | Start and end, observations for each of the five steps, each team's trade-off explained or missing | |
| Session outcome | Total duration, facilitator interventions by role, incidents, follow-up owner and overall pass or pending | |
| Retention | Operator and seven-day expiry date for database and backups | |

Use role names or aliases in the evidence sheet. Exclude credentials, decision values and private KPI details. The separate-computer run requires the endpoint and three computers.

### Operator rehearsal record

On 2026-11-27, the operator reported that one instructor, Cedar and Maple completed six published quarters over private HTTPS on three separate Windows 11 computers on a home network. Final standings stayed hidden until Q6 publication and then matched on all three computers. The debrief was visible only to the instructor, and each team explained one trade-off. The operator reported no access, refresh or privacy issues during the run.

The abbreviated technical rehearsal passed in about 60 minutes. The owner expects the full pilot to take about 120 minutes with the completed UI and time for teams to deliberate each quarter. The technical rehearsal did not measure that pacing. Cedar attempted to submit six blocks and received no clear budget warning. The submission succeeded after Cedar reduced the allocation to five blocks with facilitator help.

## Participant decision feedback

Use separate team and instructor browser contexts. In Q1, enter three training and three process blocks for Cedar and attempt submission. Verify the $60,000 plan, $10,000 overage, instruction to remove one block, editable inputs and awaiting submission on the instructor screen. Reduce process to two. Verify $50,000 planned and $0 remaining, then confirm submission on both screens.

Use one complaint and two process blocks for Maple in Q1 and one process block in Q2. After Q1 publication check the immediate customer satisfaction effect and the process effect scheduled for Q2. Resolve Q2 and confirm the old summary stays visible until publication. Then check that Maple sees Q1's two process blocks as applied, the observed 89.00% on-time delivery figure, and Q2's one process block scheduled for Q3. Verify that Cedar gets its own feedback. Check refresh, sign-out and role switching, plus a delayed Q6 decision scheduled beyond the session. After Cedar uses zero blocks in Q2, confirm a six-block draft can submit in Q3. To exercise opening-cash-only feedback, supply a test snapshot with $70,000 allowance and $55,000 cash and verify a $60,000 draft shows $10,000 allowance remaining and a $5,000 cash overage. The engine test covers authoritative cash enforcement separately.

During the full rehearsal, give an unfamiliar participant the standard introduction and ask them to enter a six-block Q1 draft and try to submit. Without budget hints, observe whether they identify the reason, reduce it to five, and submit. After a quarter with a delayed effect is released, ask the same or another unfamiliar participant to find what an investment contributed and identify its source quarter without opening the detailed results or receiving hints. Record success, prompting, review time, and whether the team used the feedback to explain a following-quarter choice. Record browser automation and participant observations separately.
