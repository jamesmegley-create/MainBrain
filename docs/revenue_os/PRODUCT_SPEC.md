# PRODUCT_SPEC.md — Revenue OS

**Working names:** Revenue OS, Opportunity OS, Legion, Internet Revenue Machine
**Shorthand:** "Palantir for making money on the internet"
**Primary user:** James — strategist, capital allocator, mission approver, evidence reviewer.
**Source:** Restructured from the full discovery-conversation handoff. See
`/root/.claude/uploads/.../claude_handoff_internet_revenue_os.md` for the original if deeper
context is ever needed; this file plus the rest of `docs/revenue_os/` is the maintained
source of truth going forward.

## 1. Vision

> Build an AI-native revenue operating system that continuously maps internet markets, discovers
> evidence-backed revenue opportunities, ranks them by expected financial and learning value,
> verifies where the output can be sold, lets James allocate cohorts and capital, executes approved
> experiments, and compounds winners into durable revenue engines and proprietary economic data.

Shorter: **a command center that turns internet change into ranked, executable revenue missions.**

The "Palantir" analogy is about the ontology and decision graph — connecting signals, markets,
buyers, opportunities, missions, assets, costs, outcomes, and lessons so James can query the causal
history of his internet economy. See `ONTOLOGY.md`.

## 2. North Star

At all times, measure the build against this experience:

> James opens the dashboard. He sees what changed in internet markets, what the system completed,
> and a small set of evidence-backed missions across different revenue engines. Each mission names
> the buyer or marketplace, the cash requested, maximum loss, expected return, time to feedback,
> required capabilities, automation gaps, and why it may fail. James allocates a cohort and budget.
> The system executes only within the approved envelope, reports progress, pauses or scales
> according to rules, reconciles cash, and records what it learned. The next briefing is better
> because the system now owns more economic data than it did yesterday.

## 3. User context

James is a business-development professional in the Azure ecosystem, a day trader, a systems
thinker, and a broad generalist, drawn to marketplaces, deltas/divergences, attention/demand/price
change, capital allocation, fast feedback loops, and the trading pattern of thesis → entry →
position sizing → invalidation → scale → exit → review. He does not want to be locked into one
narrow internet business, and does not expect to invent the first experiments himself — the
system's job is to discover and explain the possibilities, then bring a decision-ready slate.

**James's role:** strategist, capital allocator, investment committee, mission approver, reviewer.
**The machine's role:** scout, market cartographer, analyst, experiment designer, builder,
operator, media buyer, distributor, auditor, chronicler, continuous learner.

UI implications: visible North Star / current phase / active missions / decisions needed / parking
lot; concise summaries with expandable evidence; scorecards and trading analogies; no black-box
scores; report partial findings early; treat failed experiments as data only when measurement was
valid and loss was bounded.

## 4. Resolved product decisions (do not re-litigate without new evidence)

1. Primary optimization profile: speed to first validated dollar.
2. Longer-term objective: repeatable, automated, defensible revenue with compounding data/assets.
3. James's role: strategist, capital allocator, approval authority.
4. Machine's role: discovery, analysis, proposal, execution, measurement, learning.
5. Primary unit of user work: a **Mission**.
6. A mission may contain one or more bounded experiments.
7. Realistic volume: one to three approved missions at a time, not hundreds of uncontrolled
   ventures.
8. Morning experience: a decision-ready briefing, not a news feed.
9. Opportunity diversity: show candidates across several revenue engines.
10. Five core engines for the first broad program: content/audience, paid acquisition/affiliate,
    software, lead generation, data/information.
11. Durable assets, in priority: proprietary data first, then reusable software, playbooks,
    marketplace relationships, distribution, audiences.
12. Any properly measured non-trading internet revenue loop counts as an early win (a small
    affiliate commission, a profitable ad test, a micro-tool sale, an accepted paid lead).
13. System success, not individual-agent success — most experiments may fail; the system must
    learn and improve.
14. Proposals must be transparent — evidence and economics, not an unexplained recommendation.
15. Model-agnostic architecture — no core business logic trapped inside one model or vendor.
16. Knowledge architecture uses structured storage + retrieval, never a giant document dumped into
    every prompt.
17. The marketplace/liquidity layer is first-class — every opportunity maps to a verified or
    clearly labeled demand-side monetization endpoint.
18. Human approval first, bounded autonomy later (proposals/drafts → approved execution → narrowly
    scoped auto-execution after calibration).
19. T-shirt/print-on-demand is an example vertical, not the chosen first mission.
20. The first executable mission is selected only after comparing several low-cost, fast-feedback
    candidates with clear routes to cash.

## 5. The five core engines (v1 scope)

