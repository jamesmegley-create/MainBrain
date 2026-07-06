/* ═══════════════════════════════════════════════════════════════
   IRONFRAME.AI — main.js
   Smooth scroll · active nav highlight · mobile hamburger · form stub
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Mobile hamburger ──────────────────────────────────────── */
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Close the menu when a link is tapped
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ── Active nav highlight on scroll ────────────────────────── */
  // Sections that have a matching nav link (#work, #services, #contact)
  const navAnchors = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'))
    .filter(a => a.getAttribute('href').length > 1 && !a.classList.contains('nav-cta'));

  const sections = navAnchors
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const byId = {};
    navAnchors.forEach(a => { byId[a.getAttribute('href').slice(1)] = a; });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const link = byId[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          navAnchors.forEach(a => a.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  /* ── Contact form (Formspree stub) ─────────────────────────── */
  // While the form still has data-stub (no Formspree endpoint yet),
  // intercept submit and show a notice instead of navigating to "#".
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', (e) => {
      if (form.hasAttribute('data-stub')) {
        e.preventDefault();
        if (status) {
          status.textContent =
            '⚠ Form not wired yet — email james@ironframe.ai directly for now.';
        }
        return;
      }

      // Live Formspree path: AJAX submit so the visitor never leaves the page
      e.preventDefault();
      const data = new FormData(form);
      if (status) status.textContent = 'Sending…';

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
        .then(res => {
          if (res.ok) {
            form.reset();
            if (status) status.textContent = "✓ Sent. I'll get back to you within 24 hours.";
          } else {
            if (status) status.textContent = '✗ Something broke — email james@ironframe.ai instead.';
          }
        })
        .catch(() => {
          if (status) status.textContent = '✗ Network error — email james@ironframe.ai instead.';
        });
    });
  }

  /* ── Calendly placeholder notice ───────────────────────────── */
  // Every "Book a Call" CTA carries data-calendly and currently points
  // at #contact. Once a real Calendly URL is set on the hrefs, this
  // handler becomes inert (it only fires for hash links).
  document.querySelectorAll('[data-calendly]').forEach(el => {
    el.addEventListener('click', () => {
      const href = el.getAttribute('href') || '';
      if (href.startsWith('#') && status) {
        status.textContent = '⚠ Calendly not wired yet — use the form or email for now.';
      }
    });
  });

})();
