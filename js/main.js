/**
 * APEX ARBOR — Main JS
 * Scroll reveal, smooth scroll, utility functions
 */

// ─── Hero Carousel Controller ─────────────────────────────────────
const HeroCarousel = (() => {
  /** @type {number} */
  let currentSlide = 0;
  /** @type {Element[]} */
  let slides = [];
  /** @type {Element[]} */
  let indicators = [];
  /** @type {number | null} */
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 5000;

  function init() {
    slides = Array.from(document.querySelectorAll('.carousel-slide'));
    indicators = Array.from(document.querySelectorAll('.carousel-indicators .indicator'));

    if (slides.length === 0) return;

    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const indicatorBtns = document.querySelectorAll('.carousel-indicators .indicator');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        resetAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        resetAutoplay();
      });
    }

    indicatorBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        goToSlide(index);
        resetAutoplay();
      });
    });

    startAutoplay();

    document.querySelector('.hero')?.addEventListener('mouseenter', stopAutoplay);
    document.querySelector('.hero')?.addEventListener('mouseleave', startAutoplay);
  }

  /**
   * @param {number} index
   */
  function goToSlide(index) {
    if (slides.length === 0) return;

    const totalSlides = slides.length;
    currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });

    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function resetAutoplay() {
    startAutoplay();
  }

  return { init, goToSlide, nextSlide, startAutoplay, stopAutoplay };
})();

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
    document.querySelectorAll('[data-reveal]').forEach(el => {
      if (el instanceof HTMLElement) {
        observer.observe(el);
      }
    });
  }

  return { init };
})();

// ─── Number Counter Animation ─────────────────────────────────────
const NumberCounter = (() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  /**
   * @param {HTMLElement} element
   */
  function animateCounter(element) {
    const text = element.textContent.trim();
    const hasPercent = text.includes('%');
    const hasPlus = text.includes('+');
    const hasSlash = text.includes('/');

    if (hasSlash) return;

    const numericValue = parseFloat(text.replace(/[^0-9.]/g, ''));
    if (isNaN(numericValue)) return;

    const suffix = hasPercent ? '%' : hasPlus ? '+' : '';
    const duration = 2000;
    const start = 0;
    const end = numericValue;
    const startTime = performance.now();

    /**
     * @param {number} t
     */
    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    /**
     * @param {number} currentTime
     */
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = start + (end - start) * easedProgress;

      if (numericValue % 1 === 0) {
        element.textContent = Math.floor(current) + suffix;
      } else {
        element.textContent = current.toFixed(1) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = text;
      }
    }

    requestAnimationFrame(update);
  }

  function init() {
    document.querySelectorAll('.stat-number, .why-number').forEach(el => {
      if (el instanceof HTMLElement) {
        observer.observe(el);
      }
    });
  }

  return { init };
})();

// ─── Navbar Scroll Effect ─────────────────────────────────────────
const NavbarController = (() => {
  function init() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  return { init };
})();

// ─── Card Hover Effects ───────────────────────────────────────────
const CardHoverEffects = (() => {
  function init() {
    const cards = document.querySelectorAll('.platform-card, .product-card, .why-item, .trust-item, .location-card');

    cards.forEach(card => {
      if (!(card instanceof HTMLElement)) return;
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  return { init };
})();

// ─── Button Glow Effects ──────────────────────────────────────────
const ButtonGlowEffects = (() => {
  function init() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
      if (!(btn instanceof HTMLElement)) return;
      btn.addEventListener('mouseenter', /** @param {MouseEvent} e */ ((e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const glow = document.createElement('span');
        glow.style.cssText = `
          position: absolute;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          left: ${x - 100}px;
          top: ${y - 100}px;
          transform: scale(0);
          transition: transform 0.3s ease;
        `;

        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(glow);

        requestAnimationFrame(() => {
          glow.style.transform = 'scale(1)';
        });

        setTimeout(() => {
          glow.remove();
        }, 300);
      }));
    });
  }

  return { init };
})();

// ─── Hero Particle System ─────────────────────────────────────────
const HeroParticles = (() => {
  const PARTICLE_COUNT = 50;
  const container = document.getElementById('heroParticles');
  
  if (!container) return { init: () => {} };

  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'hero-particle';
    
    const startX = Math.random() * 100;
    const duration = 15 + Math.random() * 20;
    const delay = Math.random() * 10;
    const size = 2 + Math.random() * 3;
    
    particle.style.left = `${startX}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    return particle;
  }

  function init() {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      container.appendChild(createParticle());
    }
  }

  return { init };
})();

// ─── Init All ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  HeroCarousel.init();
  RevealController.init();
  NumberCounter.init();
  NavbarController.init();
  initAnchorScroll();
  CardHoverEffects.init();
  ButtonGlowEffects.init();
  HeroParticles.init();
});
