# RISKS_AND_GAPS.md

Per handoff Section 31 Step 1.

## Structural gaps (block real execution, not research)

1. **No backend anywhere.** This repo is 100% static HTML/CSS/JS. There is no server, database, or
   job runner in it. Revenue OS's control plane, ledger, and workflow runtime need a real service —
   they cannot be simulated as another `index.html` widget with hand-typed numbers, which is the
   existing pattern in this repo and is explicitly the wrong pattern for money (Constitution,
   Article IX; maxim "code filters, databases remember").
2. **No durable process host.** This Claude Code Remote session is an ephemeral container. The only
   persistent, always-on compute path known today is `brain-server.js` on James's Windows machine —
   and that is a static file server outside this repo, not a workflow engine. Where the control
   plane and database actually run is an open infrastructure question (see `OPEN_QUESTIONS.md`).
3. **No connectors to any revenue-bearing system.** No ad platform, affiliate/CPA network, lead
   exchange, payment processor, or commerce platform is connected anywhere in this account or
   environment. Every "Exit Path" the system proposes will start life as `HYPOTHETICAL` or
   `VERIFIED_PUBLIC` (public terms known, access not yet granted) — never `VERIFIED_ACTIVE` — until
   real onboarding happens.
4. **No secrets management.** Nothing in this repo or environment is set up to hold API keys or
   credentials safely. Do not place any credential in this repo, in a prompt, in a Drive file, or in
   any document created by this work.
5. **GitHub scope is repo-limited.** This session's GitHub access is scoped to
   `jamesmegley-create/mainbrain` only. If Revenue OS should live in a separate repository (a real
   architectural option — see `OPEN_QUESTIONS.md`), that repo must be explicitly added to the
   session before any code can be pushed there.

## Process risks

6. **Scope mismatch with the existing repo's identity.** `CLAUDE.md` currently describes MainBrain
   as "a set of static, hand-authored HTML widgets... no build step, no framework, no backend."
   Adding a large, evolving product spec and (eventually) real services into this repo changes that
   description. `CLAUDE.md` should be kept accurate as this grows, or Revenue OS should be moved to
   its own repository — this is flagged, not yet resolved.
7. **Documentation drift.** The foundational docs created in this pass (Constitution, Ontology,
   Scoring, etc.) are largely restructured directly from the handoff document. They are internally
   consistent with the handoff today but will drift from reality the moment real schemas, code, or
   decisions diverge from what's written here. `DECISIONS.md` exists specifically to capture that
   divergence going forward — it must be updated at each real decision, not treated as done.
8. **Marketplace Atlas is currently a template, not research.** `MARKETPLACE_ATLAS.md` created in
   this pass defines the *shape* of the atlas (per Section 9) but contains no verified marketplace
   entries. Section 25's research standards (official sources, timestamps, explicit access-status
   labeling) must be followed rigorously when that research actually happens — fabricated or
   inferred payout/acceptance data is explicitly forbidden by the Constitution (Article III).

## Non-risks worth naming (so they aren't accidentally treated as blockers)

- Claude's reasoning capability for opportunity generation, economics modeling, and evidence
  synthesis is available today and does not depend on any of the infrastructure gaps above.
- The design system and JS utilities in `_shared/` are genuinely reusable for a read-only prototype
  dashboard (Phase 2) without waiting on backend infrastructure.
- Scheduling primitives (Routines, `ScheduleWakeup`) are real and available now, even though they
  are not a full workflow runtime.
