# AGENT_CATALOG.md — Grand Legions, Officer Corps, and Agents

**Superseded in part:** the original handoff (Section 13) defined a flat list of twelve functional
cohorts. On 2026-07-15 James adopted the **Grand Legion Command Structure**
(`COMMAND_STRUCTURE.md`), which reorganizes those functions into a strict hierarchy:

> **Caesar → Legion Commander → Officer Corps → Assigned Agents**

This file now catalogs the roles as they exist under that structure. Where the old cohort names
appear in other docs or schemas, use the mapping table below.

## The hierarchy in one view

- **Caesar** — supreme capital allocator and strategic director. May be James, a high-capability
  model (Fable 5 is the current candidate — Caesar is a pluggable model slot, per
  `COMMAND_STRUCTURE.md` §2), or a hybrid where the model prepares recommendations and James gives
  final approval. Caesar directs the three Legion Commanders and never manages officers or agents
  directly. Article VI approval authority (spend, publish, outreach, contracts) sits at this layer
  regardless of whether Caesar is a model — a model-Caesar still escalates consequential actions
  to James until bounded autonomy is earned (Product Spec Phase 7).
- **Three Grand Legions** — permanent, self-contained economic campaign organizations. Identity is
  organizational, not market-specific: a legion is not "the lead-gen legion"; it can pursue any
  engine, and legions may compete on the same objective. Each fields a nominal force of ~100
  agents (capacity units, not 100 premium-model sessions — see `CONSTITUTION.md` interpretive
  notes).
- **Legion Commander** (one per legion) — persistent orchestration agent; the *sole* reporting
  line between the legion and Caesar. Receives directives, activates officers, resolves
  conflicting officer recommendations, synthesizes one integrated campaign proposal with a
  resource bid, executes within granted authority, reports results, and owns accountability for
  the legion's complete performance.
- **Officer Corps** (complete set inside *every* legion) — ten specialized roles below.
- **Assigned Agents** — scoped workers beneath officers: Claude agents, subagents, code workers,
  scheduled jobs, classifiers, API workers, browser automation, local models, deterministic
  scripts, human-in-the-loop tasks.
- **Reserve capacity** — an uncommitted pool of agents, tokens, compute, cash, and tool access
  held outside all three legions. Only Caesar deploys or withdraws it (reinforce a winner, chase a
  sudden signal, run a competing validation, emergency audit). Resource allocation is fluid, never
  a fixed entitlement.

## The ten officers (per legion)

| Officer | Purpose | Key outputs | Permissions |
|---|---|---|---|
| **Scout** | Find signals, targets, anomalies, emerging conditions: what changed, where attention/demand is moving, where cost diverges from value. Gathers raw opportunity intelligence; never makes the campaign decision. | Structured signals, candidate targets, velocity/novelty estimates. | Read-only external data. |
| **Intelligence** | Verify, correlate, and interpret Scout findings: is the signal real, timely, commercially meaningful, saturated? What evidence supports and contradicts it? | Decision-grade intelligence memo, source-quality assessment, confidence levels. | Read-only. |
| **Strategy** | Develop multiple monetization routes for the opportunity (paid acquisition, affiliate, lead gen, micro-software, data, POD, arbitrage, content, services, sponsorship, licensing, direct response) and recommend one with explicit assumptions. | Courses of action, strategic thesis, recommended play. | Read-only; draft proposals. |
| **Logistics** | Determine what execution actually requires: agents, models, tokens, compute, APIs, MCP servers, credentials, human approvals, time, dependencies, bottlenecks. Answers "can this actually be executed?" | Resource requirements, automation split (automatable vs. human-required), engineering limits, deployment timeline. | Read-only; queries capability/connector registry. |
| **Economics** | Model the campaign's financial structure: capital requested, expected revenue/profit/EV, max downside, break-even, CAC, contribution margin, payback, time to first dollar, sensitivity. | Scenario model, break-even thresholds, capital-efficiency analysis. | Read ledger; propose budgets; no spend authority. |
| **Validation** | Design the smallest credible test that can prove or disprove the thesis: budget, duration, sample size, success/failure thresholds, invalidation condition, decision deadline. | Minimum viable experiment spec, promotion criteria. | Draft only. |
| **Execution** | Turn approved strategy into action: build assets, launch pages, create campaigns, deploy software, connect APIs, publish offers, route leads, run ads, monitor, enforce budget/timing constraints. Consolidates the old Builder, Acquisition, and Distribution cohorts. | Deployed artifacts, campaign/spend/performance events. | Acts only within the authority and resources Caesar granted through the Commander; Article VI gates still apply. |
| **Audit** | Independently verify performance, compliance, attribution, truthfulness: is reported revenue real, are costs complete, were policies followed, were results overstated? Must stay independent of Execution. | Risk reviews, attribution verification, incident reports, trust/scale/pause/investigate recommendation. | Read-only + escalation authority (can block; Caesar may invoke emergency direct inspection). |
| **Knowledge** | Convert campaign activity into institutional memory: proposals, approvals, executions, assumptions, outcomes, predictive signals, reliable sources, reusable assets, playbook updates. | After-action reviews, calibrated estimates, updated playbooks, retrieval-index updates. | Read/write knowledge store. |
| **Frontier** | Monitor capability change: what became possible this week, which new models/APIs/MCP servers/marketplaces matter, which manual task is now automatable, which platform rule or cost changed. | Capability-change cards, connector proposals, deprecation alerts (Constitution, Article X). | Read-only; propose connector changes. |

