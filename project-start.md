# Project Start

## Project Metadata

| Field | Value |
|---|---|
| Project name | QualityEdge |
| Client name | Independent commercial venture under the project owner's ownership. |
| Project slug | quality-excellence-simulator |
| One-sentence description | QualityEdge is an interactive, team-based business simulation that enables participants to experience how ISO 9001 principles, service quality management and strategic decision-making influence operational performance, customer satisfaction and business profitability. |
| Project type | SaaS product |
| Planning folder | quality-excellence-simulator/ |
| Implementation repo path | Downloaded project folder |
| Canonical GitHub repo | https://github.com/JosePetrone/quality-excellence-simulator |
| Tech stack | Preferred stack, subject to Architect evaluation:- React and TypeScript frontend.- Node.js and TypeScript backend and deterministic simulation engine.- PostgreSQL database.- Supabase for authentication and real-time synchronization.- Vercel for hosting.- GitHub and GitHub Codespaces for version control and development.- Codex and the 120x Architect–Builder methodology. |
| Scaffold source | Hosted virtual scaffold |

## Created Structure

- `planning/architect-packs/`
- `references/client-docs/`
- `references/source-app/`
- `references/platform/`
- `samples/`

## Personalized Files

- `README.md`
- `AGENTS.md`
- `planning/STATE.md`
- `planning/DOMAIN.md`
- `planning/FILE_INVENTORY.md`

## Generated Files

- `planning/INTAKE.md`
- `project-start.md`
- `architect-chat-starter-prompt.md`

## Architect Intake

`planning/INTAKE.md` captures the guided intake context collected before project creation. Use it as primary discovery context when creating Architect Pack 001.


## Next Steps

1. Open the new project folder.
2. Review `project-start.md`.
3. Review `planning/INTAKE.md`.
4. Start the Architect in your coding tool: Claude Code `/architect`, Codex `$120x-architect`, or paste `architect-chat-starter-prompt.md` as the fallback in another tool.
5. Start Architect Pack 001 discovery.
6. Generate Architect Pack 001 only after explicit approval.
7. Save the Architect Pack in `planning/architect-packs/`.
8. Dry-run the importer.
9. Apply the Architect Pack after review.

## Architect Pack Commands

Save Architect Packs in `planning/architect-packs/`.

Dry-run from the project root:

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-###-{sprint-name}.md --dry-run`

Apply from the project root after reviewing the dry-run:

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-###-{sprint-name}.md`

After a pack is applied, Builders implement from the generated sprint files under `planning/sprints/`, not directly from the Architect Pack.
