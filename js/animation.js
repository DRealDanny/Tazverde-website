/* ══════════════════════════════════════════════════════════════════════════════
   TAZVERDE LTD — GSAP ANIMATION SYSTEM
   Built by: Creativo
   ──────────────────────────────────────────────────────────────────────────────
   Libraries required (add to each HTML page before this script):
     <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
     <script src="js/animation.js"></script>
   ──────────────────────────────────────────────────────────────────────────────
   Animation philosophy:
     · Purposeful — every animation serves the layout, not the other way around
     · Restrained — subtle motion, nothing flashy or distracting
     · Scroll-aware — triggered as sections enter the viewport
     · Device-aware — reduced distances on mobile, full motion on desktop
     · Accessible — fully disabled for users who prefer reduced motion
   ──────────────────────────────────────────────────────────────────────────────
   Pages covered:
     index.html  ·  about.html  ·  products.html  ·  contact.html
   ══════════════════════════════════════════════════════════════════════════════ */


/* ─── 0. SETUP ──────────────────────────────────────────────────────────────── */

/* Register GSAP plugins */
gsap.registerPlugin(ScrollTrigger);


/* ─── 1. RESPECT SYSTEM PREFERENCE — prefers-reduced-motion ─────────────────── */
/* If the user has requested reduced motion in their OS settings,
   we skip all animations entirely. This is a WCAG 2.1 requirement. */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  /* Nothing to run — exit the script completely */
  console.log('[TazVerde Animations] Reduced motion preference detected — animations disabled.');
} else {

  /* ─── 2. DEVICE DETECTION ─────────────────────────────────────────────────── */
  /* We adjust animation distances based on screen width.
     Mobile users get smaller translate values for a lighter feel. */
  const isMobile  = window.innerWidth <= 767;
  const isTablet  = window.innerWidth > 767 && window.innerWidth <= 1024;
  const isDesktop = window.innerWidth > 1024;

  /* Translate Y distance: desktop full motion, tablet medium, mobile subtle */
  const yFull   = isDesktop ? 45 : isTablet ? 30 : 20;  /* Large block reveals */
  const yMid    = isDesktop ? 30 : isTablet ? 20 : 14;  /* Standard reveals */
  const ySmall  = isDesktop ? 18 : isTablet ? 12 : 8;   /* Subtle nudges */

  /* Translate X distance for horizontal slides */
  const xFull   = isDesktop ? 50 : isTablet ? 35 : 22;


  /* ─── 3. UTILITY — SCROLL TRIGGER DEFAULTS ────────────────────────────────── */
  /* A reusable config object so we don't repeat ourselves.
     "top 88%" means the animation fires when the top of the
     element reaches 88% down from the top of the viewport. */
  const ST = {
    standard : { start: 'top 88%', toggleActions: 'play none none none' },
    early    : { start: 'top 92%', toggleActions: 'play none none none' },
    mid      : { start: 'top 80%', toggleActions: 'play none none none' },
  };

  /* Default ease & duration */
  const ease     = 'power2.out';
  const easeSoft = 'power1.out';
  const easeHero = 'power3.out';
  const dur      = 0.75;
  const durFast  = 0.5;
  const durSlow  = 1.0;


  /* ─── 4. UTILITY — SAFE QUERY ─────────────────────────────────────────────── */
  /* Runs an animation only if the target element(s) exist on the current page.
     Prevents console errors when a class doesn't exist on a given page. */
  function animateIf(selector, callback) {
    const els = document.querySelectorAll(selector);
    if (els.length > 0) callback(els);
  }


  /* ═══════════════════════════════════════════════════════════════════════════
     ██  SECTION A — NAVIGATION
         Slides in from the top on every page load.
     ═══════════════════════════════════════════════════════════════════════════ */

  animateIf('nav', () => {
    gsap.from('nav', {
      y        : -70,          /* Slide down from 70px above its final position */
      opacity  : 0,            /* Start invisible */
      duration : 0.7,          /* Quick, snappy reveal */
      ease     : easeHero,     /* Power3 for a confident entrance */
      delay    : 0.1,          /* Tiny delay so it doesn't fire before the page renders */
    });
  });

  /* Logo mark — a subtle scale-in inside the nav entrance */
  animateIf('.logo-mark', () => {
    gsap.from('.logo-mark', {
      scale    : 0.6,
      opacity  : 0,
      duration : 0.6,
      ease     : 'back.out(1.6)',  /* Slight overshoot for personality */
      delay    : 0.35,             /* Fires just after the nav arrives */
    });
  });

  /* Nav links — stagger in after the nav bar itself lands */
  animateIf('.nav-links a', () => {
    gsap.from('.nav-links a', {
      y        : -12,
      opacity  : 0,
      duration : 0.45,
      ease     : easeSoft,
      stagger  : 0.07,   /* Each link delays by 70ms after the previous */
      delay    : 0.45,
    });
  });


  /* ═══════════════════════════════════════════════════════════════════════════
     ██  SECTION B — HERO (INDEX PAGE)
         index.html only. Hero animations play on load (no scroll trigger).
     ═══════════════════════════════════════════════════════════════════════════ */

  animateIf('.hero', () => {

    /* Create a GSAP timeline so animations run in sequence */
    const heroTL = gsap.timeline({ delay: 0.55 });

    /* 1. Hero tag badge — slides down from above */
    heroTL.from('.hero-tag', {
      y        : -16,
      opacity  : 0,
      duration : durFast,
      ease     : ease,
    });

    /* 2. Hero headline — each word lifts up with a stagger.
          We animate the whole h1 block cleanly since SplitText
          is a premium plugin. A simple fromTo keeps things readable. */
    heroTL.from('.slide.active h1', {
      y        : yMid,
      opacity  : 0,
      duration : durSlow,
      ease     : easeHero,
    }, '-=0.2');   /* Overlap slightly with the previous animation */

    /* 3. Hero sub-paragraph */
    heroTL.from('.slide.active .hero-sub', {
      y        : ySmall,
      opacity  : 0,
      duration : dur,
      ease     : ease,
    }, '-=0.55');

    /* 4. Hero buttons — stagger left and right */
    heroTL.from('.slide.active .hero-btns a', {
      y        : ySmall,
      opacity  : 0,
      duration : durFast,
      ease     : ease,
      stagger  : 0.12,
    }, '-=0.4');

    /* 5. Hero image slider — only visible on desktop, floats in from the right.
          We check visibility since it's hidden on mobile/tablet. */
    animateIf('.hero-image-slider', (els) => {
      if (window.getComputedStyle(els[0]).display !== 'none') {
        heroTL.from('.hero-image-slider', {
          x        : xFull,
          opacity  : 0,
          duration : 1.1,
          ease     : easeHero,
        }, '-=0.9');   /* Overlaps significantly — arrives as the text settles */
      }
    });

    /* 6. Carousel dots — a final subtle fade in */
    heroTL.from('.carousel-dots', {
      opacity  : 0,
      duration : 0.4,
      ease     : easeSoft,
    }, '-=0.3');

  });


  /* ═══════════════════════════════════════════════════════════════════════════
     ██  SECTION C — ABOUT PAGE HERO
         about.html only. Same load-on-enter approach as the index hero.
     ═══════════════════════════════════════════════════════════════════════════ */

  animateIf('.about-hero', () => {

    const aboutHeroTL = gsap.timeline({ delay: 0.55 });

    /* 1. Section label badge */
    aboutHeroTL.from('.about-hero .section-label', {
      y        : -14,
      opacity  : 0,
      duration : durFast,
      ease     : ease,
    });

    /* 2. Main headline */
    aboutHeroTL.from('.about-hero h1', {
      y        : yMid,
      opacity  : 0,
      duration : durSlow,
      ease     : easeHero,
    }, '-=0.15');

    /* 3. Paragraph */
    aboutHeroTL.from('.about-hero p', {
      y        : ySmall,
      opacity  : 0,
      duration : dur,
      ease     : ease,
    }, '-=0.5');

    /* 4. Trust bar items — stagger left to right */
    aboutHeroTL.from('.trust-item', {
      y        : ySmall,
      opacity  : 0,
      duration : durFast,
      ease     : ease,
      stagger  : 0.15,
    }, '-=0.35');

    /* 5. About hero image — floats in from the right.
          Only runs if visible (hidden on mobile & tablet). */
    animateIf('.about-hero-image', (els) => {
      if (window.getComputedStyle(els[0]).display !== 'none') {
        aboutHeroTL.from('.about-hero-image', {
          x        : xFull,
          opacity  : 0,
          duration : 1.0,
          ease     : easeHero,
        }, '-=1.0');
      }
    });

  });


  /* ═══════════════════════════════════════════════════════════════════════════
     ██  SECTION D — PRODUCTS PAGE HERO
         products.html only.
     ═══════════════════════════════════════════════════════════════════════════ */

  animateIf('.products-hero', () => {

    const prodHeroTL = gsap.timeline({ delay: 0.55 });

    prodHeroTL.from('.products-hero .section-label', {
      y        : -14,
      opacity  : 0,
      duration : durFast,
      ease     : ease,
    });

    prodHeroTL.from('.products-hero h1', {
      y        : yMid,
      opacity  : 0,
      duration : durSlow,
      ease     : easeHero,
    }, '-=0.15');

    prodHeroTL.from('.products-hero p', {
      y        : ySmall,
      opacity  : 0,
      duration : dur,
      ease     : ease,
    }, '-=0.5');

  });


  /* ═══════════════════════════════════════════════════════════════════════════
     ██  SECTION E — CONTACT PAGE HERO
         contact.html only.
     ═══════════════════════════════════════════════════════════════════════════ */

  animateIf('.contact-hero', () => {

    const contactHeroTL = gsap.timeline({ delay: 0.55 });

    contactHeroTL.from('.contact-hero .section-label', {
      y        : -14,
      opacity  : 0,
      duration : durFast,
      ease     : ease,
    });

    contactHeroTL.from('.contact-hero h1', {
      y        : yMid,
      opacity  : 0,
      duration : durSlow,
      ease     : easeHero,
    }, '-=0.15');

    contactHeroTL.from('.contact-hero p', {
      y        : ySmall,
      opacity  : 0,
      duration : dur,
      ease     : ease,
    }, '-=0.5');

  });


  /* ═══════════════════════════════════════════════════════════════════════════
     ██  SECTION F — WHO WE ARE (Index Page)
         Two-column image + text section. The image enters from the left,
         the text block enters from the right — a split reveal effect.
     ═══════════════════════════════════════════════════════════════════════════ */

  animateIf('.who-grid', () => {

    /* Image column — slides in from the left */
    gsap.from('.who-image', {
      x             : -xFull,
      opacity       : 0,
      duration      : durSlow,
      ease          : easeHero,
      scrollTrigger : { ...ST.standard, trigger: '.who-grid' },
    });

    /* 2024 badge — pops in with a bounce slightly after the image */
    gsap.from('.who-image-badge', {
      scale         : 0.5,
      opacity       : 0,
      duration      : 0.6,
      ease          : 'back.out(1.5)',
      delay         : 0.3,
      scrollTrigger : { ...ST.standard, trigger: '.who-grid' },
    });

    /* Section label + title — text column enters from the right */
    gsap.from('.who-grid .section-label', {
      x             : xFull,
      opacity       : 0,
      duration      : dur,
      ease          : ease,
      scrollTrigger : { ...ST.standard, trigger: '.who-grid' },
    });

    gsap.from('.who-grid .section-title', {
      x             : xFull,
      opacity       : 0,
      duration      : durSlow,
      ease          : easeHero,
      delay         : 0.1,
      scrollTrigger : { ...ST.standard, trigger: '.who-grid' },
    });

    /* Description paragraphs — fade up after the headline */
    gsap.from('.who-grid .section-desc', {
      y             : ySmall,
      opacity       : 0,
      duration      : dur,
      ease          : ease,
      stagger       : 0.12,
      delay         : 0.2,
      scrollTrigger : { ...ST.standard, trigger: '.who-grid' },
    });

    /* Feature list — each item staggers in */
    gsap.from('.who-feature', {
      y             : ySmall,
      opacity       : 0,
      duration      : durFast,
      ease          : ease,
      stagger       : 0.09,
      delay         : 0.35,
      scrollTrigger : { ...ST.standard, trigger: '.who-features' },
    });

    /* CTA button inside the who section */
    gsap.from('.who-grid .btn-primary', {
      y             : ySmall,
      opacity       : 0,
      duration      : durFast,
      ease          : ease,
      delay         : 0.5,
      scrollTrigger : { ...ST.standard, trigger: '.who-features' },
    });

  });


  /* ═══════════════════════════════════════════════════════════════════════════
     ██  SECTION G — PRODUCTS PREVIEW (Index Page)
         Section header floats in, then product cards cascade in a wave.
     ═══════════════════════════════════════════════════════════════════════════ */

  animateIf('.products-preview', () => {

    /* Section header — label + title stagger down, button stagger in */
    gsap.from('.products-preview .section-label', {
      y             : ySmall,
      opacity       : 0,
      duration      : durFast,
      ease          : ease,
      scrollTrigger : { ...ST.standard, trigger: '.products-preview' },
    });

    gsap.from('.products-preview .section-title', {
      y             : yMid,
      opacity       : 0,
      duration      : dur,
      ease          : easeHero,
      delay         : 0.1,
      scrollTrigger : { ...ST.standard, trigger: '.products-preview' },
    });

    gsap.from('.products-preview .btn-outline', {
      y             : ySmall,
      opacity       : 0,
      duration      : durFast,
      ease          : ease,
      delay         : 0.2,
      scrollTrigger : { ...ST.standard, trigger: '.products-preview' },
    });

    /* Product cards — a staggered cascade across the grid.
       Each card lifts up and fades in, left-to-right, row-by-row. */
    gsap.from('.prod-card', {
      y             : yMid,
      opacity       : 0,
      duration      : dur,
      ease          : ease,
      stagger       : {
        amount      : 0.6,   /* Total time spread across all 8 cards = 0.6s total stagger */
        from        : 'start',
      },
      scrollTrigger : { ...ST.standard, trigger: '.prod-grid' },
    });

    /* Product icons — a subtle scale-in inside each card */
    gsap.from('.prod-icon', {
      scale         : 0.7,
      opacity       : 0,
      duration      : 0.5,
      ease          : 'back.out(1.3)',
      stagger       : {
        amount      : 0.5,
        from        : 'start',
      },
      delay         : 0.2,
      scrollTrigger : { ...ST.standard, trigger: '.prod-grid' },
    });

  });


  /* ═══════════════════════════════════════════════════════════════════════════
     ██  SECTION H — WHY CHOOSE US (Index Page)
         Section header centered reveal, then 4 cards stagger in.
     ═══════════════════════════════════════════════════════════════════════════ */

  animateIf('.why-grid', () => {

    /* Header above the grid */
    gsap.from('.why-grid ~ *', {   /* fallback — handle if the selector doesn't catch */
      y             : ySmall,
      opacity       : 0,
      duration      : durFast,
      ease          : ease,
      scrollTrigger : { ...ST.standard, trigger: '.why-grid' },
    });

    /* The centered title block above the cards */
    gsap.from('.section-inner > div[style*="text-align:center"] .section-label', {
      y             : ySmall,
      opacity       : 0,
      duration      : durFast,
      ease          : ease,
      scrollTrigger : { ...ST.standard, trigger: '.why-grid' },
    });

    gsap.from('.section-inner > div[style*="text-align:center"] .section-title', {
      y             : yMid,
      opacity       : 0,
      duration      : dur,
      ease          : easeHero,
      delay         : 0.1,
      scrollTrigger : { ...ST.standard, trigger: '.why-grid' },
    });

    /* The 4 why-cards — stagger with a gentle lift */
    gsap.from('.why-card', {
      y             : yFull,
      opacity       : 0,
      duration      : dur,
      ease          : ease,
      stagger       : 0.13,
      scrollTrigger : { ...ST.standard, trigger: '.why-grid' },
    });

    /* Icons inside the why-cards — scale in with bounce after the cards arrive */
    gsap.from('.why-icon', {
      scale         : 0.5,
      opacity       : 0,
      duration      : 0.45,
      ease          : 'back.out(1.8)',
      stagger       : 0.13,
      delay         : 0.25,
      scrollTrigger : { ...ST.standard, trigger: '.why-grid' },
    });

  });


  /* ═══════════════════════════════════════════════════════════════════════════
     ██  SECTION I — CTA BANNER (All Pages)
         The gold call-to-action strip. Headline scales slightly in,
         paragraph fades, button lifts up last.
     ═══════════════════════════════════════════════════════════════════════════ */

  animateIf('.cta-banner', () => {

    /* CTA headline — a subtle scale from 95% for a "pop" effect */
    gsap.from('.cta-banner h2', {
      y             : yMid,
      opacity       : 0,
      scale         : 0.97,
      duration      : dur,
      ease          : easeHero,
      scrollTrigger : { ...ST.standard, trigger: '.cta-banner' },
    });

    /* Supporting paragraph */
    gsap.from('.cta-banner p', {
      y             : ySmall,
      opacity       : 0,
      duration      : durFast,
      ease          : ease,
      delay         : 0.15,
      scrollTrigger : { ...ST.standard, trigger: '.cta-banner' },
    });

    /* CTA button — lifts up last with a slight delay */
    gsap.from('.btn-dark', {
      y             : ySmall,
      opacity       : 0,
      duration      : durFast,
      ease          : ease,
      delay         : 0.3,
      scrollTrigger : { ...ST.standard, trigger: '.cta-banner' },
    });

  });


  /* ═══════════════════════════════════════════════════════════════════════════
     ██  SECTION J — FOOTER (All Pages)
         Footer columns cascade in, bottom row fades last.
     ═══════════════════════════════════════════════════════════════════════════ */

  animateIf('footer', () => {

    /* Footer brand / tagline column */
    gsap.from('footer .footer-brand', {
      y             : ySmall,
      opacity       : 0,
      duration      : dur,
      ease          : ease,
      scrollTrigger : { ...ST.standard, trigger: 'footer' },
    });

    gsap.from('footer .footer-desc', {
      y             : ySmall,
      opacity       : 0,
      duration      : durFast,
      ease          : ease,
      delay         : 0.1,
      scrollTrigger : { ...ST.standard, trigger: 'footer' },
    });

    /* Footer navigation columns — stagger left to right */
    gsap.from('.footer-col', {
      y             : ySmall,
      opacity       : 0,
      duration      : dur,
      ease          : ease,
      stagger       : 0.1,
      delay         : 0.15,
      scrollTrigger : { ...ST.standard, trigger: 'footer' },
    });

    /* Footer bottom row — copyright and badge */
    gsap.from('.footer-bottom', {
      y             : ySmall,
      opacity       : 0,
      duration      : durFast,
      ease          : ease,
      delay         : 0.4,
      scrollTrigger : { ...ST.standard, trigger: 'footer' },
    });

  });


  /* ═══════════════════════════════════════════════════════════════════════════
     ██  SECTION K — ABOUT BODY (about.html)
         Our Story text slides in from left, MVV cards slide in from right.
     ═══════════════════════════════════════════════════════════════════════════ */

  animateIf('.about-body', () => {

    /* Section label + title in the story column */
    gsap.from('.about-text .section-label', {
      x             : -xFull,
      opacity       : 0,
      duration      : durFast,
      ease          : ease,
      scrollTrigger : { ...ST.standard, trigger: '.about-grid' },
    });

    gsap.from('.about-text .section-title', {
      x             : -xFull,
      opacity       : 0,
      duration      : durSlow,
      ease          : easeHero,
      delay         : 0.1,
      scrollTrigger : { ...ST.standard, trigger: '.about-grid' },
    });

    /* Story paragraphs — fade up in sequence */
    gsap.from('.about-text p', {
      y             : ySmall,
      opacity       : 0,
      duration      : dur,
      ease          : ease,
      stagger       : 0.1,
      delay         : 0.25,
      scrollTrigger : { ...ST.standard, trigger: '.about-grid' },
    });

    /* MVV cards — slide in from the right, staggered */
    gsap.from('.mvv-card', {
      x             : xFull,
      opacity       : 0,
      duration      : dur,
      ease          : easeHero,
      stagger       : 0.18,
      scrollTrigger : { ...ST.standard, trigger: '.mvv-grid' },
    });

    /* MVV label inside each card — tiny slide up after card arrives */
    gsap.from('.mvv-label', {
      y             : 8,
      opacity       : 0,
      duration      : durFast,
      ease          : ease,
      stagger       : 0.18,
      delay         : 0.3,
      scrollTrigger : { ...ST.standard, trigger: '.mvv-grid' },
    });

  });


  /* ═══════════════════════════════════════════════════════════════════════════
     ██  SECTION L — VALUES SECTION (about.html)
         Dark green section. Title reveals, then paragraphs fade in.
     ═══════════════════════════════════════════════════════════════════════════ */

  animateIf('.values-section', () => {

    gsap.from('.values-section .section-label', {
      y             : ySmall,
      opacity       : 0,
      duration      : durFast,
      ease          : ease,
      scrollTrigger : { ...ST.standard, trigger: '.values-section' },
    });

    gsap.from('.values-section .section-title', {
      y             : yMid,
      opacity       : 0,
      duration      : durSlow,
      ease          : easeHero,
      delay         : 0.1,
      scrollTrigger : { ...ST.standard, trigger: '.values-section' },
    });

    gsap.from('.values-text', {
      y             : ySmall,
      opacity       : 0,
      duration      : dur,
      ease          : ease,
      stagger       : 0.15,
      delay         : 0.25,
      scrollTrigger : { ...ST.standard, trigger: '.values-section' },
    });

  });


  /* ═══════════════════════════════════════════════════════════════════════════
     ██  SECTION M — PURITY SECTION (about.html)
         Text block slides from left, image slides from right.
         Then "What Sets Us Apart" cards cascade.
     ═══════════════════════════════════════════════════════════════════════════ */

  animateIf('.purity-section', () => {

    /* Purity text — left to right */
    gsap.from('.purity-grid > div:first-child .section-label', {
      x             : -xFull,
      opacity       : 0,
      duration      : durFast,
      ease          : ease,
      scrollTrigger : { ...ST.standard, trigger: '.purity-grid' },
    });

    gsap.from('.purity-grid > div:first-child .section-title', {
      x             : -xFull,
      opacity       : 0,
      duration      : durSlow,
      ease          : easeHero,
      delay         : 0.1,
      scrollTrigger : { ...ST.standard, trigger: '.purity-grid' },
    });

    gsap.from('.purity-grid > div:first-child .section-desc', {
      y             : ySmall,
      opacity       : 0,
      duration      : dur,
      ease          : ease,
      stagger       : 0.12,
      delay         : 0.25,
      scrollTrigger : { ...ST.standard, trigger: '.purity-grid' },
    });

    /* Purity image — right to left */
    gsap.from('.purity-image', {
      x             : xFull,
      opacity       : 0,
      duration      : durSlow,
      ease          : easeHero,
      scrollTrigger : { ...ST.standard, trigger: '.purity-grid' },
    });

    /* "What Sets Us Apart" heading */
    gsap.from('.apart-grid ~ *', {
      y             : ySmall,
      opacity       : 0,
      duration      : durFast,
      ease          : ease,
      scrollTrigger : { ...ST.standard, trigger: '.apart-grid' },
    });

    /* The section label + title directly above apart-grid */
    gsap.from('.purity-section .section-inner > div:last-child .section-label', {
      y             : ySmall,
      opacity       : 0,
      duration      : durFast,
      ease          : ease,
      scrollTrigger : { ...ST.mid, trigger: '.apart-grid' },
    });

    gsap.from('.purity-section .section-inner > div:last-child .section-title', {
      y             : yMid,
      opacity       : 0,
      duration      : dur,
      ease          : easeHero,
      delay         : 0.1,
      scrollTrigger : { ...ST.mid, trigger: '.apart-grid' },
    });

    /* Apart cards — stagger in from bottom */
    gsap.from('.apart-card', {
      y             : yFull,
      opacity       : 0,
      duration      : dur,
      ease          : ease,
      stagger       : 0.15,
      scrollTrigger : { ...ST.standard, trigger: '.apart-grid' },
    });

    /* Decorative numbers (01, 02, 03) — scale in after cards */
    gsap.from('.apart-num', {
      scale         : 0.6,
      opacity       : 0,
      duration      : 0.5,
      ease          : 'back.out(1.3)',
      stagger       : 0.15,
      delay         : 0.2,
      scrollTrigger : { ...ST.standard, trigger: '.apart-grid' },
    });

  });


  /* ═══════════════════════════════════════════════════════════════════════════
     ██  SECTION N — PRODUCT CARDS GRID (products.html)
         12 product cards cascade in with a smooth wave pattern.
     ═══════════════════════════════════════════════════════════════════════════ */

  animateIf('.products-grid', () => {

    /* Product cards — wave cascade across the 3-col (or 2-col on tablet) grid */
    gsap.from('.product-card', {
      y             : yFull,
      opacity       : 0,
      duration      : dur,
      ease          : ease,
      stagger       : {
        amount      : 0.9,   /* Spread evenly across all 12 cards */
        from        : 'start',
      },
      scrollTrigger : { ...ST.standard, trigger: '.products-grid' },
    });

    /* Product images — subtle scale-in inside each card */
    gsap.from('.product-img', {
      scale         : 0.9,
      opacity       : 0,
      duration      : 0.6,
      ease          : 'power1.out',
      stagger       : {
        amount      : 0.9,
        from        : 'start',
      },
      delay         : 0.15,
      scrollTrigger : { ...ST.standard, trigger: '.products-grid' },
    });

    /* Product names — slide up inside each card */
    gsap.from('.product-name', {
      y             : 12,
      opacity       : 0,
      duration      : 0.5,
      ease          : ease,
      stagger       : {
        amount      : 0.9,
        from        : 'start',
      },
      delay         : 0.3,
      scrollTrigger : { ...ST.standard, trigger: '.products-grid' },
    });

    /* "View Details" links — subtle fade at the end */
    gsap.from('.product-link', {
      y             : 8,
      opacity       : 0,
      duration      : 0.4,
      ease          : easeSoft,
      stagger       : {
        amount      : 0.9,
        from        : 'start',
      },
      delay         : 0.4,
      scrollTrigger : { ...ST.standard, trigger: '.products-grid' },
    });

  });


  /* ═══════════════════════════════════════════════════════════════════════════
     ██  SECTION O — CONTACT PAGE FORM & INFO (contact.html)
         Form slides in from the left. Info cards stagger in from the right.
     ═══════════════════════════════════════════════════════════════════════════ */

  animateIf('.contact-section', () => {

    /* Contact form block */
    gsap.from('.contact-form', {
      x             : -xFull,
      opacity       : 0,
      duration      : durSlow,
      ease          : easeHero,
      scrollTrigger : { ...ST.standard, trigger: '.contact-grid' },
    });

    /* Individual form groups — stagger upward inside the form */
    gsap.from('.form-group', {
      y             : ySmall,
      opacity       : 0,
      duration      : durFast,
      ease          : ease,
      stagger       : 0.08,
      delay         : 0.2,
      scrollTrigger : { ...ST.standard, trigger: '.contact-grid' },
    });

    /* Contact info cards — slide in from the right */
    gsap.from('.contact-info-card', {
      x             : xFull,
      opacity       : 0,
      duration      : dur,
      ease          : easeHero,
      stagger       : 0.15,
      scrollTrigger : { ...ST.standard, trigger: '.contact-grid' },
    });

    /* Region tags — stagger in after the form */
    gsap.from('.region-tag', {
      scale         : 0.85,
      opacity       : 0,
      duration      : 0.4,
      ease          : 'back.out(1.2)',
      stagger       : 0.05,
      delay         : 0.5,
      scrollTrigger : { ...ST.standard, trigger: '.contact-grid' },
    });

  });


  /* ═══════════════════════════════════════════════════════════════════════════
     ██  SECTION P — HOVER MICRO-INTERACTIONS
         Small, satisfying responses to pointer hover.
         These run on desktop only — touch devices skip them.
     ═══════════════════════════════════════════════════════════════════════════ */

  if (isDesktop) {

    /* ── Product Preview Cards (index.html) ── */
    animateIf('.prod-card', (cards) => {
      cards.forEach(card => {

        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y        : -5,           /* Lift 5px */
            duration : 0.25,
            ease     : 'power1.out',
          });
          /* Icon spins slightly on hover */
          gsap.to(card.querySelector('.prod-icon'), {
            rotation : 6,
            scale    : 1.08,
            duration : 0.3,
            ease     : 'power1.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y        : 0,
            duration : 0.3,
            ease     : 'power1.inOut',
          });
          gsap.to(card.querySelector('.prod-icon'), {
            rotation : 0,
            scale    : 1,
            duration : 0.3,
            ease     : 'power1.inOut',
          });
        });

      });
    });

    /* ── Why Cards (index.html) ── */
    animateIf('.why-card', (cards) => {
      cards.forEach(card => {

        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y        : -6,
            duration : 0.25,
            ease     : 'power1.out',
          });
          gsap.to(card.querySelector('.why-icon'), {
            scale    : 1.12,
            duration : 0.3,
            ease     : 'back.out(1.5)',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y        : 0,
            duration : 0.3,
            ease     : 'power1.inOut',
          });
          gsap.to(card.querySelector('.why-icon'), {
            scale    : 1,
            duration : 0.3,
            ease     : 'power1.inOut',
          });
        });

      });
    });

    /* ── Product Cards (products.html) ── */
    animateIf('.product-card', (cards) => {
      cards.forEach(card => {

        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y        : -7,
            duration : 0.28,
            ease     : 'power1.out',
          });
          /* Subtle image zoom inside the card */
          const img = card.querySelector('.product-img img');
          if (img) {
            gsap.to(img, {
              scale    : 1.04,
              duration : 0.4,
              ease     : 'power1.out',
            });
          }
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y        : 0,
            duration : 0.35,
            ease     : 'power1.inOut',
          });
          const img = card.querySelector('.product-img img');
          if (img) {
            gsap.to(img, {
              scale    : 1,
              duration : 0.4,
              ease     : 'power1.inOut',
            });
          }
        });

      });
    });

    /* ── Apart Cards (about.html) ── */
    animateIf('.apart-card', (cards) => {
      cards.forEach(card => {

        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y        : -5,
            duration : 0.25,
            ease     : 'power1.out',
          });
          /* Number grows slightly on hover */
          gsap.to(card.querySelector('.apart-num'), {
            scale    : 1.08,
            color    : 'var(--gold)',
            duration : 0.3,
            ease     : 'power1.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y        : 0,
            duration : 0.3,
            ease     : 'power1.inOut',
          });
          gsap.to(card.querySelector('.apart-num'), {
            scale    : 1,
            color    : '',   /* Revert to original CSS color */
            duration : 0.3,
            ease     : 'power1.inOut',
          });
        });

      });
    });

    /* ── MVV Cards (about.html) ── */
    animateIf('.mvv-card', (cards) => {
      cards.forEach(card => {

        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y        : -4,
            duration : 0.25,
            ease     : 'power1.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y        : 0,
            duration : 0.3,
            ease     : 'power1.inOut',
          });
        });

      });
    });

    /* ── Primary & Outline Buttons — subtle lift on hover ── */
    animateIf('.btn-primary, .btn-outline, .btn-dark', (btns) => {
      btns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
          gsap.to(btn, { y: -2, duration: 0.2, ease: 'power1.out' });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { y: 0, duration: 0.25, ease: 'power1.inOut' });
        });
      });
    });

  }


  /* ═══════════════════════════════════════════════════════════════════════════
     ██  SECTION Q — MOBILE / TABLET SCROLL TRIGGER REFRESH
         On devices that may have dynamic height changes (mobile browsers
         with address bar hide/show), we refresh ScrollTrigger positions.
     ═══════════════════════════════════════════════════════════════════════════ */

  if (isMobile || isTablet) {
    /* Refresh ScrollTrigger after page fully loads */
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });
  }


  /* ═══════════════════════════════════════════════════════════════════════════
     ██  SECTION R — NAV SCROLL BEHAVIOUR
         The nav gains a visible background on scroll. We add a subtle
         GSAP-driven opacity transition for the box-shadow/background
         rather than relying purely on CSS transitions.
     ═══════════════════════════════════════════════════════════════════════════ */

  animateIf('nav', () => {

    /* Track scroll position and apply a class that CSS can use,
       but also animate the nav's background opacity smoothly via GSAP. */
    let navScrolled = false;

    ScrollTrigger.create({
      start  : 'top -60',   /* After scrolling 60px from the top */
      onEnter: () => {
        if (!navScrolled) {
          gsap.to('nav', {
            backgroundColor : 'rgba(14, 43, 26, 0.97)',  /* Deeper dark green */
            boxShadow       : '0 2px 24px rgba(0,0,0,0.18)',
            duration        : 0.35,
            ease            : easeSoft,
          });
          navScrolled = true;
        }
      },
      onLeaveBack: () => {
        gsap.to('nav', {
          backgroundColor : '',   /* Revert to original CSS value */
          boxShadow       : '0 1px 0 rgba(255,255,255,0.06)',
          duration        : 0.35,
          ease            : easeSoft,
        });
        navScrolled = false;
      },
    });

  });


} /* end: if (!prefersReducedMotion) */