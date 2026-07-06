/* James Brain — Shared Canvas Chart Components */
/* No external charting library. Every widget with a chart should use these instead of hand-rolling canvas code. */

const Charts = {

  _color(varName, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return v || fallback;
  },

  /* Resize a canvas for the container it lives in, DPR-aware. Returns {ctx, W, H}. */
  _prep(canvas, height) {
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.parentElement.clientWidth - 48;
    const H = height;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);
    return { ctx, W, H };
  },

  /**
   * Line/area chart with optional zero-line and gradient fill.
   * points: [{ label: string, value: number }]
   * opts: { height, color, yLabels: [[value, label], ...], zeroLine: bool, markLast: bool }
   */
  line(canvas, points, opts = {}) {
    const height = opts.height || 160;
    const { ctx, W, H } = Charts._prep(canvas, height);
    if (!points.length) return;

    const positive = Charts._color('--green', '#4caf50');
    const negative = Charts._color('--red', '#f44336');
    const gold = Charts._color('--gold', '#d4af6a');
    const gridColor = Charts._color('--border', '#2c4a6e');
    const mutedColor = Charts._color('--text-muted', '#7e93b3');

    const lastVal = points[points.length - 1].value;
    const lineColor = opts.color || (lastVal >= 0 ? positive : negative);

    const values = points.map(p => p.value);
    const dataMin = Math.min(...values, 0);
    const dataMax = Math.max(...values, 0);
    const span = (dataMax - dataMin) || 1;
    const minV = dataMin - span * 0.1;
    const maxV = dataMax + span * 0.1;

    const pad = { t: 10, r: 10, b: 30, l: opts.padLeft || 60 };
    const cw = W - pad.l - pad.r;
    const ch = H - pad.t - pad.b;

    const xp = i => pad.l + (points.length > 1 ? (i / (points.length - 1)) * cw : cw / 2);
    const yp = v => pad.t + ch - ((v - minV) / (maxV - minV)) * ch;

    if (opts.zeroLine !== false && minV < 0 && maxV > 0) {
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      const zy = yp(0);
      ctx.beginPath();
      ctx.moveTo(pad.l, zy);
      ctx.lineTo(W - pad.r, zy);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    const grad = ctx.createLinearGradient(0, pad.t, 0, H - pad.b);
    const fillBase = lineColor === positive ? '76,175,80' : lineColor === negative ? '244,67,54' : '212,175,106';
    grad.addColorStop(0, `rgba(${fillBase},0.25)`);
    grad.addColorStop(1, `rgba(${fillBase},0.02)`);

    ctx.beginPath();
    ctx.moveTo(xp(0), yp(points[0].value));
    for (let i = 1; i < points.length; i++) ctx.lineTo(xp(i), yp(points[i].value));
    ctx.lineTo(xp(points.length - 1), H - pad.b);
    ctx.lineTo(pad.l, H - pad.b);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(xp(0), yp(points[0].value));
    for (let i = 1; i < points.length; i++) ctx.lineTo(xp(i), yp(points[i].value));
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.stroke();

    if (opts.markLast !== false) {
      const lastIdx = points.length - 1;
      ctx.beginPath();
      ctx.arc(xp(lastIdx), yp(points[lastIdx].value), 4, 0, Math.PI * 2);
      ctx.fillStyle = gold;
      ctx.fill();
    }

    ctx.fillStyle = mutedColor;
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    const yLabels = opts.yLabels || Charts._autoYLabels(minV, maxV);
    yLabels.forEach(([v, lbl]) => ctx.fillText(lbl, pad.l - 6, yp(v) + 3));

    ctx.textAlign = 'left';
    ctx.fillText(points[0].label, pad.l, H - 8);
    ctx.textAlign = 'right';
    ctx.fillText(points[points.length - 1].label, W - pad.r, H - 8);
  },

  _autoYLabels(minV, maxV) {
    const steps = 4;
    const out = [];
    for (let i = 0; i <= steps; i++) {
      const v = minV + ((maxV - minV) / steps) * i;
      out.push([v, Charts._compactLabel(v)]);
    }
    return out;
  },

  _compactLabel(v) {
    const sign = v < 0 ? '-' : '';
    const abs = Math.abs(v);
    if (abs >= 1000) return `${sign}$${(abs / 1000).toFixed(1)}K`;
    return `${sign}$${abs.toFixed(0)}`;
  },

  /**
   * Vertical bar chart.
   * bars: [{ label: string, value: number, color?: string }]
   * opts: { height, barColor, gap }
   */
  bar(canvas, bars, opts = {}) {
    const height = opts.height || 140;
    const { ctx, W, H } = Charts._prep(canvas, height);
    if (!bars.length) return;

    const positive = Charts._color('--green', '#4caf50');
    const negative = Charts._color('--red', '#f44336');
    const defaultColor = Charts._color('--blue', '#5eb3ff');
    const mutedColor = Charts._color('--text-muted', '#7e93b3');
    const gridColor = Charts._color('--border', '#2c4a6e');

    const values = bars.map(b => b.value);
    const dataMin = Math.min(...values, 0);
    const dataMax = Math.max(...values, 0);
    const span = (dataMax - dataMin) || 1;
    const minV = dataMin - span * 0.05;
    const maxV = dataMax + span * 0.05;

    const pad = { t: 10, r: 10, b: 24, l: 10 };
    const cw = W - pad.l - pad.r;
    const ch = H - pad.t - pad.b;
    const gap = opts.gap ?? 6;
    const barW = (cw - gap * (bars.length - 1)) / bars.length;

    const yp = v => pad.t + ch - ((v - minV) / (maxV - minV)) * ch;
    const zy = yp(0);

    if (minV < 0 && maxV > 0) {
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad.l, zy);
      ctx.lineTo(W - pad.r, zy);
      ctx.stroke();
    }

    bars.forEach((b, i) => {
      const x = pad.l + i * (barW + gap);
      const y = yp(Math.max(b.value, 0));
      const barH = Math.abs(yp(b.value) - zy);
      const color = b.color || opts.barColor || (b.value >= 0 ? positive : negative);
      ctx.fillStyle = color;
      ctx.fillRect(x, b.value >= 0 ? y : zy, barW, barH || 1);
    });

    ctx.fillStyle = mutedColor;
    ctx.font = '9px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    const labelEvery = Math.ceil(bars.length / 12);
    bars.forEach((b, i) => {
      if (i % labelEvery !== 0 && i !== bars.length - 1) return;
      const x = pad.l + i * (barW + gap) + barW / 2;
      ctx.fillText(b.label, x, H - 6);
    });
  },

  /**
   * Donut chart with center label.
   * segments: [{ label: string, value: number, color: string }]
   * opts: { height, centerLabel, centerSub }
   */
  donut(canvas, segments, opts = {}) {
    const height = opts.height || 180;
    const { ctx, W, H } = Charts._prep(canvas, height);
    const total = segments.reduce((s, seg) => s + seg.value, 0);
    if (!total) return;

    const cx = W / 2, cy = H / 2;
    const outerR = Math.min(W, H) / 2 - 4;
    const innerR = outerR * 0.62;

    let start = -Math.PI / 2;
    segments.forEach(seg => {
      const angle = (seg.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, start, start + angle);
      ctx.arc(cx, cy, innerR, start + angle, start, true);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();
      start += angle;
    });

    if (opts.centerLabel) {
      ctx.fillStyle = Charts._color('--text-primary', '#f5f8fc');
      ctx.font = '600 16px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(opts.centerLabel, cx, cy - (opts.centerSub ? 8 : 0));
      if (opts.centerSub) {
        ctx.fillStyle = Charts._color('--text-muted', '#7e93b3');
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText(opts.centerSub, cx, cy + 12);
      }
      ctx.textBaseline = 'alphabetic';
    }
  },
};
