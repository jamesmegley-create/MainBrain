# REUSE_MAP.md — What Revenue OS Can Reuse vs. Must Build New

Per handoff Section 31 Step 1.

## Reusable now (design or infrastructure already exists)

| Item | Where | Reuse in Revenue OS |
|---|---|---|
| Dark-theme design system (navy/blue tokens, Inter + JetBrains Mono, card/grid/stat-block classes) | `_shared/style.css` | Base the Mission Card / dashboard UI on this token set rather than inventing a new visual language. Matches James's existing product taste. |
| `Brain{}` JS utilities (currency/pct/compact formatters, delta coloring, nav bar, command palette) | `_shared/utils.js` | Directly reusable for a read-only prototype dashboard (handoff Phase 2/Step 5) — mission cards need the exact same delta/currency formatting patterns already built for trading and Robinhood widgets. |
| `Charts{}` canvas renderers (line/bar/donut, no external library) | `_shared/components.js` | Reusable for equity-curve-style views of net contribution, spend burn-down, and portfolio allocation — the same shapes the Trading widget already uses. |
| Skills / Agents / Crons conceptual pattern (Triage, Research, Linker, Weekly Synthesis; named firing phrases; session-only crons) | `guides/(C) brain-engine-guide.html` | Direct conceptual precedent for Revenue OS's Cohorts (Section 13) and Daily Operating Loop (Section 26). The naming convention (role name + read scope + output + firing condition) can be copied almost verbatim for the Reconnaissance, Market Cartography, Validation, etc. cohorts. |
| Server-side scheduling (`create_trigger`/Routines) | This session's tool environment | A credible first building block for the "durable workflow runtime" requirement (Section 17.1) — Routines persist and fire independent of any open chat window, which is exactly the "not a daemon in a chat window" requirement in Section 3.3. Needs verification of durability guarantees, retry semantics, and idempotency before being trusted as the system of record. |
| WebSearch / WebFetch | This session's tool environment | The primary tool for Marketplace Liquidity Atlas research (Section 25) — collecting current, sourced, timestamped facts about lead networks, affiliate programs, etc. |
| Google Drive / Google Calendar / GitHub connectors | This session's tool environment | Early, low-risk connector examples: Drive can hold structured exports or act as informal object storage before real infra exists; Calendar demonstrates a real write-capable external connector with an approval-relevant action (creating events); GitHub is the code/version-control substrate for Revenue OS itself. None of these are revenue connectors (ads, affiliate, lead routing) — those don't exist yet. |
| `localStorage`-based client state pattern (`lsGet`/`lsSet` try/catch wrappers) | `spiritual/index.html`, `health/index.html`, `life-dashboard/index.html` | Fine for toy/prototype UI state, but explicitly **not** sufficient as the mission ledger or economic graph — the Constitution (Article IX) forbids core state living only in a prompt or a browser. Use only for UI ephemera in the read-only prototype (Phase 2/Step 5), never for money. |

## Must be built new (no current equivalent anywhere)

- Control-plane service (mission state machine, budgets, permissions, approval gates).
- PostgreSQL economic graph (`signals`, `marketplaces`, `buyers`, `opportunities`, `missions`,
  `ledger_entries`, etc. — see `ONTOLOGY.md`).
- Durable workflow runtime with retries, idempotency keys, and cancellation (Routines may cover
  *scheduling*, but not job state, retries, or the ledger).
- Secrets vault / per-connector credential scoping.
- Any revenue connector: ad platforms, affiliate/CPA networks, lead exchanges, commerce/POD,
  payment processors.
- Vector/semantic retrieval layer for the mission-packet builder (Section 16).
- Object storage for evidence, creatives, exports.
- Observability (cost tracking, connector health, duplicate-action prevention).

## Explicitly not reusable

- `ironframe/` — a preview mirror of an unrelated business (AI consulting site). Not a data source,
  not infrastructure, not a template for Revenue OS. Do not touch it as part of this work.
- The widget pages' hand-maintained data model (numbers typed directly into HTML) — this is the
  opposite of the "code filters, databases remember" maxim and must not be the pattern for Revenue
  OS's own numbers.
