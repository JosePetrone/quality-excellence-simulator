# Sprint 006 Builder handoff

- objective: Help teams submit within budget and understand how their investments affected the latest released quarter.
- owns: Team-facing pilot HTML, JavaScript and CSS, narrowly targeted validation fixtures if needed, and annotated close-out after independent review.
- must_not: Change simulation rules, API contracts, persistence, auth, scoring, role disclosure or publication behavior. Do not rework other screens, commit, push or deploy.
- acceptance: Execute all numbered checks. Record any unavailable independent participant evidence as attention without claiming it passed.
- verification: Run node --test tests/simulation.test.ts tests/participant.test.ts tests/pilot.test.ts with loopback access, real browser checks, the two independent human observations where available, and git diff --check. Record exact results and return the diff for Architect inspection before close-out.
