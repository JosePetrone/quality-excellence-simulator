# AGENTS.md

## Project

**Name:** QualityEdge  
**Client:** Independent commercial venture under the project owner's ownership.  
**Description:** QualityEdge is an interactive, team-based business simulation that enables participants to experience how ISO 9001 principles, service quality management and strategic decision-making influence operational performance, customer satisfaction and business profitability.  
**Tech stack:** Preferred stack, subject to Architect evaluation:- React and TypeScript frontend.- Node.js and TypeScript backend and deterministic simulation engine.- PostgreSQL database.- Supabase for authentication and real-time synchronization.- Vercel for hosting.- GitHub and GitHub Codespaces for version control and development.- Codex and the 120x Architect–Builder methodology.  
**Planning folder:** `quality-excellence-simulator/`  
**Implementation repo:** Downloaded project folder  
**Created:** 2026-11-25

---

## Operating Model

This project uses the 120x Architect / Builder methodology.

The handoff is a folder, not a conversation.

The Architect defines requirements, blueprint, acceptance criteria, risks, decisions, and Builder handoff prompts.

The Builder executes from written artifacts and must not redefine scope or invent product behavior.

---

## Two Roles

This folder is built for both 120x roles. The handoff between them is this folder, not a conversation.

- **Architect**: plans the work: writes requirements, blueprint, acceptance, and the Builder handoff prompt, then saves an Architect Pack in `planning/architect-packs/`. After discovery, it lays out the whole road as "about N sprints" and writes `planning/ROADMAP.md` from `templates/method/ROADMAP.template.md` before or with the first pack. Later roadmap changes are visible git edits, never silent rewrites. Start an Architect session by reading `templates/method/120x-agent-identity.md`, then the filled starter prompt at the project root, `architect-chat-starter-prompt.md`. In Claude Code, run `/architect`; in Codex, run `$120x-architect`; in another tool, paste the filled starter prompt.
- **Builder**: executes the plan: applies the pack, then implements only from the generated sprint files under `planning/sprints/`. In Claude Code, run `/build`; in Codex, run `$120x-builder`; in another tool, start from the approved sprint files or use the Builder kickoff fallback. The Builder may split genuinely independent work across at most 3 helpers with one contract each and no shared files, but it always runs the verification commands itself before calling anything complete, and it records that evidence in the briefing. A helper's claim is not completion; evidence is. At sprint close, if `planning/ROADMAP.md` exists, it changes the matching row from `planned` to `done` and reports road drift in Plan corrections without re-planning it.

The normal code gate remains mandatory for standalone `/build` and `$120x-builder`: the human approves the exact implementation plan. There are two exceptions, and both begin only after the human says `go`. In an active `/fly` or `$120x-fly` session, a genuinely fresh Architect's `pass` on the exact Builder plan is the approval, so implementation proceeds without a second human prompt. That authority ends with the one Pack and sprint created in that flight. In an active `/sprint` or `$120x-sprint` session, the human's `go` is the approval: the Builder builds without a second prompt unless the sprint is guarded (login or permissions, money, personal data, migrations, deletes, irreversible outside actions), in which case the human approves the build plan first. That authority ends with the one `SPRINT.md` created in that session.

At every session, the Architect reads `Executive summary`, `Readiness signals`, and the `Do` / `Owner` / `Decision` lines as named inputs. It keeps the roadmap's optional `Phase` values current through agreed, visible edits. Consecutive rows with the same short human phase name form a derived band; a roadmap without `Phase` remains valid.

At sprint close, the Builder writes `## Executive summary` with `Business outcome`, `Current focus`, `What is proven`, and `What is not live`; `## Readiness signals` with two to four rows whose status is exactly `passed` or `attention`; `**Tests:** N passing, N failing.` at the start of validation; and `Do`, `Owner`, and `Decision` above the recommended action. Attention is honest. Hiding a failing signal to make the board look green breaks the method. Never invent an unsupported judgment.

At sprint close, the Builder keeps the boot files bounded: it moves finished history verbatim into `planning/archive/` (`STATE.md` keeps the current picture plus one prior sprint; `QUESTIONS.md` keeps open rows; `DECISIONS.md` keeps recent entries plus a one-line index of everything archived). Copy first, verify the copy, then trim. Never summarize; never trim without a verified copy; if the copy cannot be verified, leave the file unbounded and say so.

Read `templates/method/120x-agent-identity.md` first to assume a role. The Claude Code commands, Codex skills, and paste fallback all enter the same folder-owned method.

---

## First Files to Read

Read these in order at the start of every session, in either role:

1. `AGENTS.md`
2. `README.md`
3. `project-start.md`
4. `planning/STATE.md`
5. `planning/DECISIONS.md`
6. `planning/DOMAIN.md`
7. `planning/RISKS.md`
8. `planning/QUESTIONS.md`
9. Active sprint files under `planning/sprints/`
10. Relevant docs under `docs/`

`planning/archive/` is finished history. Do not read it at session start; read it only when the current work touches something it records.

---

## Project Structure

```text
.
├── docs/                  # Durable technical documentation
├── planning/              # Project planning, Architect Packs, domain context, decisions, risks, sprints
│   ├── architect-packs/   # Architect Pack files before importer dry-run/apply
│   └── sprints/           # Builder execution files after packs are applied
├── references/            # Raw reference material and source examples
├── samples/               # Sample project metadata or generated examples
├── scripts/               # Utility scripts, including Architect Pack importer
├── src/                   # Source code when implementation begins
├── templates/             # Reusable templates used by the project
└── tests/                 # Tests and validation fixtures
```

---

## Current Boundary

This folder was generated from:

`Hosted virtual scaffold`

The current phase is Discovery / Architecture.

Until an active sprint explicitly authorizes implementation, do not write production application code.

---

## Builder Rules

- Do not write production application code unless the active sprint explicitly authorizes it.
- Do not redefine scope or invent product behavior.
- Do not expand scope into a dashboard or project management system unless the Architect documents that scope.
- Do not add auth, database, cloud sync, CRM, invoicing, or GitHub API automation unless explicitly authorized by an active sprint.
- Do not overwrite existing user project folders without an explicit confirmation strategy.
- Do not delete user files.
- Do not store secrets, API keys, passwords, tokens, or private credentials.
- Prefer boring, local, file-based automation.
- Keep generated files plain Markdown where practical.
- Update `planning/STATE.md` at the end of each meaningful session.
- Record durable decisions in `planning/DECISIONS.md`.
- Update `docs/ARCHITECTURE.md` when architecture changes.
- Update `docs/VALIDATION.md` when validation behavior changes.

---

## Sprint Workflow

Each sprint lives in:

```text
planning/sprints/###-{sprint-name}/
```

Each sprint should include:

- `requirements.md` — what and why
- `blueprint.md` — how to build it
- `acceptance.md` — what done means
- `handoff-prompt.md` — exact Builder prompt

The Builder should read all four before implementation.

Architect Packs live in `planning/architect-packs/`. Builder execution lives in `planning/sprints/`.

After an Architect Pack is applied, do not implement directly from the pack file. Implement from the generated sprint files under `planning/sprints/`.

---

## Completion Standard

A sprint is complete only when:

- The requested behavior is implemented or documented as intentionally deferred.
- Acceptance criteria are satisfied.
- Validation has been run or a clear reason is documented.
- State and documentation are updated.
- New decisions are recorded in `planning/DECISIONS.md`.
- New risks or open questions are recorded.
