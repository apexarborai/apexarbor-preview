/**
 * APEX ARBOR — Main JS
 * Scroll reveal, smooth scroll, utility functions
 */

// ─── Scroll Reveal ────────────────────────────────────────────────
const RevealController = (() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  function init() {
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
  }

  return { init };
})();

// ─── Smooth Anchor Scroll ─────────────────────────────────────────
function initAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
      const offset = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });
}

// ─── SVG Pulse Animation Enhancement ─────────────────────────────
function initMapPulse() {
  // Already handled via CSS, but add transform-origin fix
  document.querySelectorAll('.pulse').forEach(el => {
    el.style.transformOrigin = `${el.getAttribute('cx')}px ${el.getAttribute('cy')}px`;
  });
}

// ─── Init All ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  RevealController.init();
  initAnchorScroll();
  initMapPulse();
});
