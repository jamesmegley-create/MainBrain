# DECISIONS.md — Decision Log

Append-only. Each new real decision (product, architecture, or scope) gets an entry here. This is
distinct from `PRODUCT_SPEC.md` §4 (the *pre-resolved* decisions carried over from the original
discovery conversation) — this log is for decisions made *during implementation*, going forward.

---

## 2026-07-15 — Foundational documents created in MainBrain repo

**Decision:** Carry the Revenue OS handoff forward by creating `docs/revenue_os/` inside the
existing `MainBrain` repo (branch `claude/claude-md-docs-2r4w65`), rather than starting a new
repository, since that's where the handoff was delivered and this session's GitHub access is
scoped only to `jamesmegley-create/mainbrain`.

**Scope of this pass:** Handoff Section 31, Steps 1–3 — inventory (`CURRENT_STATE.md`,
`REUSE_MAP.md`, `CAPABILITY_MATRIX.md`, `RISKS_AND_GAPS.md`), foundational documents
(`CONSTITUTION.md`, `PRODUCT_SPEC.md`, `GLOSSARY.md`, `DECISIONS.md`, `OPEN_QUESTIONS.md`,
`ARCHITECTURE.md`, `ONTOLOGY.md`, `SECURITY_AND_APPROVALS.md`, `AGENT_CATALOG.md`, `SCORING.md`,
`MARKETPLACE_ATLAS.md`), and machine-readable schemas (`schemas/*.json`).

**Explicitly not done in this pass:** Step 4 (domain-logic code skeleton), Step 5 (read-only
prototype dashboard), Step 6 (real Marketplace Liquidity Atlas research via web search), Step 7
(first mission slate), Step 8 (end-to-end dry run). These require either real infrastructure
decisions (Step 4/5) or substantial live research work (Step 6) that go beyond a single
documentation pass — see `PRODUCT_SPEC.md` §8 for the phased plan and `OPEN_QUESTIONS.md` for what
blocks each.

**Rationale:** The handoff itself (Section 34) asks for a structured first response plus inventory
and foundational-document work, explicitly *before* proposing architecture code or asking James to
choose a first business model. Documentation and schema work is fully reversible and low-cost;
provisioning real infrastructure (a database, a hosting target, a new repo) is not, and is flagged
as an open question rather than decided unilaterally.

**Not yet decided (see `OPEN_QUESTIONS.md`):** whether Revenue OS ultimately lives in this repo or
a separate one; where the control-plane/database actually runs; initial cash/model budgets; which
verticals/geographies to prioritize for the first Marketplace Atlas research pass.
