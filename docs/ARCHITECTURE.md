# QualityEdge pilot architecture

## Pilot boundary

One invite-only session serves one instructor and exactly two teams on separate computers. Team-facing identity uses aliases. The session record needs a session ID, two team IDs and their aliases, the instructor role, and round state. Keep participant names and emails out of simulation records. Decide how invitations, instructor credentials and retention work before live access. Public signup, commercial billing, organization management and concurrent sessions are outside this pilot.

## Session workflow

The instructor sets up the session and admits the two teams. After a ten-minute introduction, each team privately reviews its history, allocates funds, makes operational choices and responds to session events. The instructor coordinates submissions, round closure and release of results. Each of six 15-minute rounds represents one quarter. The 20-minute debrief uses published rankings, KPI trends, rule-based decision explanations, ISO 9001 learning links and lessons learned. Verify clause mappings against authorized standard text before use.

The participant decision center and results view form the first usable loop. Instructor session controls and a debrief view follow. A trusted service owns session transitions and validates caller role, session and team before accepting decisions or returning private data. Each team can see its own choices and team results. Competitors see only the instructor-approved published projection keyed by alias. The instructor can inspect both teams within the session. Apply the same authorization to live updates as to reads. Define publishing fields and timing before the shared workflow ships.

## Engine boundary

Use a pure transition from versioned scenario rules, prior team state, round conditions and checked decisions to next state and a result. Keep wall clock, connection state, database operations and implicit randomness outside that transition. Record the effective ruleset version, scenario and round inputs with resolved results so a replay can reproduce them. Both teams receive the same external conditions in the baseline scenario. Resolve duplicate submission and round-close requests at the service boundary so each round advances once. Admission credentials and transport metadata stay outside engine inputs.

Engine state needs the previous financial position, available improvement budget and pending effects. Resolve current and due effects, then produce updated finances, six raw KPIs, normalized scores, QES where defined and traceable explanation rule IDs. Treat budget authorization and cash as distinct quantities. The provisional $50,000 quarterly allowance and carryover are calibration inputs. The six provisional QES weights are CSAT 25%, profit margin 20%, on-time delivery 15%, nonconforming PPM 15%, cost of poor quality 15% and productivity 10%. Financial viability gates winning. Exact cash accounting, thresholds, normalization, bases and rounding, delay durations, aggregation and ties require written rules before implementation of those behaviors.

Sprint 002 implements `professional-pilot-v1` in `src/simulation.ts`. `initialTeamState` provides the starting state and `resolveQuarter` takes that state or a previous next state plus a decision. Success returns finances, operations, raw and normalized KPIs, QES, explanation IDs and next state. Failure returns an error without a state transition. The approved scenario and calibration are in the Sprint 002 blueprint and acceptance fixtures. The caller owns state and records the effective inputs for replay.

The engine uses dependency-free TypeScript. React, Node.js, PostgreSQL, Supabase and hosted deployment are candidates for later application layers. Reassess cost, access controls, recovery and deployment options before selecting live pilot infrastructure. The prototype cash expenditure ceiling in intake is $500.

## Illustrative sources

- `board-game-rules.md` supplied by the owner. Its plan–operate–evaluate–improve loop and delayed-service complaint scenario inform the workflow. The reconstructed physical components, dice, five-round format and historical weighting do not govern the digital prototype.
- `worked-simulation-example.md` supplied by the owner. Its two-quarter example illustrates immediate complaint recovery versus delayed operational improvement. Its coefficients, bounds, accounting simplifications, one-quarter effects and cash-only eligibility are candidate material for review.
