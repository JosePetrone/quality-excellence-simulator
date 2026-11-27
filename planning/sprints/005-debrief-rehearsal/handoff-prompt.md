# Builder handoff

Implement only this sprint after a fresh Architect passes the exact plan.

- objective: Deliver private, reproducible final standings and an instructor debrief, with an executable separate-computer rehearsal procedure.
- owns: src/pilot-* and new scoring module under src, relevant pilot tests, docs/API.md, docs/ARCHITECTURE.md, docs/VALIDATION.md and normal planning close-out.
- must_not: Change the quarterly engine, persisted format, credential or network exposure model, add dependencies or deploy, provision paid services, delete user files, or imply physical rehearsal passed without evidence.
- acceptance: Meet numbered criteria in acceptance.md, with separate-computer execution pending if operator prerequisites are unavailable.
- verification: Run node --test tests/simulation.test.ts tests/participant.test.ts tests/pilot.test.ts, git diff --check, and perform an instructor and team browser read-through using a disposable alias-only loopback session. Record any physical rehearsal evidence separately.
