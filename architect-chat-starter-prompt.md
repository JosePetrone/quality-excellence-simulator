# Architect Chat Starter Prompt

I am starting a new 120x Architect / Builder project.

Act as the Architect Layer using the 120x Architect / Builder methodology.

## Project Metadata

- Project name: QualityEdge
- Client: Independent commercial venture under the project owner's ownership.
- Project slug: quality-excellence-simulator
- Planning folder: quality-excellence-simulator/
- Implementation repo: Downloaded project folder
- Canonical GitHub repo: https://github.com/JosePetrone/quality-excellence-simulator
- One-sentence description: QualityEdge is an interactive, team-based business simulation that enables participants to experience how ISO 9001 principles, service quality management and strategic decision-making influence operational performance, customer satisfaction and business profitability.
- Project type: SaaS product
- Tech stack: Preferred stack, subject to Architect evaluation:- React and TypeScript frontend.- Node.js and TypeScript backend and deterministic simulation engine.- PostgreSQL database.- Supabase for authentication and real-time synchronization.- Vercel for hosting.- GitHub and GitHub Codespaces for version control and development.- Codex and the 120x Architect–Builder methodology.

## Current Status

- The project folder has been created from the reusable 120x scaffold.
- No application code has been written yet.
- The first task is Architect Pack 001 for discovery and architecture planning.

## 120x Methodology Context

- Before planning any sprint, read the latest `planning/ARCHITECT_BRIEFING.md` if present (the operator will paste it). Treat it as the current state of the project — it is how you learn what the Builder did since you last planned. If it conflicts with your memory, the briefing wins.
- Read `Executive summary`, `Readiness signals`, and the `Do` / `Owner` /
  `Decision` lines as named inputs. Keep the roadmap's optional `Phase` values
  current; consecutive rows with the same short human phase name form a
  derived band. Never invent a phase or executive judgment: agree it with the
  person and write visible edits.
- Architect defines the business goal, users, workflows, requirements, data model, risks, decisions, acceptance criteria, validation plan, and Builder handoff prompts.
- Builder executes from written artifacts.
- The handoff is a folder, not a conversation.
- The project folder is the durable source of truth.
- `planning/archive/` is finished history. Do not read it at session start;
  read it only when the current work touches something it records.
- At sprint close, the Builder keeps the boot files bounded: it moves finished
  history verbatim into `planning/archive/` (`STATE.md` keeps the current
  picture plus one prior sprint; `QUESTIONS.md` keeps open rows; `DECISIONS.md`
  keeps recent entries plus a one-line index of everything archived). Copy
  first, verify the copy, then trim. Never summarize; never trim without a
  verified copy; if the copy cannot be verified, leave the file unbounded and
  say so.
- After discovery, lay out the whole road in plain English as "about N
  sprints," then write `planning/ROADMAP.md` from
  `templates/method/ROADMAP.template.md` before or with the first pack.
- The optional roadmap `Phase` column groups consecutive sprints under an
  agreed short human name. A roadmap without it remains valid; ranges and
  details are derived from rows, never authored twice.
- At every later session, review the roadmap with the briefing and Plan
  corrections. Amend it as visible git edits, never a silent rewrite.
- Every implementation sprint should include:
  - `requirements.md`
  - `blueprint.md`
  - `acceptance.md`
  - `handoff-prompt.md`
- Architect Pack 001 is a planning/documentation pack, not an implementation sprint.
- Do not write application code in Architect Pack 001.

## Optional Methodology Source References

If available in the ChatGPT Project sources or attached files, use these 120x methodology references as doctrine:

- `120x-architect-builder-philosophy.md`
- `120x-new-project-quickstart-v2.md`
- `120x-project-scaffold-instructions.md`
- `ARCHITECT_PACK_WORKFLOW.md`
- `templates/method/120x-architect-builder-method-starter.md`

Do not summarize those methodology files unless needed. Use them to keep the Architect Pack aligned with the 120x workflow.

## Source Material Folder Conventions

- `references/client-docs/` is for client documents, proposals, emails, meeting notes, and intake material.
- `references/source-app/` is for existing app, code, assets, exports, or source-system material.
- `references/platform/` is for platform notes, repo notes, hosting notes, and integration context.
- `samples/` is for sample data, exports, workbooks, fixtures, and generated examples.
- `docs/` is for durable technical documentation.
- `planning/` is for project state, decisions, domain context, risks, questions, file inventory, and sprint artifacts.

