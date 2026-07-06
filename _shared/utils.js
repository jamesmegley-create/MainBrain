/* James Brain — Shared Widget Utilities */

const Brain = {

  /* ── Date & Time ─────────────────────────────────────────── */
  today() {
    return new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  },
  dateStamp() {
    return new Date().toISOString().split('T')[0];
  },

  /* ── Number Formatters ──────────────────────────────────── */
  currency(n, decimals = 2) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: decimals }).format(n);
  },
  pct(n, decimals = 1) {
    return `${(+n).toFixed(decimals)}%`;
  },
  compact(n) {
    if (Math.abs(n) >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (Math.abs(n) >= 1000)    return `${(n / 1000).toFixed(1)}K`;
    return String(n);
  },

  /* ── Delta Helpers ──────────────────────────────────────── */
  deltaClass(n) {
    if (+n > 0) return 'pos';
    if (+n < 0) return 'neg';
    return 'neu';
  },
  deltaArrow(n) {
    if (+n > 0) return '▲';
    if (+n < 0) return '▼';
    return '—';
  },
  deltaHTML(n, suffix = '') {
    const cls = Brain.deltaClass(n);
    const arrow = Brain.deltaArrow(n);
    const abs = Math.abs(+n).toFixed(1);
    return `<span class="stat-delta ${cls}">${arrow} ${abs}${suffix}</span>`;
  },

  /* ── Color by Value ─────────────────────────────────────── */
  colorBySign(n) {
    if (+n > 0) return 'var(--green)';
    if (+n < 0) return 'var(--red)';
    return 'var(--text-secondary)';
  },

  /* ── DOM Helpers ────────────────────────────────────────── */
  setDate(elementId = 'app-date') {
    const el = document.getElementById(elementId);
    if (el) el.textContent = Brain.today();
  },
  el(selector) {
    return document.querySelector(selector);
  },
  els(selector) {
    return [...document.querySelectorAll(selector)];
  },

  /* ── Sparkline (Canvas) ─────────────────────────────────── */
  sparkline(canvasEl, data, color = 'var(--gold)') {
    const ctx = canvasEl.getContext('2d');
    const w = canvasEl.width;
    const h = canvasEl.height;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const step = w / (data.length - 1);

    ctx.clearRect(0, 0, w, h);
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / range) * h;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.stroke();
  },

  /* ── Progress Fill ──────────────────────────────────────── */
  setProgress(barSelector, pct, color) {
    const el = document.querySelector(barSelector);
    if (!el) return;
    el.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    if (color) el.style.background = color;
  },

  /* ── Shared Nav Bar ─────────────────────────────────────── */
  /* Call Brain.renderNav('current-page-key') from any sub-widget.
     Pass null or 'home' to suppress the back button (home page). */
  PAGES: [
    { key: 'home',       label: 'Home',     icon: '🏠', href: null,                         hrefSub: '../index.html'        },
    { key: 'social',     label: 'Social',   icon: '📱', href: 'social/index.html',           hrefSub: '../social/index.html' },
    { key: 'graph',      label: 'Brain Graph', icon: '🕸️', href: 'graph/index.html',         hrefSub: '../graph/index.html'  },
    { key: 'trading',    label: 'Trading',  icon: '📈', href: 'trading/index.html',          hrefSub: '../trading/index.html'},
    { key: 'life',       label: 'Life',     icon: '🧬', href: 'life-dashboard/index.html',   hrefSub: '../life-dashboard/index.html' },
    { key: 'briefing',   label: 'Briefing', icon: '🌅', href: 'daily-briefing/index.html',   hrefSub: '../daily-briefing/index.html' },
    { key: 'health',     label: 'Health',   icon: '💪', href: 'health/index.html',           hrefSub: '../health/index.html' },
    { key: 'spiritual',  label: 'Spiritual',icon: '✝️', href: 'spiritual/index.html',         hrefSub: '../spiritual/index.html' },
    { key: 'robinhood',  label: 'Robinhood',icon: '💰', href: 'robinhood/index.html',         hrefSub: '../robinhood/index.html' },
    { key: 'spotify',    label: 'Spotify',  icon: '🎧', href: 'spotify/index.html',           hrefSub: '../spotify/index.html' },
    { key: 'gaming',     label: 'Gaming',   icon: '🎮', href: 'gaming/index.html',            hrefSub: '../gaming/index.html' },
  ],

  renderNav(current) {
    const isHome = !current || current === 'home';
    const isSubPage = !isHome;

    const homeHref = isSubPage ? '../index.html' : null;

    const strip = document.createElement('div');
    strip.className = 'brain-nav' + (isHome ? ' brain-nav--home' : '');

    const left = document.createElement('div');
    left.className = 'brain-nav-left';

    if (isSubPage) {
      left.innerHTML = `<a class="brain-nav-back" href="${homeHref}">← Home</a><span class="brain-nav-sep">|</span>`;
    } else {
      left.innerHTML = `<span class="brain-nav-brand">🧠 James Brain</span>`;
    }

    const links = document.createElement('div');
    links.className = 'brain-nav-links';

    Brain.PAGES.filter(p => p.key !== 'home').forEach(p => {
      const href = isSubPage ? p.hrefSub : p.href;
      const isCurrent = p.key === current;
      const a = document.createElement('a');
      a.href = href || '#';
      a.className = 'brain-nav-link' + (isCurrent ? ' active' : '');
      a.innerHTML = `${p.icon} ${p.label}`;
      if (isCurrent) a.setAttribute('aria-current', 'page');
      links.appendChild(a);
    });

    strip.appendChild(left);
    strip.appendChild(links);

    document.body.insertBefore(strip, document.body.firstChild);
  },

  /* ── Command Palette ────────────────────────────────────── */
  PALETTE_ITEMS: [
    { label: '🏠 Home',             type: 'widget', href: 'index.html'                   },
    { label: '📱 Social Stats',      type: 'widget', href: 'social/index.html'            },
    { label: '🕸️ Brain Graph',       type: 'widget', href: 'graph/index.html'             },
    { label: '📈 Trading Dashboard', type: 'widget', href: 'trading/index.html'           },
    { label: '🧬 Life Dashboard',    type: 'widget', href: 'life-dashboard/index.html'    },
    { label: '🌅 Daily Briefing',    type: 'widget', href: 'daily-briefing/index.html'    },
    { label: '💪 Health',            type: 'widget', href: 'health/index.html'            },
    { label: '✝️ Spiritual',         type: 'widget', href: 'spiritual/index.html'          },
    { label: '💰 Robinhood',         type: 'widget', href: 'robinhood/index.html'          },
    { label: '🎧 Spotify',           type: 'widget', href: 'spotify/index.html'            },
    { label: '🎮 Gaming & Strategy', type: 'widget', href: 'gaming/index.html'             },
    { label: '🧭 Model Selection Guide', type: 'widget', href: 'guides/(C)%20model-selection.html' },
    { label: '💰 Finance Wiki',      type: 'wiki', href: 'obsidian://open?vault=MainBrain&file=01%20Wiki%2F(C)%20Finance' },
    { label: '📈 Trading Wiki',      type: 'wiki', href: 'obsidian://open?vault=MainBrain&file=01%20Wiki%2F(C)%20Trading%20%26%20Finance' },
    { label: '✝️ Faith Wiki',        type: 'wiki', href: 'obsidian://open?vault=MainBrain&file=01%20Wiki%2F(C)%20Faith%20%26%20Theology' },
    { label: '💪 Health Wiki',       type: 'wiki', href: 'obsidian://open?vault=MainBrain&file=01%20Wiki%2F(C)%20Health%20%26%20Physical' },
    { label: '🧠 Mental Models',     type: 'wiki', href: 'obsidian://open?vault=MainBrain&file=01%20Wiki%2F(C)%20Mental%20Models' },
    { label: '💼 Sales & Career',    type: 'wiki', href: 'obsidian://open?vault=MainBrain&file=01%20Wiki%2F(C)%20Sales%20%26%20Career' },
    { label: '🤝 Relationships',     type: 'wiki', href: 'obsidian://open?vault=MainBrain&file=01%20Wiki%2F(C)%20Relationships' },
    { label: '🤖 AI & Automation',   type: 'wiki', href: 'obsidian://open?vault=MainBrain&file=01%20Wiki%2F(C)%20AI%20%26%20Automation' },
    { label: '🎸 Music & Drums',     type: 'wiki', href: 'obsidian://open?vault=MainBrain&file=01%20Wiki%2F(C)%20Music%20%E2%80%94%20Metal%20%26%20Drums' },
    { label: '🎮 Gaming',            type: 'wiki', href: 'obsidian://open?vault=MainBrain&file=01%20Wiki%2F(C)%20Gaming' },
    { label: '🏂 Snowboarding',      type: 'wiki', href: 'obsidian://open?vault=MainBrain&file=01%20Wiki%2F(C)%20Snowboarding%20%26%20Hobbies' },
    { label: '😂 Comedy',            type: 'wiki', href: 'obsidian://open?vault=MainBrain&file=01%20Wiki%2F(C)%20Comedy%20%26%20Entertainment' },
    { label: '🗺️ Alt History',       type: 'wiki', href: 'obsidian://open?vault=MainBrain&file=01%20Wiki%2F(C)%20Alternative%20History%20%26%20Mysteries' },
    { label: '🏛️ Politics',          type: 'wiki', href: 'obsidian://open?vault=MainBrain&file=01%20Wiki%2F(C)%20Politics%20%26%20Commentary' },
    { label: '⚔️ Military History',   type: 'wiki', href: 'obsidian://open?vault=MainBrain&file=01%20Wiki%2F(C)%20Military%20%26%20War%20History' },
    { label: '🥊 Sports & MMA',      type: 'wiki', href: 'obsidian://open?vault=MainBrain&file=01%20Wiki%2F(C)%20Sports%20%26%20MMA' },
    { label: '📋 Queue',             type: 'system', href: 'obsidian://open?vault=MainBrain&file=02%20Active%20Tasks%2F(C)%20QUEUE' },
    { label: '🎯 Goals',             type: 'system', href: 'obsidian://open?vault=MainBrain&file=GOALS' },
    { label: '🗡️ Bannerlord Debug',  type: 'system', href: 'obsidian://open?vault=MainBrain&file=00%20Raw%20Inputs%2F(C)%20Bannerlord%20Debug%20Log' },
    { label: '🖥️ Remote SSH Task',   type: 'system', href: 'obsidian://open?vault=MainBrain&file=..%2FWidgets%2F(C)%20QUEUE' },
  ],

  _paletteOpen: false,

  initPalette() {
    const overlay = document.createElement('div');
    overlay.id = 'cmd-overlay';
    overlay.innerHTML = `
      <div id="cmd-box">
        <div id="cmd-search-wrap">
          <span id="cmd-icon">⌘</span>
          <input id="cmd-input" type="text" placeholder="Search widgets, wiki, system…" autocomplete="off" spellcheck="false">
          <span id="cmd-esc">ESC</span>
        </div>
        <div id="cmd-results"></div>
        <div id="cmd-footer">
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>Esc</kbd> close</span>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const input  = document.getElementById('cmd-input');
    const results = document.getElementById('cmd-results');
    let selected = 0;

    const render = (q) => {
      const q2 = q.trim().toLowerCase();
      const items = q2
        ? Brain.PALETTE_ITEMS.filter(i => i.label.toLowerCase().includes(q2))
        : Brain.PALETTE_ITEMS;
      selected = 0;
      results.innerHTML = items.slice(0, 12).map((item, i) => `
        <a class="cmd-item${i === 0 ? ' selected' : ''}" href="${item.href}" data-idx="${i}">
          <span class="cmd-item-label">${item.label}</span>
          <span class="cmd-item-type ${item.type}">${item.type}</span>
        </a>`).join('') || `<div class="cmd-empty">No results for "${q}"</div>`;

      results.querySelectorAll('.cmd-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
          results.querySelectorAll('.cmd-item').forEach(e => e.classList.remove('selected'));
          el.classList.add('selected');
          selected = +el.dataset.idx;
        });
      });
    };

    const move = (dir) => {
      const items = results.querySelectorAll('.cmd-item');
      if (!items.length) return;
      items[selected]?.classList.remove('selected');
      selected = (selected + dir + items.length) % items.length;
      items[selected]?.classList.add('selected');
      items[selected]?.scrollIntoView({ block: 'nearest' });
    };

    const openSelected = () => {
      const item = results.querySelectorAll('.cmd-item')[selected];
      if (item) { item.click(); Brain.closePalette(); }
    };

    input.addEventListener('input', () => render(input.value));
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); openSelected(); }
      else if (e.key === 'Escape') Brain.closePalette();
    });

    overlay.addEventListener('mousedown', e => {
      if (e.target === overlay) Brain.closePalette();
    });

    render('');
  },

  openPalette() {
    const overlay = document.getElementById('cmd-overlay');
    const input   = document.getElementById('cmd-input');
    if (!overlay) return;
    Brain._paletteOpen = true;
    overlay.classList.add('open');
    input.value = '';
    input.focus();
    const results = document.getElementById('cmd-results');
    results.innerHTML = '';
    // trigger render
    input.dispatchEvent(new Event('input'));
  },

  closePalette() {
    const overlay = document.getElementById('cmd-overlay');
    if (!overlay) return;
    Brain._paletteOpen = false;
    overlay.classList.remove('open');
  }
};

// Auto-set date on load
document.addEventListener('DOMContentLoaded', () => Brain.setDate());
