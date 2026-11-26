============================================================
FILE: planning/sprints/003-participant-loop/requirements.md
============================================================

# Sprint 003 requirements

Give one local team alias a decision center and results view for all six quarters of professional-pilot-v1. The future pilot remains one invite-only session with one instructor and two teams using aliases. This prototype holds state in memory for one browser page. Admission, team isolation, persistence, instructor controls, shared publication, ranking and debrief belong to later sprints.

============================================================
FILE: planning/sprints/003-participant-loop/blueprint.md
============================================================

# Sprint 003 blueprint

Serve a local browser page from a loopback-only Node server with fixed routes. Use native browser controls and modules and Node's TypeScript stripping to share the existing engine without adding dependencies. An in-memory participant controller owns opening state, the latest result and whether the decision form is active. Submit five explicit integers from 0 to 5. Show cost per block, entered total, available authority and opening cash. Use a read-only engine budget projection so the interface and engine share cost and allowance rules. The engine validates the actual decision. Rejections retain the form and state. Success shows one quarter's results and holds the next decision until the participant continues. At quarter six, show completion and omit the next action.

Display the six raw KPIs with units, QES out of 100, revenue, base expense, cost of poor quality, spend, profit, opening and closing cash, and available and remaining spending authority. Translate returned explanation IDs into plain language for disruption, immediate complaint recovery, scheduled effects and applied effects. Use quarter-aware wording when a scheduled effect falls beyond the scenario. Show a neutral message if the engine returns no explanations.

## Flight evidence

Cross-layer. The loop crosses browser input, participant state, simulation transition and rendered results. Baseline is clean commit 47654ad. The Sprint 002 contract and src/simulation.ts provide initialTeamState, resolveQuarter, nextState, finances, kpis, qes and explanation IDs. Map the input names by category, capture the engine's returned state exactly once, and display the engine's result with units. Continue uses nextState without reconstructing budget or effects. Team B's Q1 [1,2,0,1,1] then zero Q2 must produce $175,000 closing cash, 91% on-time delivery and 79.41 QES, against 85% and 68.25 if pending effects are lost. Q1 $60,000 spend exceeds authority despite $100,000 opening cash and must not advance. Q6 shows its results with no Q7 entry. Pilot invitation, publication fields and recovery remain open.

============================================================
FILE: planning/sprints/003-participant-loop/acceptance.md
============================================================

# Sprint 003 acceptance

1. A local browser shows an alias, current quarter, five labeled inputs, $10,000 per block, current spend, separate available authority and cash, and the Q1 disruption.
2. Missing, fractional, out-of-range, or unaffordable input preserves the current quarter and gives actionable feedback. A $60,000 Q1 decision fails with $50,000 authority and $100,000 cash. Submitting twice before continuing resolves once.
3. Team B's approved Q1 decision followed by zero Q2 spend shows Q1 scheduled effects and Q2 applied effects, Q2 $175,000 closing cash, 91% on-time delivery and 79.41 QES. All six KPIs and finances are labeled. A Q1 complaint investment explains its immediate effect.
4. Continue advances to the next decision with correct cash and carried authority. After six resolutions Q6 results and completion are visible without a next action. Refresh starts a new local run.
5. Existing engine scenarios remain green. Review the rendered decision and result screens as well as automated flow evidence.

============================================================
FILE: planning/sprints/003-participant-loop/handoff-prompt.md
============================================================

# Sprint 003 Builder handoff

- **objective** Build the local participant decision and results loop for the fixed professional scenario.
- **owns** The participant controller, browser HTML/CSS/JS, local server, engine budget projection, targeted participant tests, and standard close-out records.
- **must_not** Change engine rules or add live session services, identity, storage, publication, ranking or debrief.
- **acceptance** Meet all five numbered criteria in acceptance.md.
- **verification** Run node --test tests/simulation.test.ts tests/participant.test.ts, start node scripts/serve-participant.mjs and check the six-quarter browser flow, then run git diff --check. Record results, request independent inspection and run the Fly close-out.