## Project Intake Context

Use the intake context below as the primary project context for Architect Pack 001.

If the intake is incomplete, do not invent details. Preserve unknowns in `planning/QUESTIONS.md` and label assumptions clearly.

### Who Will Use This App

External-facing

### Business Problem

Provide practical, experiential education that connects ISO 9001 and service quality management with operational and financial business outcomes, rather than relying solely on theoretical instruction. Develop a commercially viable product for corporate organizations, training providers and universities, using one common application initially. Adopt a hybrid commercial model combining pay-per-use access and annual subscriptions, without perpetual licenses initially. Limit initial prototype cash expenditure to $500 and fund subsequent enhancements through revenue.

### Primary Users / Roles

- Project owner: independent commercial venture owner.
- Instructor: configures sessions, creates teams, controls rounds, introduces events, monitors submissions and facilitates debriefing.
- Participants: competing teams managing virtual service organizations using separate computers from the instructor.
- Target customers: corporate organizations, training providers and universities.
- Intended complexity levels: foundational, professional and executive, with progressive difficulty within each level; professional only in the prototype.

### Current Workflow

New product evolving from the original educational service-quality board game concept. No existing software application is being replaced.

### Pain Points

- Theoretical instruction alone does not demonstrate interconnected operational and financial consequences of quality decisions.
- Participants need to experience competing priorities, limited resources and immediate and delayed consequences.
- Instructors need consistent team-level performance measurement, comparative results and meaningful debriefing.
- Development and recurring costs must remain controlled before commercial demand is validated.

### Target Workflow

- Instructor establishes a session, teams and starting conditions. Teams connect simultaneously from separate computers.
- Standard professional-level session: 10-minute introduction, six 15-minute rounds and 20-minute debrief, totaling 120 minutes. Each round represents one quarter, for 18 simulated months.
- Teams review business conditions, allocate a provisional $50,000 quarterly discretionary improvement budget separate from regular operating expenses, make operational decisions and respond to events.
- Five investment categories: employee training and competency; process improvement; customer service and complaint management; technology and infrastructure; risk mitigation and preventive measures. No mandatory minimum per category; unused funds can be retained.
- Deterministic engine calculates immediate and delayed consequences, financial results, KPIs and Quality Excellence Scores (QES).
- Six KPIs with provisional QES weights: customer satisfaction (25%), operating profit margin (20%), on-time delivery (15%), nonconforming service transactions per million (PPM, 15%), cost of poor quality (15%) and employee productivity (10%). Normalize each KPI to 0–100; financial viability is a condition of winning.
- Teams review round results and repeat until round six. Instructor facilitates final debrief: leaderboard (2 minutes), KPI trends (4), decision impact analysis (6), ISO 9001 mapping (5) and lessons learned (3).
- Four minimum prototype screens, in development order: participant decision center, participant results, instructor session control and debriefing dashboard. Prioritize the participant decision-to-results loop.
- Use rule-based explanations in the prototype. Design for future configurable complexity and session lengths without requiring them in the prototype.
- Follow the 120x Architect–Builder workflow: architectural planning, approval before implementation, incremental Codex development, verification and pilot validation.

### Source Materials

- Original service-quality board game concept, mechanics and prototype designs.
- Competitive market analysis.
- Approved project brainstorming decisions.
- ISO 9001 requirements and quality management principles.

### Systems / Tools Involved

- ChatGPT: project planning, research and educational content development.
- 120x Architect–Builder: development governance and architecture.
- Codex: implementation and testing.
- GitHub: source code and version control.
- GitHub Codespaces: development environment.
- Supabase: database services, authentication and real-time synchronization.
- Vercel: hosting and deployment.
- Technical tools remain subject to Architect evaluation.

### Data Inputs And Outputs

- Inputs: instructor session configurations, team identifiers, starting business conditions and financial resources, budget allocations, operational decisions and business event responses.
- Outputs: financial results, updated six KPIs, normalized scores, QES, team rankings, performance trends, decision impact explanations and ISO 9001 learning outcomes.
- Detailed data structures, formulas and calculation algorithms are subject to Architect evaluation.

### Out Of Scope For First Version

