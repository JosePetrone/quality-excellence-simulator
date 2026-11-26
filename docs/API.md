# Pilot API and operation

## Local operation

Use Node 26.13.1. Provision one database in a private directory outside the repository. Use an absolute path whose parent already exists. The init command creates a new file and prints the instructor credential and one credential for each team. Share each through a private channel.

```text
node scripts/serve-pilot.mjs init <absolute-db> Cedar Maple
node scripts/serve-pilot.mjs serve <absolute-db>
node scripts/serve-pilot.mjs rotate-instructor <absolute-db>
```

Open the printed loopback URL. The default port is 4175 and `PORT` can override it. Use three independent browser contexts and enter the corresponding credential in each. The browser keeps the credential in session storage for refresh. The instructor can rotate either team credential in the instructor view. Credential rotation invalidates the previous credential and preserves session state. Credentials expire 24 hours after issuance.

For access from separate computers, provide private HTTPS forwarding to the loopback service. Preserve the external Host header for the same-origin check. Keep the database and backups in an operator-controlled directory, set retention before invitations and keep request credentials and decisions out of forwarding logs. Separate-computer access remains a rehearsal gate.

## Routes

Send `Authorization: Bearer <credential>`. POST routes accept same-origin JSON with a 4096-byte request limit. Poll `GET /api/session` for the current role-scoped snapshot. Responses use `Cache-Control: no-store`.

| Method and path | Role | Body |
| --- | --- | --- |
| GET /api/session | Either | — |
| POST /api/submit | Team | `quarter` and `decision` with the five named investment categories |
| POST /api/resolve | Instructor | `quarter` |
| POST /api/publish | Instructor | `quarter` |
| POST /api/rotate-team | Instructor | `teamId` of `a` or `b` |

Absent, invalid or expired access returns 401. A valid credential with the wrong role returns 403. Invalid command data returns 400. A stale quarter, invalid phase or conflicting duplicate returns 409. Resolved details are visible to the instructor until publication. The shared published projection contains the quarter and two alias/QES pairs.
