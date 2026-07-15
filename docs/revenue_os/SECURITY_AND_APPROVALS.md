# SECURITY_AND_APPROVALS.md

Source: handoff Sections 6 (Article VI), 20, 22.

## Human approval gates (Constitution, Article VI)

At the outset, James must approve:

- New mission.
- Public publishing.
- Ad spend.
- Outreach to real people.
- Purchase or registration.
- Contractual acceptance.
- New credential scope.
- Material budget increase.
- Use of sensitive or regulated data.
- High-risk claims or categories.

Bounded auto-execution may be added only after a connector and playbook demonstrate reliable
measurement, policy compliance, and loss control (Product Spec Phase 7).

## Prohibited regardless of any stated "zero constraints" instruction

The system must reject or escalate:

- Fraud; deceptive advertising; false claims.
- Fake reviews or fake engagement.
- Spam or unauthorized mass outreach.
- Circumvention of platform enforcement.
- Unauthorized access.
- Privacy violations; sale or routing of personal data without required consent and lawful basis.
- Intellectual-property infringement.
- Counterfeit or prohibited products.
- Crisis or tragedy exploitation.
- Political/social-issue advertising without required process.
- Regulated financial, health, legal, or insurance claims without appropriate controls.
- Misrepresentation of identity or affiliation.
- Dark patterns or undisclosed affiliate relationships.
- Scraping or data use that violates applicable law or enforceable terms.
- Hiding material fees, conditions, or recurring charges.

## Least privilege

Separate permission scopes: read, research, draft, publish, spend, route-personal-data, move-funds,
change-infrastructure, accept-legal-terms. No agent gets all tools or all credentials by default —
each agent/worker spec must declare its exact tool set, permissions, and budget (`AGENT_CATALOG.md`
§ Agent specification template).

## Account-equity register

Track valuable accounts and reputational assets as first-class risk: ad accounts, merchant
accounts, email domains, storefronts, payment processors, affiliate/network accounts, social
accounts, buyer relationships, API access. Every mission must estimate not only cash downside but
potential account-equity downside.

## Data handling

Minimize personal data; encrypt sensitive data; define retention; track consent; restrict model
exposure; avoid placing personal data in vector stores without explicit design and authorization;
audit lead routing and deletion.

## Capital / ledger invariants (Section 20)

Use integer minor units for money — never floating point.

Track separately: cash, pending cash, platform credits, model spend, API/tool spend, human
attention minutes, legionary capacity units, compute/storage, account-equity risk.

Per mission, track: authorized budget, reserved/committed, spent, refunded, pending revenue,
realized revenue, reversed revenue, fulfillment liability, refund reserve, net contribution,
learning-budget portion, unused budget released.

Invariants:

- Spent may not exceed authorized without a new approval event.
- Connector-reported spend must reconcile to platform records.
- Pending payout must not be treated as cash collected.
- Reversible revenue retains a reserve until the reversal window closes.
- Kill or expiration events release unused funds.
- Every external spend event maps to exactly one mission and one authorization.

## Position-sizing analogy

Every mission needs: thesis, entry, position size, invalidation, initial stop, scale-in condition,
time stop, exit, post-trade review.

## Current environment status (as of this pass — see `CAPABILITY_MATRIX.md`)

No secrets vault, no payment connector, no ad/lead/affiliate connector exist in this environment
today. Every gate above is currently moot in the trivial sense that nothing money-adjacent can be
executed yet — but the rules must be encoded into the design **before** any such connector is
added, not retrofitted afterward.
