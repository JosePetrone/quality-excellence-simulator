# Decisions

| Date | Decision | Reason | Impact |
| --- | --- | --- | --- |
| 2026-11-25 | Adopt professional-pilot-v1 for the engine slice. | Owner approved the rules and corrected fixture values. | The fixed scenario uses carryover authority, separate cash, one-quarter delayed effects and full-precision weighted scoring. Eligibility, ranking and live access remain open. |
| 2026-11-26 | Run the participant prototype locally with native browser modules and one in-memory team alias. | Exercise the fixed scenario before adding shared sessions. | Refresh starts a new run. The controller carries engine state and the view renders the returned result. |
| 2026-11-26 | Use a separate loopback Node and SQLite service for one recoverable alias-based pilot session. | Verify local access and recovery before a separate-computer rehearsal. | Role credentials expire after 24 hours. The instructor can rotate team access and the operator can renew instructor access. |
| 2026-11-26 | Require both final submissions, resolve atomically and publish separately. | Keep the instructor in charge of release and prevent duplicate quarter progression. | Teams see their own released details and both alias/QES pairs. The next quarter opens on publication. |
| 2026-11-26 | Calculate final standings from six published quarterly QES values. | Recognize sustained quality performance with a financial eligibility gate. | Positive closing cash and nonnegative cumulative operating profit qualify a team. Rank by exact mean then cumulative operating profit. Exact ties share first place. No eligible team means no winner. |
| 2026-11-26 | Use an alias-only private HTTPS rehearsal on three separate computers before pilot invitations. | Validate the full 120-minute workflow and each team's ability to explain a trade-off. | The operator keeps rehearsal databases and backups outside the repository for seven days, and records access, isolation, timing and intervention evidence without credentials or private decisions. |

Archived decisions on the first pilot boundary, local-only Git activity, deterministic engine and illustrative references are in [Sprints 001–002 decisions](archive/sprints-001-002-decisions.md).
