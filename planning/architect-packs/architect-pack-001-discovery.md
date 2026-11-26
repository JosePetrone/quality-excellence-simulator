============================================================
FILE: planning/sprints/001-discovery-architecture/requirements.md
============================================================

# Sprint 001 Requirements — Discovery / Architecture

Define the architecture and verification path for one invite-only QualityEdge pilot session with one instructor and exactly two teams identified by aliases. Carry forward the professional-level format of six quarterly rounds, with a 10-minute introduction, six 15-minute rounds, and a 20-minute debrief. An actual pilot run belongs to a later sprint.

Deliver a documented system boundary, pilot workflow and data boundaries, test strategy, recorded decisions and unresolved questions, and a handoff for an engine-only next sprint. All Git activity stays local. Sprint 001 is documentation only. Public registration, commercial features, multi-tenant operations, and production deployment sit outside the pilot planning scope.

============================================================
FILE: planning/sprints/001-discovery-architecture/blueprint.md
============================================================

# Sprint 001 Blueprint — Discovery / Architecture

Document the pilot workflow, an engine boundary independent of UI and persistence, and the trusted boundary required for team isolation in a later sprint. Keep platform choices provisional. Record open decisions and their owners in the planning registers. Describe the engine-only next sprint and its gates in the handoff. Use the two supplied files as illustrative sources.

## Flight evidence

- Class is local. The delivered surface is planning and architecture Markdown.
- Invariant: the documents preserve the approved pilot cohort and distinguish requirements from illustrative mechanics and unresolved decisions.
- Source of truth: the owner's approved cohort, the repository intake, and the baseline at `41c96e6`. The board-game reconstruction and worked example inform candidate fixtures. Review the applied sprint authority, architecture, validation and planning registers as one documentation surface.
- No cross-layer runtime trace applies. A reviewer can falsify the invariant by finding physical-game procedures, worked-example coefficients, or expanded access presented as binding requirements.
- Final financial rules, event effects, KPI normalization, eligibility, ranking, and access implementation remain open.

============================================================
FILE: planning/sprints/001-discovery-architecture/acceptance.md
============================================================

# Sprint 001 Acceptance — Discovery / Architecture

1. The architecture describes one invite-only session, one instructor, two alias-based teams, the participant-to-debrief flow, and the private/public boundary.
2. The architecture describes deterministic engine inputs and outputs, leaving unresolved mechanics explicit. Validation includes replay, budget/cash separation, delayed effects, scoring boundaries, team isolation and pilot rehearsal.
3. Both references are attributed as illustrative. Prototype limitations, risks, and open decisions carry concrete follow-up gates.
4. The handoff defines the next engine-only slice and requires written approval of the rule contract before engine implementation.
5. Changes stay in planning and docs. Verify identical Pack and sprint contents for the four declared destinations and run `git diff --check`. Obtain independent review, then verify the roadmap, briefing, state and status at close.

============================================================
FILE: planning/sprints/001-discovery-architecture/handoff-prompt.md
============================================================

# Sprint 001 Builder Handoff — Discovery / Architecture

- **objective** — Produce the architecture, validation and planning record for the bounded pilot.
- **owns** — `docs/ARCHITECTURE.md`, `docs/VALIDATION.md`, `planning/DOMAIN.md`, `planning/DECISIONS.md`, `planning/RISKS.md`, `planning/QUESTIONS.md`, and standard close-out in STATE, ROADMAP, ARCHITECT_BRIEFING and STATUS.
- **must_not** — Write application code, choose unapproved mechanics, add integrations, commit, push or deploy.
- **acceptance** — Satisfy all five numbered criteria in the applied acceptance file.
- **verification** — Run `node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-001-discovery.md --dry-run`, compare the four applied files to Pack bodies, and run `git diff --check`. Inspect scope with `git status --short --untracked-files=all`. Close only after independent review.

## Next Builder handoff

Proposed Sprint 002 delivers a pure deterministic decision-to-result engine and local fixtures, with no UI or persistence. Its Architect must first specify the smallest playable scenario and approve exact initial state, inputs and units, spending constraints and cash reconciliation, action and event effects, KPI and QES rules applicable to the slice, rounding, and expected outputs. Establish at least one discriminating fixture for each selected rule and get implementation approval in the next sprint. Any eligibility, ranking, or multi-round rules omitted from that slice remain explicit deferrals.
