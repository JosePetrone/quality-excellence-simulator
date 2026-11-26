============================================================
FILE: planning/sprints/004-isolated-pilot/requirements.md
============================================================

# Sprint 004 requirements

Deliver one recoverable invite-only professional-pilot-v1 session, one instructor and exactly two distinct team aliases. The instructor can see submission status and inspect both teams, resolve after both valid submissions, and separately release the results. Resolution saves both results together once. Publication opens the next quarter or completes Q6. Each team's first accepted decision is final for that quarter. Each team sees its own submitted decision and the shared status of its own round. Before publication, only the instructor sees resolved results. Once published, teams see their own detailed history and a shared projection containing both aliases and each published quarterly QES only.

Give each role a separate expiring credential. Recover on refresh or process restart using the role credential and durable state. The instructor can replace a team's credential, invalidating all use of the previous credential. The trusted local operator provisions and can renew the instructor credential. Collect no participant names or email. Use Node and SQLite for one service and one session per database. Verify on loopback with three independent browser contexts. Separate computers require owner-provisioned private HTTPS forwarding to loopback and a supervised rehearsal. Hosting, public signup, final scoring, rankings, debrief and commercial features are out of scope.

============================================================
FILE: planning/sprints/004-isolated-pilot/blueprint.md
============================================================

# Sprint 004 blueprint

Keep the Sprint 003 standalone entry point. Add a distinct pilot browser and loopback-only Node server with one operator-supplied absolute SQLite database path outside the repository. Provision aliases and credentials from an explicit local console command. Store only credential digests, with 24-hour absolute expiration, and display plaintext only at issue or rotation. Use cryptographically random credentials with at least 128 bits of entropy. Send credentials in an Authorization header, keep each tab's credential in sessionStorage for refresh, and re-prompt on invalid or expired access. A local operator can rotate the instructor credential. The instructor may rotate either team credential without changing state. Treat credentials and aliases as untrusted inputs. Set no-store, apply request size limits, use safe text rendering, omit CORS, use same-origin JSON requests and avoid credential or decision logging. Loopback binding is mandatory. Forwarding and HTTPS setup, physical access, retention period and formal pilot readiness stay with the owner before invitations. Keep the database and backups under operator control.

Derive role and team from the verified credential on every read and command. Poll a role-specific snapshot. Individual team snapshots omit competitor decisions and detailed results at every phase. Shared result rows use an explicit allowlist. Use expected quarter on submit, resolve and publish. Persist a versioned session containing accepted decisions, engine results, next states and publication checkpoints. Serialize state-changing operations with SQLite transactions, including credential verification and rotation where relevant. Reject stale or out-of-order commands without changing state. An identical submission retry may return current state without reapplying it. Handle crashes via transaction rollback and fail closed on unreadable or unsupported persisted state. Reuse the engine for validation and resolution, and the existing explanation mapping. Distinct roles use a browser interface with decision form and published results for teams, and status, inspection, resolve, publish and team credential rotation for the instructor.

## Flight evidence

Critical because role and publication failure can disclose private decisions. Verified clean baseline 37d835a and 15 passing baseline tests on Node 26.13.1. The baseline browser submit in src/participant-view.js calls createParticipant in src/participant.ts, which calls resolveQuarter in src/simulation.ts and holds nextState in memory. scripts/serve-participant.mjs only serves fixed loopback assets. The pilot moves state ownership to the service and SQLite, keeping the same engine and presenting only role-projected snapshots. The only shared results are alias and quarterly QES, grouped by published quarter.

Use distinct decisions for the two teams. For the Team B fixture, Q1 training 1, process 2, complaints 0, technology 1 and risk 1, then zero spend Q2 yields Q2 closing cash 175000, on-time delivery 91% and QES 79.41. Loss of pending effects yields 85% and 68.25. With Q1 cash 100000 and authority 50000, a 60000 decision fails despite sufficient cash. Unauthorized credentials, attempts to select another team, and prepublication reads must not disclose distinctive private fields. Before publish, both distinct QES values are instructor-only; after publish, both are shared, but the distinct private inputs and detailed financials stay scoped. Race resolution twice and check both teams advance one time only. Recover from a restart between resolve and publish, and verify the same outcomes, publication gate and quarter after reopening. Old credentials must stop working on rotation, and stale quarter commands must never act on a later quarter. HTTPS and separate-computer access are unverified in this repository.

============================================================
FILE: planning/sprints/004-isolated-pilot/acceptance.md
============================================================

# Sprint 004 acceptance

1. Provision one instructor and exactly two alias roles. Each independent browser can authenticate, refresh and resume. Missing, invalid, expired and replaced credentials lose access. Instructor can rotate either team credential. Local operator can rotate instructor access.
2. Team A cannot read or write as Team B. Team clients cannot resolve, publish or rotate credentials. Instructor can inspect accepted decisions and resolved results. Before publication, team snapshots do not return any resolved quarter data. After publication, a team sees its own decision and detailed results plus an allowlisted alias/QES projection for each published quarter, with no competitor-private fields.
3. Validate budget and decisions using the engine. Only both complete submissions permit resolve. First accepted decisions are final. Duplicate, stale, concurrent or out-of-order actions cannot resolve, overwrite or release twice or affect a later quarter. Advancing to Q2 preserves delayed effects and matches the Team B fixture.
4. Persistence recovers authenticated progress and retained pending, resolved and published data after server restart. An injected failure between resolution and transaction commit rolls back the entire change. Publication opens the next quarter and Q6 publication ends the session without Q7.
5. Baseline participant flow still passes. Check rendered instructor and both team views in three isolated browser contexts and verify credential recovery and release. Document runtime and HTTPS prerequisites and distinguish local evidence from separate-computer rehearsal.

============================================================
FILE: planning/sprints/004-isolated-pilot/handoff-prompt.md
============================================================

# Sprint 004 Builder handoff

- **objective** Deliver the approved recoverable and isolated two-team pilot session.
- **owns** New pilot Node/SQLite service, operator commands, pilot browser assets and acceptance tests, plus standard close-out records and API documentation.
- **must_not** Change engine rules, standalone participant behavior, pilot size, final scoring or debrief. Do not provision hosting, expose a public service, commit, push, deploy or store plaintext credentials.
- **acceptance** Meet acceptance.md items 1–5 with real evidence and send the complete diff for fresh inspection.
- **verification** Run node --test tests/simulation.test.ts tests/participant.test.ts tests/pilot.test.ts, run the pilot locally against a temporary SQLite database for three isolated browser contexts, and run git diff --check. Record command outputs and any concrete limitations.
