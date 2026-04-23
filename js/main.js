/* ═════════════════════════════════════════
   Apex Arbor v4.0 — Main JavaScript
   Progressive enhancement: content is ALWAYS visible.
   Animation only plays when JS executes.
   ═════════════════════════════════════════ */
(function () {
  'use strict';

  /* ─── 1. Mobile Menu ─── */
  var toggle = document.getElementById('mobile-toggle');
  var menu   = document.getElementById('mobile-menu');
  var icon   = document.getElementById('menu-icon');

  if (toggle && menu && icon) {
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('open');
      icon.textContent = isOpen ? 'close' : 'menu';
      toggle.setAttribute('aria-expanded', isOpen);
    });
    /* Close menu when a link is clicked */
    document.querySelectorAll('.mobile-link').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        if (icon) icon.textContent = 'menu';
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ─── 2. Navbar shadow on scroll ─── */
  var navbar = document.getElementById('navbar');
  function updateNavbarShadow() {
    if (!navbar) return;
    if (window.scrollY > 10) {
      navbar.classList.add('shadow-md');
    } else {
      navbar.classList.remove('shadow-md');
    }
  }
  window.addEventListener('scroll', updateNavbarShadow, { passive: true });
  updateNavbarShadow();

  /* ─── 3. Active nav link on scroll ─── */
  var sections  = document.querySelectorAll('section[id]');
  var navLinks  = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    var scrollPos = window.scrollY + 150;
    sections.forEach(function (section) {
      var top    = section.offsetTop;
      var height = section.offsetHeight;
      var id     = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ─── 4. Reveal-on-scroll (progressive enhancement) ───
     Strategy:
       1. Content is visible by default (no CSS hiding).
       2. JS adds `.reveal-init` immediately (hides elements).
       3. IntersectionObserver removes `.reveal-init` when
          element enters viewport → CSS transition plays.
       4. If JS never runs, content stays visible.
  ─────────────────────────────────────────────── */
  var revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0) {
    /* Step 1: add .reveal-init to hide elements (CSS will set opacity:0) */
    revealEls.forEach(function (el) {
      el.classList.add('reveal-init');
    });

    /* Step 2: IntersectionObserver — remove .reveal-init on enter */
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            /* Remove .reveal-init; CSS transition will animate to visible */
            el.classList.remove('reveal-init');
            /* Only play animation once per element */
            revealObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ─── 5. Smooth anchor scroll (offset for sticky nav) ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = 80; /* height of sticky nav */
        var top    = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