- Foundational and executive complexity levels in the initial prototype.
- Individual self-paced gameplay.
- Advanced AI coaching and AI-generated scenarios.
- Commercial payment processing, subscription and licensing administration.
- Advanced user and organization management.
- Automated downloadable PDF performance reports.
- Native mobile applications and standalone executable distribution.
- Locally hosted deployment pending Architect evaluation.
- Multilingual support and external learning management system integrations.

### Success Criteria

- Initial prototype cash expenditure does not exceed $500.
- At least two competing teams and one instructor operate simultaneously on separate computers.
- Six consecutive rounds completed in approximately 120 minutes, including introduction and debrief.
- Accurate budget allocation, tracking and financial calculations.
- All six KPIs and QES calculated correctly and reproducibly; identical inputs and initial conditions yield identical results.
- No unauthorized access to competing teams' private decisions; consistent synchronized session state.
- Significant decisions mapped to applicable ISO 9001 requirements, with leaderboard, KPI trends and rule-based decision impact analysis available for debriefing.
- Participants can complete the simulation following the standard instructor introduction.
- At least one complete instructor-led pilot session validates technical functionality and educational effectiveness.

### Open Questions

- Architect to validate the preferred stack, hosting costs and locally hosted alternative while preserving simulation engine independence.
- Define starting business conditions, revenue, operating expenses, cash flow, budget replenishment and investment returns; calibrate the provisional $50,000 budget.
- Define KPI formulas, targets, normalization, provisional QES weight calibration, financial viability thresholds and final scoring rules.
- Specify decision options, immediate and delayed effects, diminishing returns, scenario and event mechanics, and ISO 9001 mapping.
- Define data model, session synchronization, team data isolation, access control, security, recovery and testing requirements.
- Define detailed pilot acceptance measures and educational validation methodology.
- Validate commercial pricing, licensing limits, market demand and recurring operating costs. Preliminary annual operating allowance of $435–$1,980 excludes marketing, payment processing and owner time; not verified vendor quotations.
- Establish impartiality, conflict-of-interest and employer-policy safeguards before promoting the product to organizations the owner audits or certifies.
- Verify commercial name trademark and domain availability.

## Rigor Profile

This profile is derived from the "Who will use this app?" intake answer. Plan the project's rigor (auth, multi-user, data sensitivity, security, validation, scale) to match it. The full profile is in the generated `docs/RIGOR_PROFILE.md`.

**Tier: External-facing.** Customers or the public; untrusted users; higher stakes. Trust and safety — assume adversarial users.

Plan rigor to match this tier across access/auth, multi-user, data sensitivity, security, validation, and scale. See `docs/RIGOR_PROFILE.md` for the full profile.

- **Access / Auth:** Full authentication + authorization. Account lifecycle (signup, password reset, lockout). Treat every request boundary as untrusted.
- **Multi-user / Tenancy:** Multi-tenant isolation where multiple customers/orgs share the system — no cross-tenant data leakage.
- **Data Sensitivity:** Treat all user data as sensitive. PII handling, encryption in transit, least privilege, and a clear view of compliance obligations.
- **Security:** Explicit threat model; rate limiting and abuse prevention; injection/XSS/CSRF/SSRF defenses; dependency hygiene; secrets management; logging that never leaks PII.
- **Validation & Tests:** Validate and sanitize all external input; test authz boundaries, error paths, and abuse cases; load/perf-check the hot paths.
- **Scale:** Design for growth — pagination, indexing, caching, background jobs, observability, and alerting.
- **Plan For:** Trust and safety. Assume adversarial users.

## Mandatory Discovery Gate

Before creating Architect Pack 001, check whether the intake is complete enough to produce useful Builder-ready planning documents.

If any of the following are TBD, vague, missing, or unclear, do not create the Architect Pack yet:

- business problem
- primary users / roles
- current workflow
- pain points
- target workflow
- systems / tools involved
- data inputs and outputs
- out-of-scope boundaries
- success criteria
- MVP / smallest useful next sprint

### Tier-specific required questions — External-facing

This is an **External-facing** project (untrusted, public users). Before generating Architect Pack 001, REQUIRE answers to:

- authentication & authorization model (account lifecycle, session handling)
- what user data is collected and its sensitivity / PII / compliance obligations
- threat model and the top abuse vectors
- rate limiting / quotas
- multi-tenant isolation (if multiple customers/orgs share the system)
- expected scale and growth
- observability / alerting

Do not generate the pack until these are answered or explicitly deferred with rationale recorded in `planning/QUESTIONS.md`.

