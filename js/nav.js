/**
 * APEX ARBOR — Navigation JS
 * Scrolled state, active links, mobile menu
 */

const NavController = (() => {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.navbar__mobile-link');
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.navbar__link');

  /* Scrolled state */
  function updateScrolled() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }

  /* Active section highlight */
  function updateActive() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  /* Mobile menu toggle */
  function toggleMenu(force) {
    const isOpen = typeof force !== 'undefined' ? force : !mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function bindEvents() {
    window.addEventListener('scroll', () => { updateScrolled(); updateActive(); }, { passive: true });

    hamburger.addEventListener('click', () => toggleMenu());

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) toggleMenu(false);
    });
  }

  return { init: () => { updateScrolled(); updateActive(); bindEvents(); } };
})();

document.addEventListener('DOMContentLoaded', () => NavController.init());
