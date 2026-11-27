# Sprint 006 Architect briefing

## Executive summary

- **Business outcome** — Teams can correct an over-budget draft and review how their investments contributed to a published quarter before deciding what to do next.
- **Current focus** — Observe both tasks without coaching during the full facilitated rehearsal.
- **What is proven** — The pilot browser and service agree on the six-to-five boundary, six blocks can be valid with carryover, and team feedback respects publication and role boundaries.
- **What is not live** — The participant pilot. Independent participant comprehension and full-session pacing are unverified.

## Readiness signals

| Signal | Status | Evidence |
| --- | --- | --- |
| Budget and submission | passed | Chrome verified six-to-five recovery, both role states, later six-block acceptance and distinct cash-only feedback with a synthetic snapshot. |
| Published investment feedback | passed | Chrome verified Q1 and Q2 attribution, observed KPIs, publication timing, team separation, refresh, role switching and Q6 scheduling. |
| Uncoached participant recovery and interpretation | attention | No unfamiliar participant performed the two tasks. Automation verified browser behavior only. |
| Full pilot pacing | attention | The Sprint 005 technical rehearsal took about 60 minutes. The full facilitated rehearsal remains pending. |

## Validation

**Tests:** 23 passing, 0 failing.

Zero skipped and zero cancelled. Node 26.13.1. The loopback-restricted run returned EACCES on five API checks. The Builder and Architect each ran the suite with loopback access and it exited 0. The final run used `node --test tests/simulation.test.ts tests/participant.test.ts tests/pilot.test.ts`. `node --check src/pilot-view.js` and `git diff --check` exited 0. Git reported line-ending notices.

## Evidence

- The Pack dry run and application each reported the same four Sprint 006 paths. The baseline was clean main at `595b686`.
- A temporary pilot with three isolated Chrome contexts verified the warning and its status-region markup, draft preservation, instructor state, valid retry, and a six-block submission after allowance carried forward. A synthetic snapshot with $70,000 authority and $55,000 cash verified the distinct opening-cash guidance on a $60,000 draft. The engine suite separately verified the authoritative cash check.
- Q1 publication showed Maple's complaint investment and scheduled process investment. Q2 resolve retained Q1 on the team screen. Q2 publication displayed Q1's two applied process blocks, observed on-time delivery of 89.00%, and one Q2 process block scheduled for Q3. Cedar's different investments remained private. Refresh retained the summary. Q6 scheduled effects were labeled beyond the session. Switching to instructor cleared the team summary.
- The prior Sprint 004 state snapshot was copied and compared before trimming the boot file.

## Plan corrections

The decision summary labels investment effect direction separately from observed KPI values. This avoids implying that a single investment accounts for the whole KPI change or any change masked by a cap. The Chrome harness initially matched its own assumed text structure and was corrected to use rendered labels. No product change was needed for those harness corrections.

## Flight record

Cross-layer. No separate plan decision was required. A Builder context implemented from the applied Pack. The separate Architect context inspected the implementation diff and ran the final suite and Chrome workflow. One inspection decision passed. No residual technical risk was accepted. The Pack explicitly calls for recording unavailable human observations as attention.

## Recommended next Architect action

- **Do** — Run the full facilitated rehearsal and capture uncoached budget recovery, investment interpretation and round pacing.
- **Owner** — Project owner and instructor.
- **Decision** — Use those observations to decide pilot invitation readiness and whether the participant Results screen needs further revision.