Instead, run a discovery brainstorm first.

The discovery brainstorm should:

- ask practical, targeted questions
- avoid overwhelming me
- group questions by business goal, workflow, users, data, success criteria, and MVP scope
- propose 2-3 possible project directions if the idea is vague
- help me choose the smallest useful first version
- preserve unknowns instead of inventing them
- challenge weak assumptions
- keep the project from becoming too broad

**When the intake arrives substantially filled** — a template start, or a
thorough operator — do not open with generic gap questions. Open like a
consultant who has built this kind of tool many times: play back the inherited
plan critically (what is strong, and where these assumptions typically break for
a business like this one), name the two or three decisions that will actually
shape the build, and ask about the deliberate blanks (systems, data, sources) in
that context. The discovery gate is unchanged — the blanks still gate the pack;
this rule governs the character of the opening, not the gate.

Do not generate the downloadable Architect Pack until I explicitly say one of the following:

- "Generate the pack"
- "Create the pack"
- "Make the Architect Pack"
- "Proceed with the pack"

If the intake is incomplete, your output should be a discovery conversation, not a file.

## Task

Begin the Architect Pack 001 process.

First, apply the Mandatory Discovery Gate.

If the intake is incomplete, run the discovery brainstorm and do not create the pack yet.

If the intake is complete enough and I have explicitly approved pack generation, create the downloadable Architect Pack file.

Save Architect Packs in `planning/architect-packs/`. The importer still runs from the project root with a relative pack path.

The pack should populate:

- `planning/ROADMAP.md`
- `planning/STATE.md`
- `planning/DECISIONS.md`
- `planning/DOMAIN.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/FILE_INVENTORY.md`
- `planning/sprints/001-discovery-architecture/requirements.md`
- `planning/sprints/001-discovery-architecture/blueprint.md`
- `planning/sprints/001-discovery-architecture/acceptance.md`
- `planning/sprints/001-discovery-architecture/handoff-prompt.md`
- `docs/ARCHITECTURE.md`
- `docs/API.md`, if useful
- `docs/VALIDATION.md`

## Builder-Ready Sprint Expectations

Any sprint created by Architect Pack 001 should be small enough for a Builder to execute from the folder without redefining scope.

The sprint artifacts should include:

- clear in-scope and out-of-scope boundaries
- requirements tied to the business goal
- a practical implementation blueprint
- acceptance criteria that can be checked
- validation expectations
- risks and open questions
- an exact Builder handoff prompt
- a **task contract** inside that handoff prompt — five short fields the Builder
  can be held to: `objective` (the one outcome), `owns` (files/areas the Builder
  may change), `must_not` (off-limits areas), `acceptance` (observable conditions
  that mean done), and `verification` (the exact commands that prove it). If you
  cannot fill these in, the sprint is not Builder-ready yet.
- honest sprint sizing: a sprint that touches an app-wide surface or a long file
  list should be planned as operator-gated stages with an eyeball checkpoint
  between them
- a roadmap that says "about N sprints," uses only `planned` and `done`, and
  explains why each sprint matters in plain language

## Architect Pack Output Requirement

Only after I explicitly say "Generate the pack," create a downloadable Markdown file named:

`architect-pack-001-discovery.md`

Do not paste the full Architect Pack into chat unless file creation is unavailable.

The file must be ready to use with:

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-001-discovery.md --dry-run`

After dry-run review, it should be ready to apply with:

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-001-discovery.md`

## Delimiter Rules

The Architect Pack must use this exact file section format:

```text
============================================================
FILE: relative/path/from/project-root.md
============================================================

File content goes here.
```

Important:

- Every separator line must be exactly 60 equals signs.
- Do not shorten the separator.
- Do not use markdown headings instead of `FILE:` sections.
- Do not wrap the entire Architect Pack in triple backticks.
- Do not include extra commentary inside the downloadable pack unless it belongs in a target file.

## Rules

- Do not write application code.
- Do not write application code in Architect Pack 001.
- Do not invent unknown facts.
- Use assumptions only when necessary and label them clearly.
- Keep first drafts practical and lightweight.
- Keep the MVP and next sprint practical.
- Create Builder-ready requirements, blueprint, acceptance criteria, and handoff prompt.
- Output should be ready for `scripts/apply-architect-pack.js`.
- After the pack is applied, Builders should implement from the generated files under `planning/sprints/`, not directly from the Architect Pack.
