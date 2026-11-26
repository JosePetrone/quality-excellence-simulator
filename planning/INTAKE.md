# Project Intake

## Project Metadata

| Field | Value |
|---|---|
| Project name | QualityEdge |
| Client | Independent commercial venture under the project owner's ownership. |
| Project slug | quality-excellence-simulator |
| Description | QualityEdge is an interactive, team-based business simulation that enables participants to experience how ISO 9001 principles, service quality management and strategic decision-making influence operational performance, customer satisfaction and business profitability. |
| Project type | SaaS product |
| Tech stack | Preferred stack, subject to Architect evaluation:- React and TypeScript frontend.- Node.js and TypeScript backend and deterministic simulation engine.- PostgreSQL database.- Supabase for authentication and real-time synchronization.- Vercel for hosting.- GitHub and GitHub Codespaces for version control and development.- Codex and the 120x Architect–Builder methodology. |
| Planning folder | quality-excellence-simulator/ |
| Implementation repo | Downloaded project folder |
| Canonical GitHub repo | https://github.com/JosePetrone/quality-excellence-simulator |
| Created | 2026-11-25 |

---

## Who Will Use This App

External-facing

---

## Business Problem

Provide practical, experiential education that connects ISO 9001 and service quality management with operational and financial business outcomes, rather than relying solely on theoretical instruction. Develop a commercially viable product for corporate organizations, training providers and universities, using one common application initially. Adopt a hybrid commercial model combining pay-per-use access and annual subscriptions, without perpetual licenses initially. Limit initial prototype cash expenditure to $500 and fund subsequent enhancements through revenue.

---

## Primary Users / Roles

- Project owner: independent commercial venture owner.
- Instructor: configures sessions, creates teams, controls rounds, introduces events, monitors submissions and facilitates debriefing.
- Participants: competing teams managing virtual service organizations using separate computers from the instructor.
- Target customers: corporate organizations, training providers and universities.
- Intended complexity levels: foundational, professional and executive, with progressive difficulty within each level; professional only in the prototype.

---

## Current Workflow

New product evolving from the original educational service-quality board game concept. No existing software application is being replaced.

---

## Pain Points

- Theoretical instruction alone does not demonstrate interconnected operational and financial consequences of quality decisions.
- Participants need to experience competing priorities, limited resources and immediate and delayed consequences.
- Instructors need consistent team-level performance measurement, comparative results and meaningful debriefing.
- Development and recurring costs must remain controlled before commercial demand is validated.

---

## Target Workflow

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

---

## Source Materials

- Original service-quality board game concept, mechanics and prototype designs.
- Competitive market analysis.
- Approved project brainstorming decisions.
- ISO 9001 requirements and quality management principles.

---

## Systems / Tools Involved

- ChatGPT: project planning, research and educational content development.
- 120x Architect–Builder: development governance and architecture.
- Codex: implementation and testing.
- GitHub: source code and version control.
- GitHub Codespaces: development environment.
- Supabase: database services, authentication and real-time synchronization.
- Vercel: hosting and deployment.
- Technical tools remain subject to Architect evaluation.

---

## Data Inputs And Outputs

- Inputs: instructor session configurations, team identifiers, starting business conditions and financial resources, budget allocations, operational decisions and business event responses.
- Outputs: financial results, updated six KPIs, normalized scores, QES, team rankings, performance trends, decision impact explanations and ISO 9001 learning outcomes.
- Detailed data structures, formulas and calculation algorithms are subject to Architect evaluation.

---

## Out Of Scope For First Version

- Foundational and executive complexity levels in the initial prototype.
- Individual self-paced gameplay.
- Advanced AI coaching and AI-generated scenarios.
- Commercial payment processing, subscription and licensing administration.
- Advanced user and organization management.
- Automated downloadable PDF performance reports.
- Native mobile applications and standalone executable distribution.
- Locally hosted deployment pending Architect evaluation.
- Multilingual support and external learning management system integrations.

---

## Success Criteria

- Initial prototype cash expenditure does not exceed $500.
- At least two competing teams and one instructor operate simultaneously on separate computers.
- Six consecutive rounds completed in approximately 120 minutes, including introduction and debrief.
- Accurate budget allocation, tracking and financial calculations.
- All six KPIs and QES calculated correctly and reproducibly; identical inputs and initial conditions yield identical results.
- No unauthorized access to competing teams' private decisions; consistent synchronized session state.
- Significant decisions mapped to applicable ISO 9001 requirements, with leaderboard, KPI trends and rule-based decision impact analysis available for debriefing.
- Participants can complete the simulation following the standard instructor introduction.
- At least one complete instructor-led pilot session validates technical functionality and educational effectiveness.

---

## Open Questions

- Architect to validate the preferred stack, hosting costs and locally hosted alternative while preserving simulation engine independence.
- Define starting business conditions, revenue, operating expenses, cash flow, budget replenishment and investment returns; calibrate the provisional $50,000 budget.
- Define KPI formulas, targets, normalization, provisional QES weight calibration, financial viability thresholds and final scoring rules.
- Specify decision options, immediate and delayed effects, diminishing returns, scenario and event mechanics, and ISO 9001 mapping.
- Define data model, session synchronization, team data isolation, access control, security, recovery and testing requirements.
- Define detailed pilot acceptance measures and educational validation methodology.
- Validate commercial pricing, licensing limits, market demand and recurring operating costs. Preliminary annual operating allowance of $435–$1,980 excludes marketing, payment processing and owner time; not verified vendor quotations.
- Establish impartiality, conflict-of-interest and employer-policy safeguards before promoting the product to organizations the owner audits or certifies.
- Verify commercial name trademark and domain availability.

---

## Notes For Architect Pack 001

Use this intake as primary discovery context.

If details are incomplete, preserve unknowns in `planning/QUESTIONS.md`.

Do not invent business rules or technical facts.

Architect Pack 001 should remain planning/documentation only unless Ray explicitly says otherwise.
