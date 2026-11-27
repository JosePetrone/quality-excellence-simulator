# Sprint 005 Architect briefing

## Where things stand

The instructor can publish final standings after the sixth quarter and guide a debrief using six KPI trends per team and the recorded effects of team decisions. The instructor and both teams saw the same alias-based standings in a local Chrome session. The operator confirmed six published quarters and debrief over private HTTPS on three separate computers in about 60 minutes.

## Executive summary

- **Business outcome** — One instructor can close a six-quarter session, announce the standings and connect decisions to business outcomes.
- **Current focus** — Carry the missing budget warning into UI planning.
- **What is proven** — Deterministic scoring, eligibility and ties, the final publication boundary, role-scoped access, restart and the rendered local debrief.
- **What is not live** — The participant pilot.

## Readiness signals

| Signal | Status | Evidence |
| --- | --- | --- |
| Final standings and team privacy | passed | Scoring fixtures, exact response assertions, Q6 embargo, post-release role reads and restart. |
| Instructor debrief | passed | Local Chrome showed both six-KPI, six-quarter tables and immediate and delayed decision examples in the instructor view. |
| Private HTTPS workflow | passed | Operator confirmed six quarters and debrief on three computers with zero access, refresh or privacy issues. |
| Budget feedback | attention | Cedar needed help after six blocks failed to submit without a clear warning. |

## Validation / test status

**Tests:** 23 passing, 0 failing.

Zero skipped and zero cancelled. Node 26.13.1. The repository has no configured static TypeScript check.

## Evidence

- On baseline `4236dee5884f09774b6a596a6504c41c2a1edda0`, the Pack dry run and apply each exited 0 and identified the same four Sprint 005 files.
- `node --test tests/simulation.test.ts tests/participant.test.ts tests/pilot.test.ts` exited 0 with local TCP access. The restricted baseline run encountered loopback EACCES on the five pilot tests. The same baseline suite with local TCP passed all 20 tests before the three scoring tests were added.
- A disposable alias-only session in three isolated local Chrome contexts showed no final standings while Q6 awaited publication. All roles saw Maple win with 67.26 and Cedar rank second with 66.44 after release. The instructor saw 36 KPI values per team, Cedar's immediate Q1 complaint effect and Maple's Q2 applied effects linked to its Q1 block counts. Team refresh and switching from instructor sign-in to a team sign-in preserved the role boundary.
- `git diff --check` exited 0 and the untracked scoring module passed its no-index whitespace check. Git emitted line-ending notices.
- The Sprint 003 state snapshot and three original question rows were copied verbatim to the archive and read back before trimming the boot files.

## Plan corrections

None. The plan review advised linking applied effects to their originating quarter and block counts and distinguishing Q6 investments scheduled beyond the session. Both are included. The Chrome harness first submitted before the page listeners were ready and succeeded after waiting for module readiness.

## Flight record

Critical. The acceptance invariant is that all roles receive standings only after Q6 publication while detailed decisions and KPIs remain role-scoped. The scoring projection starts from replay-validated results in the SQLite checkpoint and compares exact sums of official QES hundredths before display rounding. The fixture distinguishes equal displayed means with different exact sums and profits, higher-QES ineligibility, profit tie-breaks, shared rank and no winner. The three-computer workflow passed. The abbreviated technical run took about 60 minutes. The owner expects about 120 minutes for the full pilot with the completed UI and team deliberation.

One of three allowed plan decisions and one of three allowed independent inspection decisions. Both passed. There were no blocking findings or accepted residual risks.

## Recommended next Architect action

- **Do** — Use the technical rehearsal findings in UI planning and measure pacing in a full facilitated session.
- **Owner** — Project owner and instructor.
- **Decision** — Decide how to present over-budget feedback and when to measure full-session pacing.

See the [operator rehearsal record](../docs/VALIDATION.md#operator-rehearsal-record).
