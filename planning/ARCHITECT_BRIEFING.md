# Sprint 004 Architect briefing

## Where things stand

One instructor and two alias-based teams can now run a recoverable pilot session in local browsers. The instructor resolves submitted decisions and releases results separately.

## Executive summary

- **Business outcome** — An instructor can run and recover a two-team session while each team retains private decisions and sees the scores the instructor releases.
- **Current focus** — Prepare the debrief and agree on rehearsal conditions before inviting teams.
- **What is proven** — Role isolation, credential renewal, round integrity, durable recovery, the publication boundary and six-quarter completion on loopback.
- **What is not live** — Private HTTPS access from separate computers, final rankings, debrief and pilot rehearsal.

## Readiness signals

| Signal | Status | Evidence |
| --- | --- | --- |
| Team access and release | passed | Automated role and field checks plus three isolated Chrome contexts. |
| Durable round progression | passed | Concurrent resolution, forced rollback, restart checkpoints and malformed checkpoint rejection. |
| Separate-computer rehearsal | attention | Private HTTPS, operator retention rules and rehearsal measures remain open. |

## Validation / test status

**Tests:** 20 passing, 0 failing.

No skips or cancellations. Node 26.13.1. The repository has no configured static TypeScript check.

## Evidence

- The Architect Pack dry-run and apply both exited 0 and reported the same four Sprint 004 destinations.
- `node --test tests/simulation.test.ts tests/participant.test.ts tests/pilot.test.ts` exited 0 with local TCP access. The restricted first run blocked local TCP on the five pilot tests.
- `node scripts/serve-pilot.mjs init <absolute-temporary-db> Cedar Maple` and `node scripts/serve-pilot.mjs serve <absolute-temporary-db>` were exercised with a temporary database. Three isolated Chrome browser contexts verified sign-in, refresh, distinct submissions, instructor resolution and publication, both teams' released scores, next-quarter entry and refresh of published history. The rendered instructor and team views were inspected.
- `git diff --check` exited 0 with line-ending notices. Untracked files were checked individually for whitespace diagnostics.

## Plan corrections

The sprint scope held. The first plan review required explicit concurrency and restart assertions. The first inspection found that incomplete persisted state could reopen and lose an accepted decision. The repair replays saved decisions before accepting the checkpoint and verifies three corruption cases on reopen.

## Flight record

Critical. The authorization boundary runs from the bearer credential through the SQLite transaction and role-derived projection to the browser. Reviewed on baseline `37d835a`. Team B retained the Q1 effects in Q2 and matched the fixture of $175,000 cash, 91% on-time delivery and 79.41 QES. Before publication, neither team received the resolved quarter. Shared rows contained only each alias and QES. Repeat resolution, rollback, credential replacement and stale actions were checked without changing the engine.

| ID | First decision | Severity | Failure and correction | Status |
| --- | --- | --- | --- | --- |
| PLAN-001 | Plan 1 | blocking | Make simultaneous instructor resolution and single advancement explicit. | resolved |
| PLAN-002 | Plan 1 | blocking | Test restart with a pending decision, resolved embargo and published history. | resolved |
| INSPECT-001 | Inspection 1 | blocking | Reject an incomplete decision, state or result by validating the checkpoint before reopening. | resolved |

Three plan decisions and two independent inspection decisions. No residual risk was accepted.

## Recommended next Architect action

- **Do** — Specify the final scoring and debrief, then define the separate-computer rehearsal.
- **Owner** — Project owner, Architect and instructor.
- **Decision** — Approve scoring and ties, retention, private HTTPS setup and evidence for pilot success.

Use one instructor and two teams on separate computers to rehearse the full six-quarter session and debrief before inviting pilot participants.
