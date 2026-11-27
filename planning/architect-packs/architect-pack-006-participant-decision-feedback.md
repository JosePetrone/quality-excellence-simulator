============================================================
FILE: planning/sprints/006-participant-decision-feedback/requirements.md
============================================================

# Sprint 006 requirements

Improve the invite-only pilot's participant decision-to-results loop. During entry, show a live budget summary and actionable recovery instructions. After instructor publication, surface the latest own-team quarter's investment effects above expandable details, so the team can use them for its next decision.

Use the Decision Center and Results mockups for grouping and hierarchy. Preserve the existing five investment categories, whole-block inputs, two-team pilot, authoritative rules, role boundaries and release workflow. Defer other mockup features, layout redesigns, projections, new scoring and the full pacing rehearsal.

============================================================
FILE: planning/sprints/006-participant-decision-feedback/blueprint.md
============================================================

# Sprint 006 blueprint

In the team form show planned spend, allowance remaining or overage, and actionable inline feedback. Keep opening cash distinct. Use the current role snapshot for allowance and cash and the existing engine block cost. Recompute from valid draft inputs on edit and on relevant snapshot refresh. Prevent over-limit submission locally while retaining the service guard and actionable handling of server validation errors. Keep editable inputs intact through rejection and polling. Make changes readable without color and announce budget errors via accessible status.

Render a visible, quarter-labeled summary of the latest published own-team results before expandable detail. Group immediate, previously applied and newly scheduled effects. Trace delayed effects to the preceding quarter's submitted decision. Show category-specific KPI direction supported by the engine and relevant actual KPI values with separate labels. For Q6 scheduled effects say they are beyond the session. Keep the section absent until there is a published quarter and clear it on role change or sign-out. Preserve detailed results and instructor debrief.

## Flight evidence

Cross-layer. The team form must agree with the authoritative allowance and cash checks, and the investment summary must represent only the latest published own-team result with correct source quarter. At clean main 595b686, src/pilot-view.js sums form inputs, src/pilot-store.mjs exposes the role budget and calls resolveQuarter before saving, and src/simulation.ts multiplies blocks by BLOCK_COST and validates allowance and cash separately. The store also projects published rounds and own decisions. The view can link each applied explanation to the previous published own-team decision; current effects use the current round. The inherited instructor debrief already uses this timing rule.

Discriminating cases: Q1 three training plus three process exceeds $50,000 by $10,000; reducing process to two fits exactly. Later authority and cash can support six blocks. An allowance above cash must not suppress the cash check. Q1 two process and one complaint, followed by Q2 one process and zero complaints, distinguishes applied Q1 two blocks from scheduled Q2 one block, with no immediate Q2 complaint attribution. A competing team uses a different allocation. Before Q2 publication retain Q1 only. Q6 scheduled investments act beyond the session. Recorded effects describe engine contributions and actual KPIs show the combined outcome.

The exact warning Cedar saw and uncoached participant behavior remain unverified by source inspection.

============================================================
FILE: planning/sprints/006-participant-decision-feedback/acceptance.md
============================================================

# Sprint 006 acceptance

1. Fresh Q1: enter three training and three process blocks. Visible text shows $60,000 planned and $10,000 over the $50,000 allowance and tells the team to remove one block. The warning is available to assistive technology and understandable without color. A submit attempt leaves inputs editable and the instructor sees awaiting submission. Reduce process to two; the warning clears, $50,000 planned and $0 remaining appear, and submission is accepted for both roles.
2. In later quarters six blocks are accepted when allowance and opening cash cover them. An otherwise allowed draft above opening cash receives distinct, actionable guidance. Server enforcement remains in place.
3. Before Q1 publication the team has no investment summary. Give the team one complaint and two process blocks in Q1, then one process and zero complaint blocks in Q2. After Q1 publication show the immediate satisfaction effect and the process effect scheduled for Q2. Awaiting Q2 publication show Q1 only. After Q2 publication show Q1's two process blocks as applied to on-time delivery and Q2's one process block as scheduled for Q3, with relevant observed KPI values labeled separately. A competitor with different investments sees only its own explanation. Show beyond-session timing for delayed Q6 decisions. Verify browser refresh and role switching.
4. After standard introduction, an unfamiliar participant independently explains the six-block warning, reduces to five and submits without hints. The same or another unfamiliar participant finds the published summary without expanding details and explains one applied effect and its originating quarter without hints. Capture explicit observations, including any prompting. An unavailable participant or a prompted trial leaves the affected human check at attention. Automated and operator checks must be reported separately.

Run the existing Node simulation, participant and pilot suites, real browser checks with isolated team and instructor contexts, and git diff --check. Verify both human tasks separately from the technical checks.

============================================================
FILE: planning/sprints/006-participant-decision-feedback/handoff-prompt.md
============================================================

# Sprint 006 Builder handoff

- objective: Help teams submit within budget and understand how their investments affected the latest released quarter.
- owns: Team-facing pilot HTML, JavaScript and CSS, narrowly targeted validation fixtures if needed, and annotated close-out after independent review.
- must_not: Change simulation rules, API contracts, persistence, auth, scoring, role disclosure or publication behavior. Do not rework other screens, commit, push or deploy.
- acceptance: Execute all numbered checks. Record any unavailable independent participant evidence as attention without claiming it passed.
- verification: Run node --test tests/simulation.test.ts tests/participant.test.ts tests/pilot.test.ts with loopback access, real browser checks, the two independent human observations where available, and git diff --check. Record exact results and return the diff for Architect inspection before close-out.
