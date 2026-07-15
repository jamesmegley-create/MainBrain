# AGENT_CATALOG.md — Cohorts and Agents

Source: handoff Section 13. The UI may use Roman-legion visuals, but functional names below must
stay clear in code, data, and prompts.

| Cohort | Purpose | Typical outputs | Permissions |
|---|---|---|---|
| **Reconnaissance** | Detect changes in demand, attention, price, competition, availability, policy, technology, buyer behavior. | Structured signals, source evidence, trend velocity, novelty, half-life estimate, candidate markets. | Read-only external data. |
| **Market Cartography & Liquidity** | Maintain the map of marketplaces, buyers, offers, payouts, rules, integration possibilities. Directly answers "where do I offload this?" | Marketplace records, buyer verification, exit-path options, liquidity score, onboarding missions, current terms/dates. | Read-only external data; write to marketplace atlas. |
| **Intelligence & Research** | Synthesize evidence, compare competitors, identify customer pain, separate signal from noise. | Evidence memo, assumption table, source-quality assessment, alternative explanations. | Read-only. |
| **Strategy** | Convert signals into multiple monetization routes rather than defaulting to the most obvious product. | Opportunity candidates, hypotheses, offer concepts, monetization-route comparison, recommended mission. | Read-only; draft opportunities. |
| **Economics & Treasury** | Model unit economics, expected value, cash timing, capital efficiency, budget allocation. Also maintains the ledger. | Scenario model, break-even thresholds, maximum loss, budget recommendation, concentration checks. | Read ledger; propose budget; no spend authority. |
| **Validation** | Design the smallest informative test. | Experiment design, sample size/stopping logic, measurement plan, success/fail thresholds, learning objective. | Draft only. |
| **Builder** | Create landing pages, tools, datasets, creatives, tracking, product drafts, internal connectors. | Versioned artifacts, tests, deployment draft, cost estimate, rollback plan. | Draft/build; no publish. |
| **Acquisition** | Obtain traffic/distribution through approved channels. | Campaign drafts, audience/keyword plans, budget schedule, tracking config, spend/performance events. | Draft only until approved; spend requires Article VI approval. |
| **Distribution & Marketplace Operations** | Publish, route, list, deliver, or offload the output through the verified exit path. | Marketplace listing, lead routing, buyer delivery, affiliate tracking, fulfillment event, revenue event. | Publish/route requires Article VI approval until calibrated. |
| **Audit, Policy & Account-Equity** | Protect legal standing, platform access, data integrity, consent, IP, authorized spend. | Risk review, permission check, policy flags, account-health alerts, incident report. | Read-only + escalation authority (can block). |
| **Knowledge & Chronicle** | Update the proprietary economic database; retrieve relevant prior learning. | After-action review, updated playbook, calibrated estimates, reusable components, retrieval-index updates. | Read/write to knowledge store. |
| **Capability Frontier** | Identify changes in models, APIs, MCP servers, data sources, marketplaces that alter what's economically feasible. | Capability-change cards, new connector proposals, deprecation alerts, cost-performance comparisons, migration recommendations. | Read-only; propose connector changes (Constitution, Article X). |

## Agent specification template

Every agent/worker definition must declare:

- Name and role.
- Purpose.
- Inputs.
- Expected output schema.
- Tools.
- Permissions.
- Cash/model/tool budget.
- Time limit.
- Retry policy.
- Stop conditions.
- Escalation conditions.
- Evaluation criteria.
- Prompt/version identifier.
- Data-retention rules.

No agent should receive all tools or all credentials by default (least privilege — see
`SECURITY_AND_APPROVALS.md`).

## Prior art already in this environment

`guides/(C) brain-engine-guide.html` already documents a smaller-scale version of this pattern for
James's Obsidian vault: **Triage**, **Research**, **Linker**, and **Weekly Synthesis** agents, each
with a read scope, output, and firing condition, plus named on-demand skills ("morning briefing",
"trade review", etc.) and session-scoped crons. When implementing the cohorts above, prefer copying
that naming and firing-condition convention rather than inventing a new one — it's already
James's working vocabulary.
