# OPEN_QUESTIONS.md

Per handoff Section 30 (carried over) plus questions surfaced during Phase 0/1 of this pass. **Do
not block the master architecture on these** — resolve when operationally necessary, and when
asking James, present the specific tradeoff plus a recommended default rather than a broad,
abstract question.

## Carried over from the original handoff (still open)

- Existing cloud/deployment environment James wants used (if any, beyond this session).
- Existing database, if any, outside what's been inventoried here.
- Existing business accounts and API credentials James already holds (ad platforms, affiliate
  networks, payment processors) — none are visible in this environment.
- Initial cash budget and daily/weekly maximum loss.
- Initial model/tool budget.
- Geographic focus.
- Categories James prefers to avoid for personal or operational reasons.
- Legal entity, tax, and payment-processing readiness.
- Willingness to perform direct buyer outreach.
- Willingness to handle customer service.
- Existing audience, domains, accounts, or distribution James already has.
- Preferred frequency of morning briefing.
- Exact authorization bands for publish, spend, outreach, and scaling.
- Whether the first mission should optimize purely for cash or balance cash with system coverage.
- Data-source budget.
- Hosting preference.
- How legionary capacity should be quantified in the first UI.
- Which five core engines should remain permanent versus configurable.
- What success threshold permits bounded auto-execution.

## New, surfaced by this repo's actual state (Phase 0 findings)

- **Repo placement.** Does Revenue OS's real code (once Phase 4 starts) live inside `MainBrain`
  alongside the personal dashboard widgets, or in its own repository? See `ARCHITECTURE.md` §
  Suggested repository placement for the two options and their tradeoffs. Recommended default:
  start in this repo (`docs/revenue_os/` already does), and split out once real backend code and a
  deployment target exist — moving docs is cheap, moving a live database is not.
- **Where does the control plane actually run?** This Claude Code Remote container is ephemeral.
  James's only known always-on machine is the Windows box running `brain-server.js` (a static file
  server, not a job runner). Does James want to run the control plane there, on a cloud host, or
  somewhere else? This blocks Phase 4 (mission approval/orchestration) but not Phases 0–3.
- **Are server-side Routines (`create_trigger`) trustworthy as part of the durable workflow
  runtime**, or purely a convenience scheduler on top of a "real" job system built elsewhere? Needs
  verification of retry/failure semantics before being relied on for anything money-adjacent.
- **Which verticals/geographies should the first real Marketplace Atlas research pass (Phase 3)
  target?** The handoff suggests showing at least one low-friction and one higher-value/
  higher-friction lead-gen category as a starting comparison, but doesn't name specific verticals.
