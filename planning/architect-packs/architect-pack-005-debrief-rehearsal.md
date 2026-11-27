============================================================
FILE: planning/sprints/005-debrief-rehearsal/requirements.md
============================================================

# Sprint 005 requirements

After the instructor publishes quarter six, show final standings to all three roles by alias, with eligibility, final QES, rank and winner outcome. Show six quarterly observations for each of the six raw KPIs and explain immediate and delayed decision effects in the instructor debrief. Preserve existing team privacy and publication behavior. Use approved, verified ISO 9001 references only. Provide an operator rehearsal procedure and evidence sheet for private HTTPS on three computers. Provisioning and the physical rehearsal require an owner-controlled endpoint and three operators or computers. Carry that checkpoint forward visibly if unavailable.

============================================================
FILE: planning/sprints/005-debrief-rehearsal/blueprint.md
============================================================

# Blueprint

Derive standings server-side from the six persisted engine results after the complete transition. Convert each official two-decimal quarterly QES to integer hundredths, sum all six and compare the sums before rounding the displayed mean to two decimals. Eligibility requires Q6 closing cash greater than zero and total operating profit over Q1–Q6 at least zero. Rank eligible teams by descending QES sum, then descending cumulative operating profit. Equal values share rank and the win. Ineligible teams have no rank. With no eligible teams the result declares no winner. Keep ordering deterministic within a tie and within the ineligible group. The shared projection exposes only alias, displayed QES, eligibility, rank and session winner outcome. Keep the existing round projections. Render instructor trends with units and six labeled quarter observations per KPI and team. Use existing explanations to link submitted decisions with immediate, scheduled and applied effects. Arrange facilitation around standings (2 minutes), KPI trends (4), decision impacts (6), ISO 9001 discussion (5), and lessons (3). Use general quality-management prompts until clause references have been verified by the facilitator. Preserve persisted data format and replay.

## Flight evidence

Critical because forwarding and the new shared projection can cross existing privacy and release boundaries. Baseline 4236dee5884f09774b6a596a6504c41c2a1edda0. Engine resolveQuarter produces official QES and integer finances. Store replay and snapshot control access and publish moves phase from resolved to complete at Q6. Browser renders by role. The HTTP service verifies Origin and external Host and binds to loopback. The invariant is that only completed results enter standings and competitor decisions and detailed KPI records remain private. Examples must distinguish a high-scoring ineligible team, equal displayed means with unequal sums, ties separated by profit, an exact shared tie and no winner. Use distinct team decisions and ensure Q6 standings are absent before publication and appear after publication and restart. Exercise unauthorized and cross-team views. An owner-provided HTTPS endpoint remains unconfirmed. Preserve external Host, restrict network access to invited devices, keep credentials and decisions out of proxy logs, record traffic controls and monitoring before use, and avoid provisioning or spend without separate authority.

============================================================
FILE: planning/sprints/005-debrief-rehearsal/acceptance.md
============================================================

# Acceptance

1. Six published quarters produce the specified standings. Tests distinguish cash and profit boundaries, high-QES ineligibility, exact-mean ordering before display rounding, profit tie-break, shared rank and no winner.
2. Final standings are absent before Q6 publication and present afterward and on restart. Unauthorized requests cannot see them. Team snapshots expose only the allowed comparison fields and keep competitor decisions and detailed results private.
3. Instructor view shows standings, six quarter values for each KPI for each team, and rule-based immediate and delayed examples when present. Team views show standings by alias. Verify rendered instructor and team views.
4. Document the private HTTPS rehearsal, including three computers, one instructor and two alias-based teams, six published quarters, the 120-minute target, no access or isolation failures, one explained decision trade-off per team, and observation of facilitator interventions. Capture participant-role timings and issues without credentials or private decisions. Keep operator-controlled database and backups outside the repo with seven-day retention. Physical rehearsal evidence is an operator gate before pilot invitations. If unavailable record it as pending, with no claim of rehearsal completion.
5. Existing loopback tests pass and git diff checks are clean. Record actual evidence and the outstanding operator gate in the briefing.

============================================================
FILE: planning/sprints/005-debrief-rehearsal/handoff-prompt.md
============================================================

# Builder handoff

Implement only this sprint after a fresh Architect passes the exact plan.

- objective: Deliver private, reproducible final standings and an instructor debrief, with an executable separate-computer rehearsal procedure.
- owns: src/pilot-* and new scoring module under src, relevant pilot tests, docs/API.md, docs/ARCHITECTURE.md, docs/VALIDATION.md and normal planning close-out.
- must_not: Change the quarterly engine, persisted format, credential or network exposure model, add dependencies or deploy, provision paid services, delete user files, or imply physical rehearsal passed without evidence.
- acceptance: Meet numbered criteria in acceptance.md, with separate-computer execution pending if operator prerequisites are unavailable.
- verification: Run node --test tests/simulation.test.ts tests/participant.test.ts tests/pilot.test.ts, git diff --check, and perform an instructor and team browser read-through using a disposable alias-only loopback session. Record any physical rehearsal evidence separately.
