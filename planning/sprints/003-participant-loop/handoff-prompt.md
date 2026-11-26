# Sprint 003 Builder handoff

- **objective** Build the local participant decision and results loop for the fixed professional scenario.
- **owns** The participant controller, browser HTML/CSS/JS, local server, engine budget projection, targeted participant tests, and standard close-out records.
- **must_not** Change engine rules or add live session services, identity, storage, publication, ranking or debrief.
- **acceptance** Meet all five numbered criteria in acceptance.md.
- **verification** Run node --test tests/simulation.test.ts tests/participant.test.ts, start node scripts/serve-participant.mjs and check the six-quarter browser flow, then run git diff --check. Record results, request independent inspection and run the Fly close-out.
