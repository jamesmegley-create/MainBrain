# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

MainBrain is James's personal "second brain" dashboard: a set of static, hand-authored HTML widgets (no build step, no framework, no backend in this repo) that render finance, health, trading, social, and life-tracking data. It's the display layer only — the Obsidian vault it reads from ("James SecondBrain", with folders like `00 Raw Inputs/`, `01 Wiki/`, `02 Active Tasks/`) and the Node server that serves these files (`brain-server.js`) both live outside this repository, on James's Windows machine. Don't expect to find or need to run either here.

Widget data (numbers, holdings, stats) is hand-maintained directly in each HTML file, not fetched from a live API — there is no `fetch()`/XHR anywhere in the widget pages. When asked to "update" a widget's numbers, edit the literal values/markup in that widget's `index.html`.

## Running / previewing

There is no build, lint, or test tooling — these are plain HTML/CSS/JS files.

- Preview a widget by opening its `index.html` directly in a browser, or via `python3 -m http.server` from the repo root.
- The production path is `brain-server.js` (Node `http`, not in this repo) serving this directory on port 8080, reachable over Tailscale from James's other devices. See `guides/(C) brain-engine-guide.html` for the full remote-access setup (Tailscale, SSH, VS Code Remote-SSH) if that's ever relevant.
- Root `index.html` is just a redirect stub to `Home Widget.html`, the actual home page.

## Structure

```
Home Widget.html      # home page: live-connection tiles, advocate cards, command palette
index.html             # redirect -> Home Widget.html
_shared/
  style.css            # design tokens + shared layout classes (app shell, grid, cards, stat blocks)
  utils.js             # Brain{} global: formatters, nav bar, command palette, page registry
  components.js         # Charts{} global: canvas line/bar/donut chart renderers (no chart library)
<widget>/index.html    # one folder per widget: daily-briefing, gaming, graph, health,
                        # life-dashboard, robinhood, social, spiritual, spotify, trading
guides/                # "(C)" prefixed = Claude-authored reference docs (model selection, brain-engine setup)
ironframe/              # embedded preview of a separate business site (see below)
```

Each widget is a single self-contained `index.html`: shared tokens/layout from `_shared/style.css`, widget-specific styles in a local `<style>` block, and widget-specific data/logic in a local `<script>` block at the bottom.

## Adding or editing a widget

1. Copy the shell of an existing widget (e.g. `trading/index.html`) — `<head>` boilerplate (Google Fonts preconnect for Inter + JetBrains Mono, `../_shared/style.css` link), then widget-specific `<style>`, then body markup, then `<script src="../_shared/utils.js"></script>` followed by a local `<script>` that calls `Brain.renderNav('<page-key>')` on `DOMContentLoaded`.
2. If the widget needs canvas charts, also include `../_shared/components.js` (`Charts.line/bar/donut`) — see `robinhood/index.html` or `gaming/index.html` for the include order.
3. Register the new page in two places in `_shared/utils.js` so nav and the command palette pick it up: `Brain.PAGES` (nav strip entry with `href`/`hrefSub` for root vs. sub-page depth) and `Brain.PALETTE_ITEMS` (Cmd-K search entry).
4. Use the existing CSS custom properties from `_shared/style.css` (`--bg-surface`, `--border`, `--gold`, `--blue`, `--green`, `--red`, `--text-primary/secondary/muted`, `--radius-md`, etc.) rather than hardcoding colors, so the widget matches the rest of the dashboard.
5. For positive/negative values (P&L, deltas), use `Brain.deltaHTML(n)` / `Brain.deltaClass(n)` / `Brain.colorBySign(n)` instead of hand-rolled sign logic.
6. Any client-side persisted state (checklists, toggles, uploaded photos) goes through `localStorage`, namespaced per widget (e.g. `health-supp-photo`, a `WEEK_KEY` constant in `life-dashboard`). Wrap `JSON.parse`/`localStorage` access in try/catch the way `spiritual/index.html`'s `lsGet`/`lsSet` helpers do.

Widgets vary in exactly which shared scripts they include — some (`spotify`, `daily-briefing`, `spiritual`) only need `utils.js`; others (`gaming`, `robinhood`) also pull in `components.js` for charts. Match what the widget actually uses.

## `ironframe/`

This is a preview mirror of a separate, real product site (an AI consulting business), not part of the second-brain dashboard proper:

- `ironframe/index.html` is a standalone "Launch Tracker" widget (its own dark theme, not the shared `_shared/style.css`) tracking launch checklist state in `localStorage`.
- `ironframe/site/` is a **copy** of the canonical site, whose source of truth lives outside this repo at `James SecondBrain/03 Projects/AI Consulting Brand/04 Website/`. Run `ironframe/sync-site.bat` (Windows) after editing the canonical files to refresh this preview copy — don't hand-edit `ironframe/site/*` expecting it to be the source of truth.
- The real site's `api/` (Stripe checkout, etc.) only runs on Vercel and is intentionally not mirrored here; `ironframe/site/checkout.html` shows a graceful fallback in this static preview.
- `ironframe/site/config.js` holds only the public Stripe *publishable* key (safe to expose) — never put a secret key here.

## Conventions

- Dark theme, two related but distinct token sets: the main dashboard uses navy/blue (`--bg-base: #0b1c30`, `--blue: #5eb3ff`, `--gold: #d4af6a`) from `_shared/style.css`; `guides/` and `ironframe/index.html` use a near-black variant (`--bg: #0f0f0f`, `--gold: #c8a96e`). Match whichever family the file you're editing already uses.
- Fonts: Inter (display) + JetBrains Mono (numbers/mono UI), loaded via Google Fonts `<link>` in each page's `<head>`.
- Filenames prefixed `(C)` (e.g. `guides/(C) brain-engine-guide.html`) denote Claude-authored/maintained docs, as opposed to hand-written content.
- No package manager, bundler, linter, or test suite — verify changes by opening the file in a browser.
