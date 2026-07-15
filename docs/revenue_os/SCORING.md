# SCORING.md — Opportunity Scoring and Capital Allocation

Source: handoff Section 10, plus per-engine economics from Section 8.

## Principles

- Separate forecast from rank: expose raw assumptions and scenario ranges. The rank is a decision
  aid, not an oracle.
- Use conservative / base / upside scenarios. Do not display false precision when inputs are weak.

## Base financial model

```
Expected Net Contribution = Σ(probability_of_outcome × net_contribution_of_outcome) − fixed_setup_cost
```

Per engine:

- **Lead gen:** `Expected revenue per click = landing_page_conversion × buyer_acceptance_rate × payout_per_accepted_lead`
  `Expected net contribution per click = expected revenue per click − CPC − variable_tool_cost_per_click`
- **Affiliate:** `Expected earnings per click = click_to_action_conversion × acceptance_rate × payout`
- **Commerce:** `Contribution before acquisition = price − product_cost − fulfillment − payment/platform_fees − shipping_subsidy − return/support_reserve`
  `Break-even CPC = contribution_before_acquisition × purchase_conversion_rate`

## First-Dollar scoring profile (default)

| Factor | Weight |
|---|---|
| Expected net contribution | 20 |
| Exit-path liquidity | 15 |
| Time to first dollar | 15 |
| Capital efficiency | 10 |
| Evidence confidence | 10 |
| Automation coverage | 10 |
| Time to feedback | 5 |
| Repeatability | 5 |
| Reusable asset value | 5 |
| Knowledge yield | 5 |

Explicit penalties for: maximum downside, compliance/account risk, human attention burden,
platform fragility, buyer concentration, measurement weakness, payout delay, unverified
dependencies.

Weights are configurable. Later profiles may include "Learning," "Compounding," or
"Defensibility," but First-Dollar is the v1 default per the resolved product decisions
(`PRODUCT_SPEC.md` §4.1).

## Minimum gating conditions (must all hold before execution is recommended)

- The hypothesis is falsifiable.
- The output and target buyer are defined.
- The exit path has a labeled verification status (see `MARKETPLACE_ATLAS.md` §Buyer verification
  gates).
- The economics include all material direct costs.
- The time to first useful feedback is known.
- The maximum loss is known.
- Measurement is available.
- Required permissions and credentials are known.
- The system can explain why it may fail.
- The mission has stop, scale, and expiration rules.

## Pre-launch quality grades

- **A** — Verified exit path; strong evidence; conservative positive expected contribution; fast
  feedback; low friction; high automation.
- **B** — Plausible positive economics with one or two important uncertainties; bounded validation
  justified.
- **C** — Primarily a learning mission; financial edge not yet established; very small budget only.
- **D** — Weak evidence, unclear buyer, poor measurement, excessive friction, or unfavorable
  economics.
- **F** — Illegal, deceptive, policy-prohibited, unmeasurable, or unauthorized.

## Post-mission outcome grades

- **A** — Positive net contribution, reliable measurement, repeatable playbook, clear scale path.
- **B** — Break-even or modest loss with strong validated leading indicators and a specific next
  iteration.
- **C** — Bounded loss with decision-useful learning and reusable assets.
- **D** — Failure dominated by avoidable execution or measurement flaws.
- **F** — Unauthorized spend/action, policy breach, corrupted data, or account/reputation damage.

Financial outcome and learning outcome must be shown separately so a learning-rich loss is never
disguised as profit.

## Portfolio construction for the morning slate

- Up to five candidates inside each of the five core engines.
- One champion card per engine.
- A global top three recommended missions.
- A diversification warning when all top candidates depend on one platform, traffic source, buyer,
  or assumption.
- One "wild card" opportunity when a new market or capability appears.
- One "capability frontier" card when a new tool materially changes economics.

James will usually approve one to three missions, not the entire slate (resolved decision #7).
