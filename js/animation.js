/* ══════════════════════════════════════════════════════════════════════════════
   TAZVERDE — animation.js  v4
   Performance fixes applied:
     1. Wrapped in IIFE with gsap undefined guard
     2. ScrollTrigger.config({ limitCallbacks: true }) — batches DOM reads,
        prevents forced reflow (was causing 60ms penalty in PageSpeed audit)
     3. lazy: true on every ScrollTrigger.create call — stops GSAP reading
        layout inside scroll callbacks while styles are mid-update
     4. Removed window.addEventListener('load') wrapper — scripts are deferred
        so DOM is already ready when this file executes. ScrollTrigger.refresh()
        is still called on window load at the bottom for image/font reflow.
   ══════════════════════════════════════════════════════════════════════════════ */

(function () {

  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Batch DOM reads — prevents forced reflow on scroll
  ScrollTrigger.config({ limitCallbacks: true });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ─── Distances ─────────────────────────────────────────────────────────── */
  const isMobile = window.innerWidth <= 767;
  const Y_FAR    = isMobile ? 22 : 36;
  const Y_NEAR   = isMobile ? 12 : 20;
  const DUR_SLOW = 0.7;
  const DUR_MID  = 0.55;
  const DUR_FAST = 0.4;
  const EASE     = 'power2.out';

  /* ─── Helpers ────────────────────────────────────────────────────────────── */
  const get    = sel => document.querySelector(sel);
  const getAll = sel => [...document.querySelectorAll(sel)];

  function loadFrom(selector, vars) {
    const el = get(selector);
    if (!el) return;
    gsap.from(el, { ...vars, clearProps: 'opacity,transform' });
  }

  function loadFromAll(selector, vars) {
    const els = getAll(selector);
    if (!els.length) return;
    gsap.from(els, { ...vars, clearProps: 'opacity,transform' });
  }

  // All scroll triggers use onEnter callback + lazy:true
  // This stops GSAP setting opacity:0 prematurely and prevents forced reflow
  function onScroll(selector, vars, triggerSel) {
    const els     = getAll(selector);
    if (!els.length) return;
    const trigger = get(triggerSel || selector);
    if (!trigger) return;
    ScrollTrigger.create({
      trigger : trigger,
      start   : 'top 88%',
      once    : true,
      lazy    : true,                         // ← prevents forced reflow
      onEnter : () => gsap.from(els, { ...vars, clearProps: 'opacity,transform' }),
    });
  }


  /* ══════════════════════════════════════════════════════════════════════════
     NAV
  ══════════════════════════════════════════════════════════════════════════ */

  gsap.from('nav', {
    opacity: 0, y: -50, duration: 0.6, ease: EASE, clearProps: 'opacity,transform',
  });

  loadFrom('.logo-mark', {
    opacity: 0, scale: 0.55, duration: 0.5, ease: 'back.out(1.6)', delay: 0.28,
  });

  loadFromAll('.nav-links a', {
    opacity: 0, y: -8, duration: DUR_FAST, ease: EASE, stagger: 0.07, delay: 0.38,
  });

  /* ── Mobile menu link stagger ── */
  const hamburger    = get('.hamburger');
  const navContainer = get('.nav-links');

  if (hamburger && navContainer) {
    hamburger.addEventListener('click', () => {
      setTimeout(() => {
        if (navContainer.classList.contains('active')) {
          gsap.from('.nav-links a', {
            opacity: 0, y: 15, duration: 0.4, ease: 'power2.out',
            stagger: 0.06, clearProps: 'opacity,transform',
          });
        }
      }, 10);
    });
  }


  /* ══════════════════════════════════════════════════════════════════════════
     INDEX HERO
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.hero')) {

    const heroTL = gsap.timeline({ delay: 0.2 });

    heroTL
      .from('.hero-tag', { opacity: 0, y: -14, duration: DUR_FAST, ease: EASE, clearProps: 'opacity,transform' })
      .from('.slide.active h1', { opacity: 0, y: Y_FAR, duration: DUR_SLOW, ease: 'power3.out', clearProps: 'opacity,transform' }, '-=0.1')
      .from('.slide.active .hero-sub', { opacity: 0, y: Y_NEAR, duration: DUR_MID, ease: EASE, clearProps: 'opacity,transform' }, '-=0.4')
      .from('.slide.active .hero-btns a', { opacity: 0, y: Y_NEAR, duration: DUR_FAST, ease: EASE, stagger: 0.1, clearProps: 'opacity,transform' }, '-=0.3');

    if (get('.hero-image-slider') && window.innerWidth > 1024) {
      gsap.from('.hero-image-slider', {
        opacity: 0, scale: 1.05, y: 20, duration: 1.2, ease: 'power3.out',
        delay: 0.6, clearProps: 'opacity,transform',
      });
    }
  }


  /* ══════════════════════════════════════════════════════════════════════════
     ABOUT HERO
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.about-hero')) {

    const aboutTL = gsap.timeline({ delay: 0.2 });

    aboutTL
      .from('.about-hero-text .section-label', { opacity: 0, y: -12, duration: DUR_FAST, ease: EASE, clearProps: 'opacity,transform' })
      .from('.about-hero h1', { opacity: 0, y: Y_FAR, duration: DUR_SLOW, ease: 'power3.out', clearProps: 'opacity,transform' }, '-=0.1')
      .from('.about-hero-text p', { opacity: 0, y: Y_NEAR, duration: DUR_MID, ease: EASE, clearProps: 'opacity,transform' }, '-=0.4')
      .from('.trust-item', { opacity: 0, y: Y_NEAR, duration: DUR_FAST, ease: EASE, stagger: 0.12, clearProps: 'opacity,transform' }, '-=0.3');

    if (get('.about-hero-image') && window.innerWidth > 1024) {
      gsap.from('.about-hero-image', {
        opacity: 0, x: 30, duration: 1, ease: 'power2.out',
        delay: 0.8, clearProps: 'opacity,transform',
      });
    }
  }


  /* ══════════════════════════════════════════════════════════════════════════
     PRODUCTS PAGE HERO
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.products-hero')) {

    const prodHeroTL = gsap.timeline({ delay: 0.2 });

    prodHeroTL
      .from('.products-hero .section-label', { opacity: 0, y: -12, duration: DUR_FAST, ease: EASE, clearProps: 'opacity,transform' })
      .from('.products-hero h1', { opacity: 0, y: Y_FAR, duration: DUR_SLOW, ease: 'power3.out', clearProps: 'opacity,transform' }, '-=0.1')
      .from('.products-hero p', { opacity: 0, y: Y_NEAR, duration: DUR_MID, ease: EASE, clearProps: 'opacity,transform' }, '-=0.4');
  }


  /* ══════════════════════════════════════════════════════════════════════════
     CONTACT PAGE HERO
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.contact-hero')) {

    const contactHeroTL = gsap.timeline({ delay: 0.2 });

    contactHeroTL
      .from('.contact-hero .section-label', { opacity: 0, y: -12, duration: DUR_FAST, ease: EASE, clearProps: 'opacity,transform' })
      .from('.contact-hero h1', { opacity: 0, y: Y_FAR, duration: DUR_SLOW, ease: 'power3.out', clearProps: 'opacity,transform' }, '-=0.1')
      .from('.contact-hero p', { opacity: 0, y: Y_NEAR, duration: DUR_MID, ease: EASE, clearProps: 'opacity,transform' }, '-=0.4');
  }


  /* ══════════════════════════════════════════════════════════════════════════
     PRODUCTS PREVIEW — index.html
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.products-preview')) {

    onScroll('.products-preview .section-label', { opacity: 0, y: Y_NEAR, duration: DUR_FAST, ease: EASE }, '.products-preview');
    onScroll('.products-preview .section-title', { opacity: 0, y: Y_FAR, duration: DUR_MID, ease: EASE, delay: 0.08 }, '.products-preview');
    onScroll('.products-preview .btn-outline', { opacity: 0, y: Y_NEAR, duration: DUR_FAST, ease: EASE, delay: 0.14 }, '.products-preview');

    onScroll('.prod-card', {
      opacity: 0, y: Y_FAR, duration: DUR_MID, ease: EASE,
      stagger: { amount: 0.5, from: 'start' },
    }, '.prod-grid');
  }


  /* ══════════════════════════════════════════════════════════════════════════
     WHY CHOOSE US — index.html
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.why-grid')) {

    ScrollTrigger.create({
      trigger : '.why-grid',
      start   : 'top 90%',
      once    : true,
      lazy    : true,
      onEnter : () => {
        const parent = get('.why-grid')?.parentElement;
        if (!parent) return;
        const targets = [parent.querySelector('.section-label'), parent.querySelector('.section-title')].filter(Boolean);
        if (targets.length) {
          gsap.from(targets, { opacity: 0, y: Y_NEAR, duration: DUR_MID, ease: EASE, stagger: 0.1, clearProps: 'opacity,transform' });
        }
      },
    });
  }


  /* ══════════════════════════════════════════════════════════════════════════
     CTA BANNER — all pages
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.cta-banner')) {
    onScroll('.cta-banner h2',  { opacity: 0, y: Y_FAR,  duration: DUR_MID,  ease: 'power3.out' }, '.cta-banner');
    onScroll('.cta-banner p',   { opacity: 0, y: Y_NEAR, duration: DUR_FAST, ease: EASE, delay: 0.1 }, '.cta-banner');
    onScroll('.btn-dark',       { opacity: 0, y: Y_NEAR, duration: DUR_FAST, ease: EASE, delay: 0.2 }, '.cta-banner');
  }


  /* ══════════════════════════════════════════════════════════════════════════
     FOOTER — all pages
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('footer')) {
    onScroll('.footer-brand',  { opacity: 0, y: Y_NEAR, duration: DUR_FAST, ease: EASE }, 'footer');
    onScroll('.footer-desc',   { opacity: 0, y: Y_NEAR, duration: DUR_FAST, ease: EASE, delay: 0.08 }, 'footer');
    onScroll('.footer-col',    { opacity: 0, y: Y_NEAR, duration: DUR_MID,  ease: EASE, stagger: 0.09, delay: 0.14 }, '.footer-grid');
    onScroll('.footer-bottom', { opacity: 0, y: Y_NEAR, duration: DUR_FAST, ease: EASE, delay: 0.3 }, 'footer');
  }


  /* ══════════════════════════════════════════════════════════════════════════
     ABOUT BODY
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.about-body')) {
    onScroll('.about-text .section-label', { opacity: 0, y: Y_NEAR, duration: DUR_FAST, ease: EASE }, '.about-grid');
    onScroll('.about-text .section-title', { opacity: 0, y: Y_FAR,  duration: DUR_MID,  ease: 'power3.out', delay: 0.08 }, '.about-grid');
    onScroll('.about-text p',              { opacity: 0, y: Y_NEAR, duration: DUR_MID,  ease: EASE, stagger: 0.08, delay: 0.16 }, '.about-text');
    onScroll('.mvv-card',                  { opacity: 0, y: Y_FAR,  duration: DUR_MID,  ease: EASE, stagger: 0.15 }, '.mvv-grid');
  }


  /* ══════════════════════════════════════════════════════════════════════════
     VALUES SECTION
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.values-section')) {
    onScroll('.values-section .section-label', { opacity: 0, y: Y_NEAR, duration: DUR_FAST, ease: EASE }, '.values-section');
    onScroll('.values-section .section-title', { opacity: 0, y: Y_FAR,  duration: DUR_MID,  ease: 'power3.out', delay: 0.08 }, '.values-section');
    onScroll('.values-text',                   { opacity: 0, y: Y_NEAR, duration: DUR_MID,  ease: EASE, stagger: 0.1, delay: 0.16 }, '.values-section');
  }


  /* ══════════════════════════════════════════════════════════════════════════
     PURITY + WHAT SETS US APART
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.purity-section')) {
    onScroll('.purity-grid > div:first-child .section-label', { opacity: 0, y: Y_NEAR, duration: DUR_FAST, ease: EASE }, '.purity-grid');
    onScroll('.purity-grid > div:first-child .section-title', { opacity: 0, y: Y_FAR,  duration: DUR_MID,  ease: 'power3.out', delay: 0.08 }, '.purity-grid');
    onScroll('.purity-grid > div:first-child .section-desc',  { opacity: 0, y: Y_NEAR, duration: DUR_MID,  ease: EASE, stagger: 0.08, delay: 0.14 }, '.purity-grid');
    onScroll('.purity-image',                                  { opacity: 0, y: Y_NEAR, duration: DUR_MID,  ease: EASE }, '.purity-image');
    onScroll('.apart-card',                                    { opacity: 0, y: Y_FAR,  duration: DUR_MID,  ease: EASE, stagger: 0.13 }, '.apart-grid');
  }


  /* ══════════════════════════════════════════════════════════════════════════
     CONTACT SECTION
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.contact-section')) {
    onScroll('.contact-grid > div:first-child .section-label', { opacity: 0, y: Y_NEAR, duration: DUR_FAST, ease: EASE }, '.contact-grid');
    onScroll('.contact-grid > div:first-child .section-title', { opacity: 0, y: Y_FAR,  duration: DUR_MID,  ease: 'power3.out', delay: 0.08 }, '.contact-grid');
    onScroll('.form-group',                                    { opacity: 0, y: Y_NEAR, duration: DUR_FAST, ease: EASE, stagger: 0.06, delay: 0.14 }, '.contact-grid');
    onScroll('#contact-form [type="submit"]',                  { opacity: 0, y: Y_NEAR, duration: DUR_FAST, ease: EASE, delay: 0.45 }, '.contact-grid');
    onScroll('.contact-info-card',                             { opacity: 0, y: Y_FAR,  duration: DUR_MID,  ease: EASE, stagger: 0.12 }, '.contact-info');
  }


  /* ══════════════════════════════════════════════════════════════════════════
     HOVER MICRO-INTERACTIONS — desktop only
  ══════════════════════════════════════════════════════════════════════════ */

  if (window.innerWidth > 1024) {

    const hoverLift = (selector, amount) => {
      getAll(selector).forEach(el => {
        el.addEventListener('mouseenter', () => gsap.to(el, { y: -amount, duration: 0.22, ease: 'power1.out' }));
        el.addEventListener('mouseleave', () => gsap.to(el, { y: 0,       duration: 0.28, ease: 'power1.inOut' }));
      });
    };

    hoverLift('.prod-card',   5);
    hoverLift('.why-card',    5);
    hoverLift('.apart-card',  4);
    hoverLift('.mvv-card',    4);
    hoverLift('.btn-primary', 2);
    hoverLift('.btn-outline', 2);
    hoverLift('.btn-dark',    2);

    const prodGrid = document.getElementById('products-grid');
    if (prodGrid) {
      prodGrid.addEventListener('mouseover', e => {
        const card = e.target.closest('.product-card');
        if (card && !card._hovering) { card._hovering = true; gsap.to(card, { y: -6, duration: 0.22, ease: 'power1.out' }); }
      });
      prodGrid.addEventListener('mouseout', e => {
        const card = e.target.closest('.product-card');
        if (card) { card._hovering = false; gsap.to(card, { y: 0, duration: 0.28, ease: 'power1.inOut' }); }
      });
    }
  }


  /* ══════════════════════════════════════════════════════════════════════════
     SCROLL TRIGGER REFRESH
     Recalculates all trigger positions after images and fonts have loaded
  ══════════════════════════════════════════════════════════════════════════ */

  window.addEventListener('load', () => { ScrollTrigger.refresh(); });

})(); // end IIFE