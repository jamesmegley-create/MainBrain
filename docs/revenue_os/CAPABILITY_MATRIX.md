# CAPABILITY_MATRIX.md

Per handoff Section 21 (Capability Frontier) and Section 31 Step 1. Classifies what Revenue OS can
actually do *today*, using the six-state model from Section 30 ("What can the system automate?"):
**available now / available with account setup / draft-only / human-required / blocked / unknown —
requires verification**.

This matrix will be wrong the moment a new connector is added — it must be updated whenever a
connector's status changes, not treated as permanent truth.

## Research & analysis

| Capability | Status | Notes |
|---|---|---|
| Web research (search + fetch) | **Available now** | `WebSearch`/`WebFetch` tools. Basis for the Marketplace Liquidity Atlas. |
| Structured data extraction from messy sources | **Available now** | Model capability, no connector needed. |
| Reading/writing this repo's files | **Available now** | Bash/Read/Write/Edit/Glob/Grep in-session. |
| Reading GitHub repo contents, PRs, issues | **Available now** | GitHub MCP, scoped to `jamesmegley-create/mainbrain` only in this session. |
| Reading/searching Google Drive files | **Available now** | Google Drive MCP. |
| Reading Google Calendar | **Available now** | Google Calendar MCP. |

## Scheduling & orchestration

| Capability | Status | Notes |
|---|---|---|
| One-shot or recurring server-side triggers into a session | **Available now** | `create_trigger` (Routines) — minimum interval hourly for cron, or a one-shot `run_once_at`. Persists independent of this container. **Unverified**: exact retry/failure semantics, whether it survives account-level outages, whether it can carry structured payloads beyond a text prompt. |
| Self-pacing loop inside an active session | **Available now** | `ScheduleWakeup` (dynamic loop mode), `send_later` (single delayed message). Bounded to [60s, 3600s] delay. |
| Durable job queue with retries/idempotency/cancellation | **Blocked** | Does not exist. Routines are a scheduling primitive, not a job/state system. This is a real Phase 1 architecture decision, not a solved problem. |
| Always-on backend process | **Blocked** | This container is ephemeral and reclaimed after inactivity. No infra in this repo runs continuously today. `brain-server.js` runs continuously but only on James's own Windows machine, outside this repo, and is a static file server — not a job runner. |

## Money-adjacent actions

| Capability | Status | Notes |
|---|---|---|
| Spending money (ads, purchases, subscriptions) | **Blocked** | No payment method, ad account, or spend connector exists in this environment. |
| Publishing content externally (site, social) | **Blocked** | No publishing connector configured. GitHub can publish *code*, not marketing content, to a live audience. |
| Sending outreach to real people/buyers | **Blocked** | No email/CRM connector configured. |
| Creating/routing leads containing personal data | **Blocked** | No lead-exchange or CRM connector; also gated by Article VI regardless of connector availability. |
| Registering domains / changing DNS | **Blocked** | No registrar connector. |
| Accepting contracts or marketplace terms | **Human-required** | Even once a connector exists, Article VI requires human approval for this by default. |

## Data & infrastructure

| Capability | Status | Notes |
|---|---|---|
| Relational database (PostgreSQL) | **Blocked** | Not provisioned anywhere. Needed before Phase 4 (mission approval/orchestration) can hold real state. |
| Secrets vault | **Blocked** | Not provisioned. No credentials should be placed in this repo, in prompts, or in Drive files until one exists. |
| Object storage for evidence/creatives | **Blocked** | Not provisioned; Google Drive is a plausible *stopgap* for the prototype phase only. |
| Vector/semantic retrieval | **Blocked** | Not provisioned. |

## Drafting & judgment (Claude's native strengths, per Section 18)

| Capability | Status | Notes |
|---|---|---|
| Opportunity generation, monetization-route comparison, economics explanation, code review, experiment design, after-action reviews | **Available now** | These are model reasoning tasks, not connector-gated. This is where Claude adds the most value per the handoff's own doctrine (Section 18). |

## Immediate implication

Every capability required to *research and propose* (Sections 2, 8, 9, 25) is available today.
Nearly every capability required to *spend, publish, or execute* (Section 21.2) is currently
blocked for lack of a connector, independent of any approval-gate logic. This confirms the
handoff's own phasing is correct for this environment: Phase 0–3 (inventory, foundational docs,
read-only intelligence, Marketplace Atlas) can proceed now; Phase 4+ (real mission execution)
requires infrastructure and connectors that do not yet exist.
