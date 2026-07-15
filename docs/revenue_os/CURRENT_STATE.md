# CURRENT_STATE.md — Revenue OS Phase 0 Inventory

Produced per the Revenue OS handoff, Section 31 Step 1. Documents what actually exists in this
repository and this execution environment as of the inventory date, so later architecture
decisions are grounded in fact rather than assumption.

**Inventory date:** 2026-07-15

---

## 1. Repository identity

This repo (`MainBrain`, GitHub: `jamesmegley-create/mainbrain`) is James's personal "second brain"
dashboard: a set of static, hand-authored HTML widgets with no build step, no framework, and no
backend. It is a **display layer only**. See root `CLAUDE.md` for the full description.

Key facts:

- No `package.json`, no bundler, no linter, no test runner, no CI config.
- No server-side code in the repo. `brain-server.js` (a Node `http` static file server) exists
  only on James's Windows machine, outside this repo.
- No database of any kind exists in this repo.
- Two commits total in git history as of this inventory (`Initial commit`, `Add files via upload`)
  — this is a young, hand-maintained repo, not a mature engineering project.
- All widget data (finance figures, holdings, health stats) is hand-typed into HTML files. There is
  no `fetch()`/XHR anywhere in the widget pages — nothing here talks to a live API today.

## 2. What's actually in the repo

```
Home Widget.html        # dashboard home: live-connection tiles, advocate cards, command palette
index.html               # redirect stub -> Home Widget.html
_shared/
  style.css              # design tokens + shared layout (navy/blue theme)
  utils.js               # Brain{} global: formatters, nav bar, command palette, page registry
  components.js           # Charts{} global: canvas line/bar/donut chart renderers
daily-briefing/           # widgets, each a single self-contained index.html
gaming/
graph/                    # network graph widget (vis-network via CDN)
health/
life-dashboard/
robinhood/
social/
spiritual/
spotify/
trading/
guides/                   # "(C)" prefixed = Claude-authored reference docs, near-black theme
  (C) brain-engine-guide.html
  (C) model-selection.html
ironframe/                 # preview mirror of a *separate* business (AI consulting), not Revenue OS
  index.html
  site/                    # synced copy of a real Vercel-hosted site; canonical source is outside this repo
  sync-site.bat
```

## 3. Existing automation/agent layer (important prior art)

`guides/(C) brain-engine-guide.html` documents an **already-designed** skills/agents/cron layer for
James's Obsidian vault ("James SecondBrain", outside this repo). It is not code in this repo — it's
a reference page describing conventions James already uses in Claude sessions. Relevant patterns:

- **Skills** (on-demand phrases): "morning briefing", "trade review", "sales prep", "draft a post",
  "goal check", "weekly update".
- **Agents** (autonomous, role-based): Triage, Research, Linker, Weekly Synthesis — each with a
  defined read scope, output, and firing condition.
- **Crons**: a 6:03am daily job and a Sunday 8:47am job, described as "session-only... re-register
  each session, or use `/schedule` for persistent crons."
- **Loop pattern**: `/loop <instruction>` for self-pacing background work.
- The guide already uses the language of **cohorts, budgets, and firing conditions** — conceptually
  close to what Revenue OS's Constitution (Article X, Section 13) asks for.

This is directly reusable *design language*, not reusable code — there is no code implementing it
in this repo.

## 4. What is available in *this specific execution environment* (not the repo)

This session runs in an ephemeral Claude Code Remote container. The following are real, verified
capabilities of the session, not the repo:

- **Research**: `WebSearch`, `WebFetch` tools.
- **Scheduling primitives**: `create_trigger` / `list_triggers` / `update_trigger` /
  `delete_trigger` / `fire_trigger` (server-side "Routines" — persist independently of this
  container and can fire into a session on a cron schedule or one-shot), plus `ScheduleWakeup`
  (in-loop self-pacing) and `send_later` (delayed message to this session).
- **Connectors already wired into this account**: Google Calendar MCP, Google Drive MCP, Spotify
  MCP, GitHub MCP (scoped to `jamesmegley-create/mainbrain` only in this session).
- **Code/file tools**: Bash, Read/Write/Edit/Glob/Grep — full filesystem access within the
  container, but the container itself is **ephemeral** (reclaimed after inactivity) and has no
  persistent database, no always-on process, and no public network listener.

None of these constitute a production database, a durable job queue, a secrets vault, or a
payments/ads/affiliate/lead-network connector. See `CAPABILITY_MATRIX.md` for the full breakdown.

## 5. Explicit gap versus the Revenue OS requirements

The handoff (Section 17) calls for a control-plane service, a durable workflow runtime, a
PostgreSQL economic graph, a connector gateway, a secrets vault, and a dashboard frontend. **None
of this exists yet, anywhere.** This repo currently contains zero backend infrastructure of any
kind — it is a folder of static HTML files served by a script that lives on James's own machine.

This is the single most important fact for Phase 1 planning: Revenue OS cannot be "added" to
MainBrain as another `index.html` widget. It needs its own service layer. See `RISKS_AND_GAPS.md`
and `ARCHITECTURE.md` for how this is being scoped.
