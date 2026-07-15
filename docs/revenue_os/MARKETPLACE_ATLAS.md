# MARKETPLACE_ATLAS.md — v0 (structure only, no verified entries yet)

**Status:** This document defines the *shape* of the Marketplace Liquidity Atlas required by the
handoff (Sections 9, 25). It contains **zero verified marketplace entries**. Populating it is a
distinct, substantial research task (Product Spec Phase 3) that must follow the research standards
below rigorously — see `RISKS_AND_GAPS.md` item 8. Do not treat anything in this file as evidence
of a real, current buyer or payout.

## Why this layer is mandatory

Per Constitution Article IV and Section 9 of the handoff: the system must answer not only "can we
make it?" but "who buys it, under what conditions, and how automatically?" No paid execution may be
approved when the exit path is only hypothetical, except for a small, explicitly-scoped
demand-validation experiment whose maximum loss reflects that uncertainty.

## Marketplace Atlas record — required fields (→ `schemas/marketplace.schema.json`)

`marketplace_id`, name, category, official/contract source, last-verified date, status
(research-only / application-pending / active / paused / unavailable), output purchased/monetized,
vertical/category, geography, buyer/audience type, pricing model, typical/contractual payout,
payout variability, payout delay, minimum payout, caps, acceptance criteria, required fields,
exclusive/shared rules, duplicate rules, rejection/reversal rules, quality-score requirements,
traffic-source restrictions, consent/disclosure requirements, API availability, webhook
availability, tracking method, authentication requirements, account/business requirements, manual
onboarding burden, public-publishing requirements, refund/chargeback risk, integration status,
connector status, historical actual results from James's system, liquidity score, confidence,
notes/risks.

## Liquidity dimensions (score separately, per marketplace)

- **Buyer certainty** — is a real buyer currently available?
- **Price certainty** — is payout/price known?
- **Acceptance certainty** — can rejection be predicted?
- **Volume capacity** — can the buyer absorb more?
- **Time to cash** — how quickly is the system paid?
- **Integration automation** — can the output be routed automatically?
- **Buyer concentration** — is revenue dependent on one buyer?
- **Policy durability** — could the route disappear suddenly?
- **Reversibility** — can the mission stop without stranded inventory or obligations?

## Output-to-market map (graph, not yet populated)

For each output type: potential marketplaces, buyer segments, required packaging, expected price
range, current access, time to onboarding, automation level, evidence, historical outcomes.
Illustrative examples from the handoff (unverified, for shape only):

- Qualified homeowner lead → network / direct contractor / agency buyer / owned buyer roster.
- Niche calculator → app marketplace / subscription checkout / affiliate-supported landing page /
  embedded lead funnel.
- Pricing dataset → subscription / report / API / consulting lead magnet.
- Original design → storefront / print-on-demand marketplace / direct ad funnel.
- Search traffic → affiliate offer / lead form / ad inventory / software trial.
- Audience → sponsor / affiliate / product / subscription / lead buyer.

## Buyer verification gates (required label on every exit path)

- `VERIFIED_ACTIVE` — James has access and the route is currently active.
- `VERIFIED_PUBLIC` — current official terms are verified but James is not yet approved.
- `PROSPECTIVE_DIRECT` — one or more plausible buyers identified; relationship not established.
- `HYPOTHETICAL` — no buyer verified; research mission only.
- `BLOCKED` — route unavailable or disallowed.

## Lead monetization automation levels (Section 9.5)

- Pre-existing CPA/affiliate or pay-per-call network → tracking/payout close to programmatic after
  onboarding.
- Lead exchange/routing platform → leads may be validated, auctioned, or routed via API after
  integrations/agreements are established.
- Direct local buyer → initial relationship/terms are usually manual; delivery, routing, invoicing,
  and reporting can later be automated.
- Owned buyer network (long-term) → Revenue OS maintains buyer criteria and routes each lead to the
  best eligible endpoint.

Relationship setup and access acquisition are themselves missions — not every lead has instant
universal liquidity.

## First research work order (Product Spec Phase 3 / handoff Section 25 — not yet executed)

For several candidate verticals and geographies, using **official documentation and direct terms
only**, timestamped, with public availability distinguished from James's actual access:

- Which legitimate networks/marketplaces buy leads or calls? Which publish terms? Which require
  application or a direct agreement? Which support affiliates/publishers?
- What constitutes a payable event? What fields/consent are required? What traffic sources are
  permitted? How are duplicates handled? Exclusive or shared? Caps and hours? Returns/rejections?
  Payout delay? API/webhook/tracking integration available? Can James apply now? What data can be
  stored? What's automatable after onboarding vs. remains relational/manual? Buyer concentration
  risk?

Output required: a comparable table plus a narrative recommendation, with at least one
low-friction and one higher-value-but-higher-friction category shown, and every card carrying a
visible **Cash Exit** field: exact buyer/marketplace/conversion mechanism, current access status,
expected time to cash, confidence. Do not initiate outreach or application without approval.

This research has not been run yet. It requires live `WebSearch`/`WebFetch` work against current
official sources and should be scoped as its own follow-up pass rather than folded into this
foundational-documents pass.
