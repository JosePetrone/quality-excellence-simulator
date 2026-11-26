# Sprint 001 Builder Handoff — Discovery / Architecture

- **objective** — Produce the architecture, validation and planning record for the bounded pilot.
- **owns** — `docs/ARCHITECTURE.md`, `docs/VALIDATION.md`, `planning/DOMAIN.md`, `planning/DECISIONS.md`, `planning/RISKS.md`, `planning/QUESTIONS.md`, and standard close-out in STATE, ROADMAP, ARCHITECT_BRIEFING and STATUS.
- **must_not** — Write application code, choose unapproved mechanics, add integrations, commit, push or deploy.
- **acceptance** — Satisfy all five numbered criteria in the applied acceptance file.
- **verification** — Run `node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-001-discovery.md --dry-run`, compare the four applied files to Pack bodies, and run `git diff --check`. Inspect scope with `git status --short --untracked-files=all`. Close only after independent review.

## Next Builder handoff

Proposed Sprint 002 delivers a pure deterministic decision-to-result engine and local fixtures, with no UI or persistence. Its Architect must first specify the smallest playable scenario and approve exact initial state, inputs and units, spending constraints and cash reconciliation, action and event effects, KPI and QES rules applicable to the slice, rounding, and expected outputs. Establish at least one discriminating fixture for each selected rule and get implementation approval in the next sprint. Any eligibility, ranking, or multi-round rules omitted from that slice remain explicit deferrals.