## Mapping from the original handoff's twelve cohorts

| Original cohort (handoff §13) | Now |
|---|---|
| Reconnaissance | **Scout Officer** |
| Intelligence & Research | **Intelligence Officer** |
| Strategy | **Strategy Officer** |
| Economics & Treasury | **Economics Officer** (ledger maintenance itself moves to shared infrastructure — see note below) |
| Validation | **Validation Officer** |
| Builder | **Execution Officer** |
| Acquisition | **Execution Officer** |
| Distribution & Marketplace Operations | **Execution Officer** |
| Audit, Policy & Account-Equity | **Audit Officer** |
| Knowledge & Chronicle | **Knowledge Officer** |
| Capability Frontier | **Frontier Officer** |
| Market Cartography & Liquidity | **Shared infrastructure**, not a per-legion officer — see below |
| *(no prior equivalent)* | **Logistics Officer** (new role: execution feasibility and resourcing) |

**Note on Market Cartography & Liquidity:** the Marketplace Atlas (`MARKETPLACE_ATLAS.md`) is a
single shared system-level asset — three legions maintaining three competing atlases would
fragment the crown-jewel data (Constitution, interpretive notes). Legion officers (Scout,
Intelligence, Strategy) *query and contribute to* the shared atlas; its integrity, dedup, and
verification-freshness rules are system infrastructure owned at the Caesar/platform layer.
Likewise the **ledger** is one shared system of record — each legion's Economics Officer reads and
proposes against it, but no legion owns it.

## Competition and scoring

The three legions compete for cash, ad budget, tokens, premium model access, compute, agent
capacity, human review time, credentials, and tool permissions by submitting campaign proposals
with resource bids (see `COMMAND_STRUCTURE.md` §8–9 for the full bid and proposal contents).
Caesar allocates to the strongest combination of expected profit, probability of success, speed to
first dollar, capital efficiency, scalability, reusability, strategic fit, knowledge yield,
evidence confidence, and historical legion performance. Competition is measured on **verified
economic results and improved future decision quality — never volume of activity**
(`COMMAND_STRUCTURE.md` §12).

## Agent specification template (unchanged from the original handoff)

Every agent/worker definition must declare: name and role, purpose, inputs, expected output
schema, tools, permissions, cash/model/tool budget, time limit, retry policy, stop conditions,
escalation conditions, evaluation criteria, prompt/version identifier, and data-retention rules.
No agent receives all tools or all credentials by default (`SECURITY_AND_APPROVALS.md`). Under the
Grand Legion structure this template applies at *every* layer: Commanders, officers, and assigned
agents are all specified this way, differing only in scope.

## Prior art already in this environment

`guides/(C) brain-engine-guide.html` documents a smaller-scale version of this pattern for James's
Obsidian vault: Triage, Research, Linker, and Weekly Synthesis agents, each with a read scope,
output, and firing condition. When implementing officers, prefer that naming/firing-condition
convention — it's already James's working vocabulary.
