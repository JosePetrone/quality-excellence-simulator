# Sprint 004 Builder handoff

- **objective** Deliver the approved recoverable and isolated two-team pilot session.
- **owns** New pilot Node/SQLite service, operator commands, pilot browser assets and acceptance tests, plus standard close-out records and API documentation.
- **must_not** Change engine rules, standalone participant behavior, pilot size, final scoring or debrief. Do not provision hosting, expose a public service, commit, push, deploy or store plaintext credentials.
- **acceptance** Meet acceptance.md items 1–5 with real evidence and send the complete diff for fresh inspection.
- **verification** Run node --test tests/simulation.test.ts tests/participant.test.ts tests/pilot.test.ts, run the pilot locally against a temporary SQLite database for three isolated browser contexts, and run git diff --check. Record command outputs and any concrete limitations.