See `docs/revenue_os/` engine notes folded into `SCORING.md` and the handoff original for full
mechanism/economics/failure-mode detail per engine:

- **A — Paid Acquisition & Affiliate/CPA**
- **B — Lead Generation** (buyer-first workflow is mandatory; see Constitution Article IV)
- **C — Micro-Software & Tools**
- **D — Data & Information Products**
- **E — Content, Audience & Organic Distribution**

Adjacent/optional engines: **F — Commerce/POD**, **G — Productized Services**, **H — Marketplace &
Price Arbitrage**. These are valid experiment families, not required in v1.

## 6. Mission lifecycle (state machine)

`SIGNAL_DETECTED → SIGNAL_ENRICHING → OPPORTUNITY_DRAFTED → EXIT_PATH_RESEARCH →
EXIT_PATH_VERIFIED → ECONOMICS_MODELED → CAPABILITY_CHECK → RISK_REVIEW → MISSION_PROPOSED →
MISSION_APPROVED → MISSION_QUEUED → MISSION_RUNNING → MISSION_MONITORING → (MISSION_PAUSED |
MISSION_SCALING) → MISSION_COMPLETED | MISSION_KILLED → POSTMORTEM_PENDING →
POSTMORTEM_COMPLETE → ARCHIVED`

Rules: no spend before `MISSION_APPROVED`; a paid mission cannot reach approval before exit-path
status and economics are visible; every external write uses idempotency keys where supported;
every mission is resumable after process failure; every retry avoids duplicate spend, publishing,
contact, or fulfillment; state transitions generate audit events; expiration auto-stops/pauses
work unless renewed; a kill switch exists at mission, connector, platform, and system level.

## 7. Mission Card — mandatory fields

Fits on one screen; details open in a drawer/full page.

1. **Capital requested and maximum loss** — cash, model/tool cost, human-review requirement.
2. **Quantified objective and grade thresholds** — what outcome is an A, B, C, or kill.
3. **Timeline** — setup time, time to first feedback, planned duration, expiration.
4. **Resource and feasibility plan** — cohorts, legionary capacity, tools/connectors, artifacts to
   create, what cannot currently be automated.
5. **Economic thesis, evidence, and recommendation** — why now, exit path, conservative/base/upside
   economics, confidence, recommendation (approve / research more / reject / watch).

Expanded sections: signal summary; target buyer/audience; output/offer; exact exit path and
verification status; evidence table; assumptions; economics model; execution steps; required
credentials; automation coverage; human approval points; policy/compliance risks; why this could
fail; what happens if no action is taken; scale/pause/kill conditions; knowledge yield; reusable
assets; attribution plan; reporting cadence; decision log.

See `schemas/mission.schema.json` for the machine-readable shape and the handoff (Section 11.3) for
a fully worked example object.

## 8. Build strategy — gestalt architecture, thin execution slice

Design the complete ontology, permission model, data model, and connector interfaces up front so
the first implementation doesn't hit obvious architectural limits. Do **not** implement every
revenue engine simultaneously.

- **Phase 0 — Existing-system & capability audit.** Done in this pass: `CURRENT_STATE.md`,
  `REUSE_MAP.md`, `CAPABILITY_MATRIX.md`, `RISKS_AND_GAPS.md`.
- **Phase 1 — Constitution, ontology, schemas, ledger.** Done in this pass: `CONSTITUTION.md`,
  `GLOSSARY.md`, this file, `ARCHITECTURE.md`, `ONTOLOGY.md`, `SECURITY_AND_APPROVALS.md`,
  `AGENT_CATALOG.md`, `SCORING.md`, `MARKETPLACE_ATLAS.md` (template), `schemas/*.json`.
- **Phase 2 — Read-only intelligence and briefing.** Not started. Ingest a small set of approved
  sources, generate normalized signals, produce five diversified champion cards with evidence, no
  live spend.
- **Phase 3 — Marketplace and Liquidity Atlas v1.** Not started — requires real, sourced,
  timestamped research per Section 25 of the handoff; the current `MARKETPLACE_ATLAS.md` is a
  structure only.
- **Phase 4 — Mission approval and orchestration.** Not started — requires real infrastructure
  (see `RISKS_AND_GAPS.md`).
- **Phase 5 — First end-to-end mission.** Not started. Present ten researched candidates (one per
  core engine minimum), score with the First-Dollar profile (`SCORING.md`), James selects.
- **Phase 6 — Feedback and calibration.** Not started.
- **Phase 7 — Bounded autonomy.** Not started; gated on successful dry runs and Article VI
  calibration.

## 9. Open questions

See `OPEN_QUESTIONS.md`. Do not block architecture on these; resolve when operationally necessary.
