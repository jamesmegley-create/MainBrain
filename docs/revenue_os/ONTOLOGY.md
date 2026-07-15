# ONTOLOGY.md — Data Model and Economic Graph

Source: handoff Section 15. This is the target relational schema (PostgreSQL as system of truth;
vectors supplement, never replace, exact data). See `schemas/*.json` for machine-readable shapes of
the entities marked ⚙️.

## Core entities

- **`sources`** — URL/source id, publisher, retrieval time, source type, trust level,
  license/use notes, content hash.
- **`signals`** ⚙️ — signal type, entity/topic, market, geography, observed value, baseline,
  velocity, novelty, half-life estimate, confidence, source links.
- **`markets`** — category, buyer type, seller type, geography, regulatory/policy notes, typical
  monetization modes.
- **`marketplaces`** ⚙️ — see `MARKETPLACE_ATLAS.md` for the full field list.
- **`buyers`** ⚙️ — identity, segment, criteria, geographies, capacity, commercial terms,
  contact/integration status, consent/legal basis, historical acceptance, historical payout.
- **`offers`** — output, price/payout, conversion event, traffic restrictions, caps, expiration,
  reversal rules, tracking.
- **`opportunities`** ⚙️ — signal links, hypothesis, target, offer/output, exit path, evidence,
  score, status.
- **`missions`** ⚙️ — see `PRODUCT_SPEC.md` Section 7 (Mission Card spec) and
  `schemas/mission.schema.json`.
- **`experiments`** ⚙️ — hypothesis, variable, control, treatment, budget, stopping rules, results,
  attribution quality.
- **`cohorts` / `workers`** — capacity, roles, tools, permissions, current allocation, cost rates.
- **`capabilities`** ⚙️ — abstract action, input/output schema, reliability, cost, risk class,
  required approval.
- **`connectors`** ⚙️ — platform, capability implementation, authentication, sandbox/dry-run
  support, version, health, last verification, rate limits, cost.
- **`assets`** — type, owner, mission origin, version, location, reusability, revenue attribution,
  compliance/license status.
- **`decisions`** ⚙️ — proposal, decision, decision maker, timestamp, rationale, changed
  parameters.
- **`ledger_entries`** ⚙️ — mission, account, debit/credit, currency, amount in minor units, event
  time, settlement status, external reference, reconciliation status.
- **`outcomes`** ⚙️ — revenue, cost, acceptance, conversion, refund/reversal, net contribution,
  time to cash, grade, attribution quality.
- **`playbooks`** — engine, market, preconditions, steps, tools, expected ranges, failure modes,
  evidence count, calibration history.
- **`policies` / `audit_events`** — rule, scope, violation, action, reviewer, resolution.

## Relationship rules

- One signal may create many opportunities.
- One opportunity may have several exit paths.
- One opportunity may generate one or more missions.
- One mission may contain several experiments.
- One mission may create many assets.
- One asset may be reused by many missions.
- One marketplace may support many offers.
- One buyer may accept several lead/product types.
- One outcome updates several playbook priors.
- One decision affects future recommendations.

## Queries the ontology must eventually support

- Show all paid-search missions with positive net contribution and feedback under 72 hours.
- Show every proposed lead mission rejected because the buyer was not verified.
- Compare forecast versus actual CPC by market and source.
- Which marketplaces paid fastest and reversed least?
- Which creative concepts transferred across audiences?
- Which software pain signals repeatedly appeared before a successful product?
- Which mission types generated the most learning per model dollar?
- Which connectors are blocking profitable missions?
- Which approved missions underperformed because of execution rather than thesis?
- What does James consistently approve or reject, and was that judgment calibrated?

## Knowledge and retrieval layer (Section 16)

Do not inject the full constitution/playbooks/history into every prompt. Use four retrieval modes:

1. **SQL/structured queries** for money, status, dates, counts, budgets, relationships.
2. **Full-text search** for exact names, phrases, offers, identifiers.
3. **Vector retrieval** for semantically related prior analyses, notes, and playbooks.
4. **Metadata filters** for engine, market, geography, recency, risk, source type, mission state.

Before invoking a reasoning model, compile a compact **mission packet**: objective, current state,
applicable rules, necessary evidence, relevant prior experiments, marketplace/exit-path record,
economic assumptions, available tools, permission envelope, expected output schema, token/cash
budget. Do not include unrelated history.

Memory hierarchy: constitutional (stable rules) → operational (current mission state) → market
(signals, buyers, prices, terms) → episodic (prior missions/outcomes) → procedural
(playbooks/tools) → user-decision (James's approvals/rejections/rationales).

Retrieval quality controls: citations must survive retrieval; use top-k limits and relevance
thresholds; prefer current structured facts over old semantic notes; detect conflicting records;
show freshness; never treat similarity as factual verification.
