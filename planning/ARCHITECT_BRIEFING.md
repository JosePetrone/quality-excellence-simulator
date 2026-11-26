# Sprint 003 Architect briefing

## Where things stand

A participant can now make investment decisions and review the results of six quarters in the local professional scenario.

## Executive summary

- **Business outcome** — Participants can act on a budget, see the consequences and use the results to make the next decision.
- **Current focus** — Specify the instructor-led pilot for one instructor and two invited teams using aliases.
- **What is proven** — Local input validation, engine-backed finances and KPIs, explanations, carryover and completion.
- **What is not live** — Invitations, role-scoped access, recovery, shared publication and debrief.

## Readiness signals

| Signal | Status | Evidence |
| --- | --- | --- |
| Participant loop | passed | Browser flow rejected invalid decisions, matched Team B and completed six quarters. |
| Engine regression | passed | 13 existing engine tests and two participant tests passed. |
| Live pilot | attention | Session isolation, instructor control and recovery remain future gates. |

## Validation / test status

**Tests:** 15 passing, 0 failing.

No skips or cancellations. No static TypeScript check is configured.

## Evidence

- The Pack dry-run and apply exited 0 and reported exactly the four Sprint 003 destinations. The corrected Pack was dry-run and reapplied before implementation.
- Node 26.13.1 ran `node --test tests/simulation.test.ts tests/participant.test.ts` with exit 0. The independent reviewer reran it with the same result.
- `node scripts/serve-participant.mjs` started the loopback preview. Browser verification used port 4174 after the initial sandboxed connection failed. Both screens were visually inspected. Browser checks covered missing, fractional, out-of-range and overspend feedback, scheduled and applied effects, immediate complaints, Q3 carryover, Q6 completion and Q1 reset. Team B Q2 showed $175,000 closing cash, 91.00% on-time delivery and 79.41 QES.
- The cross-layer inspection passed on decision 1 with zero blockers. Zero separate plan reviews.
- `git diff --check` exited 0 with line-ending notices.

## Plan corrections

The first Pack write interpolated currency amounts. The Pack and applied files were corrected before implementation. The controller owns transition state and returns the result for rendering. The view holds the rendered result. The roadmap sequence held.

## Recommended next Architect action

- **Do** — Specify instructor controls, team access, session recovery and publication.
- **Owner** — Project owner and Architect.
- **Decision** — Approve who advances a round, how teams enter and recover, and which results participants can see.

Define how the instructor advances rounds and publishes results while keeping each team's decisions private.
