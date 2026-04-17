/* ══════════════════════════════════════════════════════════════════════════════
   TAZVERDE — animation.js  v3
   Built by: Creativo
   ──────────────────────────────────────────────────────────────────────────────
   Add before </body> on every page:
     <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
     <script src="js/animation.js"></script>
   ──────────────────────────────────────────────────────────────────────────────
   Design rules that prevent breakage:
     1. NEVER animate elements with class="fade-in" — script.js already owns those
        (.who-image, second .who-grid column, all .why-card elements)
     2. NEVER touch .carousel-dots — it has style="display:none" in the HTML
     3. NEVER animate .product-card on products.html — initDatabase() in script.js
        wipes and rebuilds that grid dynamically after load
     4. ALL scroll animations use ScrollTrigger's onEnter callback, NOT gsap.from()
        with a scrollTrigger option. This stops GSAP from setting opacity:0 on
        elements before their trigger fires — which is what caused content to hide.
     5. opacity + y only. No autoAlpha, no x-slides, no scale on visible content.
     6. clearProps:"opacity,transform" on every tween so CSS stays in full control
        after the animation finishes.
   ══════════════════════════════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ─── Respect system reduced-motion preference ──────────────────────────── */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  /* Do nothing — user wants no motion */
} else {

  /* ─── Distances ─────────────────────────────────────────────────────────── */
  const isMobile = window.innerWidth <= 767;
  const Y_FAR    = isMobile ? 22 : 36;   /* Large elements — headings, cards */
  const Y_NEAR   = isMobile ? 12 : 20;   /* Small elements — labels, paragraphs */
  const DUR_SLOW = 0.7;
  const DUR_MID  = 0.55;
  const DUR_FAST = 0.4;
  const EASE     = 'power2.out';

  /* ─── Helpers ────────────────────────────────────────────────────────────── */

  /* Returns element or null — never throws */
  const get  = sel => document.querySelector(sel);
  const getAll = sel => [...document.querySelectorAll(sel)];

  /* Fade-up a single element on page load (no scroll trigger) */
  function loadFrom(selector, vars) {
    const el = get(selector);
    if (!el) return;
    gsap.from(el, { ...vars, clearProps: 'opacity,transform' });
  }

  /* Fade-up a list of elements on page load, staggered */
  function loadFromAll(selector, vars) {
    const els = getAll(selector);
    if (!els.length) return;
    gsap.from(els, { ...vars, clearProps: 'opacity,transform' });
  }

  /* Scroll-triggered fade-up — fires gsap.from INSIDE onEnter so GSAP never
     sets opacity:0 prematurely on any element before its trigger fires.       */
  function onScroll(selector, vars, triggerSel) {
    const els = getAll(selector);
    if (!els.length) return;
    const trigger = get(triggerSel || selector);
    if (!trigger) return;
    ScrollTrigger.create({
      trigger : trigger,
      start   : 'top 88%',
      once    : true,                        /* Plays once, never replays */
      onEnter : () => gsap.from(els, { ...vars, clearProps: 'opacity,transform' }),
    });
  }


  /* ══════════════════════════════════════════════════════════════════════════
     NAV — slides down from above on every page load
  ══════════════════════════════════════════════════════════════════════════ */

  gsap.from('nav', {
    opacity  : 0,
    y        : -50,
    duration : 0.6,
    ease     : EASE,
    clearProps: 'opacity,transform',
  });

  /* Logo mark pops in after the bar lands */
  loadFrom('.logo-mark', {
    opacity  : 0,
    scale    : 0.55,
    duration : 0.5,
    ease     : 'back.out(1.6)',
    delay    : 0.28,
  });

  /* Nav links stagger in */
  loadFromAll('.nav-links a', {
    opacity  : 0,
    y        : -8,
    duration : DUR_FAST,
    ease     : EASE,
    stagger  : 0.07,
    delay    : 0.38,
  });


  /* ══════════════════════════════════════════════════════════════════════════
     INDEX HERO — sequence on page load
     NOTE: .carousel-dots skipped (display:none in HTML)
           .hero-image-slider skipped (hidden on mobile/tablet — too risky)
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.hero')) {

    const heroTL = gsap.timeline({ delay: 0.2 });

    heroTL
      .from('.hero-tag', {
        opacity  : 0,
        y        : -14,
        duration : DUR_FAST,
        ease     : EASE,
        clearProps: 'opacity,transform',
      })
      .from('.slide.active h1', {
        opacity  : 0,
        y        : Y_FAR,
        duration : DUR_SLOW,
        ease     : 'power3.out',
        clearProps: 'opacity,transform',
      }, '-=0.1')
      .from('.slide.active .hero-sub', {
        opacity  : 0,
        y        : Y_NEAR,
        duration : DUR_MID,
        ease     : EASE,
        clearProps: 'opacity,transform',
      }, '-=0.4')
      .from('.slide.active .hero-btns a', {
        opacity  : 0,
        y        : Y_NEAR,
        duration : DUR_FAST,
        ease     : EASE,
        stagger  : 0.1,
        clearProps: 'opacity,transform',
      }, '-=0.3');

  }


  /* ══════════════════════════════════════════════════════════════════════════
     ABOUT HERO — sequence on page load
     NOTE: .about-hero-image skipped (display:none on mobile/tablet)
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.about-hero')) {

    const aboutTL = gsap.timeline({ delay: 0.2 });

    aboutTL
      .from('.about-hero-text .section-label', {
        opacity  : 0,
        y        : -12,
        duration : DUR_FAST,
        ease     : EASE,
        clearProps: 'opacity,transform',
      })
      .from('.about-hero h1', {
        opacity  : 0,
        y        : Y_FAR,
        duration : DUR_SLOW,
        ease     : 'power3.out',
        clearProps: 'opacity,transform',
      }, '-=0.1')
      .from('.about-hero-text p', {
        opacity  : 0,
        y        : Y_NEAR,
        duration : DUR_MID,
        ease     : EASE,
        clearProps: 'opacity,transform',
      }, '-=0.4')
      .from('.trust-item', {
        opacity  : 0,
        y        : Y_NEAR,
        duration : DUR_FAST,
        ease     : EASE,
        stagger  : 0.12,
        clearProps: 'opacity,transform',
      }, '-=0.3');

  }


  /* ══════════════════════════════════════════════════════════════════════════
     PRODUCTS PAGE HERO — sequence on page load
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.products-hero')) {

    const prodHeroTL = gsap.timeline({ delay: 0.2 });

    prodHeroTL
      .from('.products-hero .section-label', {
        opacity  : 0,
        y        : -12,
        duration : DUR_FAST,
        ease     : EASE,
        clearProps: 'opacity,transform',
      })
      .from('.products-hero h1', {
        opacity  : 0,
        y        : Y_FAR,
        duration : DUR_SLOW,
        ease     : 'power3.out',
        clearProps: 'opacity,transform',
      }, '-=0.1')
      .from('.products-hero p', {
        opacity  : 0,
        y        : Y_NEAR,
        duration : DUR_MID,
        ease     : EASE,
        clearProps: 'opacity,transform',
      }, '-=0.4');

  }


  /* ══════════════════════════════════════════════════════════════════════════
     CONTACT PAGE HERO — sequence on page load
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.contact-hero')) {

    const contactHeroTL = gsap.timeline({ delay: 0.2 });

    contactHeroTL
      .from('.contact-hero .section-label', {
        opacity  : 0,
        y        : -12,
        duration : DUR_FAST,
        ease     : EASE,
        clearProps: 'opacity,transform',
      })
      .from('.contact-hero h1', {
        opacity  : 0,
        y        : Y_FAR,
        duration : DUR_SLOW,
        ease     : 'power3.out',
        clearProps: 'opacity,transform',
      }, '-=0.1')
      .from('.contact-hero p', {
        opacity  : 0,
        y        : Y_NEAR,
        duration : DUR_MID,
        ease     : EASE,
        clearProps: 'opacity,transform',
      }, '-=0.4');

  }


  /* ══════════════════════════════════════════════════════════════════════════
     WHO WE ARE — index.html (scroll triggered)
     The two column containers have class="fade-in" so script.js handles them.
     We animate the text INSIDE the second column which also has fade-in —
     BUT since the parent already fades in, we only need to animate elements
     that are NOT inside a fade-in container.
     DECISION: Skip Who We Are entirely — script.js's initFadeIns() covers it.
     We handle only the static "section-label" and "section-title" in the heading
     area of the products preview and why sections below.
  ══════════════════════════════════════════════════════════════════════════ */


  /* ══════════════════════════════════════════════════════════════════════════
     PRODUCTS PREVIEW — index.html (scroll triggered)
     The .prod-card elements have NO fade-in class — safe to animate.
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.products-preview')) {

    /* Section header row */
    onScroll('.products-preview .section-label', {
      opacity  : 0,
      y        : Y_NEAR,
      duration : DUR_FAST,
      ease     : EASE,
    }, '.products-preview');

    onScroll('.products-preview .section-title', {
      opacity  : 0,
      y        : Y_FAR,
      duration : DUR_MID,
      ease     : EASE,
      delay    : 0.08,
    }, '.products-preview');

    onScroll('.products-preview .btn-outline', {
      opacity  : 0,
      y        : Y_NEAR,
      duration : DUR_FAST,
      ease     : EASE,
      delay    : 0.14,
    }, '.products-preview');

    /* Product cards — stagger wave */
    onScroll('.prod-card', {
      opacity  : 0,
      y        : Y_FAR,
      duration : DUR_MID,
      ease     : EASE,
      stagger  : { amount: 0.5, from: 'start' },
    }, '.prod-grid');

  }


  /* ══════════════════════════════════════════════════════════════════════════
     WHY CHOOSE US — index.html (scroll triggered)
     .why-card elements have class="fade-in" — script.js owns them.
     We only animate the section heading block above the grid.
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.why-grid')) {

    const whyHeading = get('.why-grid')
      ?.closest('.section-inner')
      ?.querySelector('div:first-child .section-label');

    if (whyHeading) {
      /* Heading label */
      ScrollTrigger.create({
        trigger : '.why-grid',
        start   : 'top 90%',
        once    : true,
        onEnter : () => {
          gsap.from('.why-grid .section-label, .why-grid .section-title', {
            opacity   : 0,
            y         : Y_NEAR,
            duration  : DUR_MID,
            ease      : EASE,
            stagger   : 0.1,
            clearProps: 'opacity,transform',
          });
        },
      });
    } else {
      /* Heading is in a sibling div above — target by proximity */
      ScrollTrigger.create({
        trigger : '.why-grid',
        start   : 'top 90%',
        once    : true,
        onEnter : () => {
          /* Animate the centered heading block that sits before the grid */
          const parent = get('.why-grid')?.parentElement;
          if (!parent) return;
          const label = parent.querySelector('.section-label');
          const title = parent.querySelector('.section-title');
          const targets = [label, title].filter(Boolean);
          if (targets.length) {
            gsap.from(targets, {
              opacity   : 0,
              y         : Y_NEAR,
              duration  : DUR_MID,
              ease      : EASE,
              stagger   : 0.1,
              clearProps: 'opacity,transform',
            });
          }
        },
      });
    }

  }


  /* ══════════════════════════════════════════════════════════════════════════
     CTA BANNER — all pages (scroll triggered)
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.cta-banner')) {

    onScroll('.cta-banner h2', {
      opacity  : 0,
      y        : Y_FAR,
      duration : DUR_MID,
      ease     : 'power3.out',
    }, '.cta-banner');

    onScroll('.cta-banner p', {
      opacity  : 0,
      y        : Y_NEAR,
      duration : DUR_FAST,
      ease     : EASE,
      delay    : 0.1,
    }, '.cta-banner');

    onScroll('.btn-dark', {
      opacity  : 0,
      y        : Y_NEAR,
      duration : DUR_FAST,
      ease     : EASE,
      delay    : 0.2,
    }, '.cta-banner');

  }


  /* ══════════════════════════════════════════════════════════════════════════
     FOOTER — all pages (scroll triggered)
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('footer')) {

    onScroll('.footer-brand', {
      opacity  : 0,
      y        : Y_NEAR,
      duration : DUR_FAST,
      ease     : EASE,
    }, 'footer');

    onScroll('.footer-desc', {
      opacity  : 0,
      y        : Y_NEAR,
      duration : DUR_FAST,
      ease     : EASE,
      delay    : 0.08,
    }, 'footer');

    onScroll('.footer-col', {
      opacity  : 0,
      y        : Y_NEAR,
      duration : DUR_MID,
      ease     : EASE,
      stagger  : 0.09,
      delay    : 0.14,
    }, '.footer-grid');

    onScroll('.footer-bottom', {
      opacity  : 0,
      y        : Y_NEAR,
      duration : DUR_FAST,
      ease     : EASE,
      delay    : 0.3,
    }, 'footer');

  }


  /* ══════════════════════════════════════════════════════════════════════════
     ABOUT BODY — about.html (scroll triggered)
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.about-body')) {

    /* Our Story text column */
    onScroll('.about-text .section-label', {
      opacity  : 0,
      y        : Y_NEAR,
      duration : DUR_FAST,
      ease     : EASE,
    }, '.about-grid');

    onScroll('.about-text .section-title', {
      opacity  : 0,
      y        : Y_FAR,
      duration : DUR_MID,
      ease     : 'power3.out',
      delay    : 0.08,
    }, '.about-grid');

    onScroll('.about-text p', {
      opacity  : 0,
      y        : Y_NEAR,
      duration : DUR_MID,
      ease     : EASE,
      stagger  : 0.08,
      delay    : 0.16,
    }, '.about-text');

    /* MVV cards */
    onScroll('.mvv-card', {
      opacity  : 0,
      y        : Y_FAR,
      duration : DUR_MID,
      ease     : EASE,
      stagger  : 0.15,
    }, '.mvv-grid');

  }


  /* ══════════════════════════════════════════════════════════════════════════
     VALUES SECTION — about.html (scroll triggered)
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.values-section')) {

    onScroll('.values-section .section-label', {
      opacity  : 0,
      y        : Y_NEAR,
      duration : DUR_FAST,
      ease     : EASE,
    }, '.values-section');

    onScroll('.values-section .section-title', {
      opacity  : 0,
      y        : Y_FAR,
      duration : DUR_MID,
      ease     : 'power3.out',
      delay    : 0.08,
    }, '.values-section');

    onScroll('.values-text', {
      opacity  : 0,
      y        : Y_NEAR,
      duration : DUR_MID,
      ease     : EASE,
      stagger  : 0.1,
      delay    : 0.16,
    }, '.values-section');

  }


  /* ══════════════════════════════════════════════════════════════════════════
     PURITY + WHAT SETS US APART — about.html (scroll triggered)
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.purity-section')) {

    /* Purity text block */
    onScroll('.purity-grid > div:first-child .section-label', {
      opacity  : 0,
      y        : Y_NEAR,
      duration : DUR_FAST,
      ease     : EASE,
    }, '.purity-grid');

    onScroll('.purity-grid > div:first-child .section-title', {
      opacity  : 0,
      y        : Y_FAR,
      duration : DUR_MID,
      ease     : 'power3.out',
      delay    : 0.08,
    }, '.purity-grid');

    onScroll('.purity-grid > div:first-child .section-desc', {
      opacity  : 0,
      y        : Y_NEAR,
      duration : DUR_MID,
      ease     : EASE,
      stagger  : 0.08,
      delay    : 0.14,
    }, '.purity-grid');

    /* Purity image */
    onScroll('.purity-image', {
      opacity  : 0,
      y        : Y_NEAR,
      duration : DUR_MID,
      ease     : EASE,
    }, '.purity-image');

    /* What Sets Us Apart heading */
    onScroll('.apart-card', {
      opacity  : 0,
      y        : Y_FAR,
      duration : DUR_MID,
      ease     : EASE,
      stagger  : 0.13,
    }, '.apart-grid');

  }


  /* ══════════════════════════════════════════════════════════════════════════
     CONTACT SECTION — contact.html (scroll triggered)
     The form column has no class — we target by DOM position.
     The submit button is type="submit" inside #contact-form.
  ══════════════════════════════════════════════════════════════════════════ */

  if (get('.contact-section')) {

    /* Left column: section label + title */
    onScroll('.contact-grid > div:first-child .section-label', {
      opacity  : 0,
      y        : Y_NEAR,
      duration : DUR_FAST,
      ease     : EASE,
    }, '.contact-grid');

    onScroll('.contact-grid > div:first-child .section-title', {
      opacity  : 0,
      y        : Y_FAR,
      duration : DUR_MID,
      ease     : 'power3.out',
      delay    : 0.08,
    }, '.contact-grid');

    /* Form groups — stagger */
    onScroll('.form-group', {
      opacity  : 0,
      y        : Y_NEAR,
      duration : DUR_FAST,
      ease     : EASE,
      stagger  : 0.06,
      delay    : 0.14,
    }, '.contact-grid');

    /* Submit button — targeted safely by attribute */
    onScroll('#contact-form [type="submit"]', {
      opacity  : 0,
      y        : Y_NEAR,
      duration : DUR_FAST,
      ease     : EASE,
      delay    : 0.45,
    }, '.contact-grid');

    /* Info cards */
    onScroll('.contact-info-card', {
      opacity  : 0,
      y        : Y_FAR,
      duration : DUR_MID,
      ease     : EASE,
      stagger  : 0.12,
    }, '.contact-info');

  }


  /* ══════════════════════════════════════════════════════════════════════════
     HOVER MICRO-INTERACTIONS — desktop only, simple y lifts
     No opacity changes, no scale, no color — just a clean 4px lift.
  ══════════════════════════════════════════════════════════════════════════ */

  if (window.innerWidth > 1024) {

    const hoverLift = (selector, amount) => {
      getAll(selector).forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(el, { y: -amount, duration: 0.22, ease: 'power1.out' });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { y: 0, duration: 0.28, ease: 'power1.inOut' });
        });
      });
    };

    hoverLift('.prod-card',   5);   /* Product preview cards */
    hoverLift('.why-card',    5);   /* Why cards */
    hoverLift('.apart-card',  4);   /* What sets us apart cards */
    hoverLift('.mvv-card',    4);   /* Mission/Vision cards */
    hoverLift('.btn-primary', 2);   /* Primary buttons */
    hoverLift('.btn-outline', 2);   /* Outline buttons */
    hoverLift('.btn-dark',    2);   /* Dark CTA button */

    /* Product cards on products.html — event delegation because
       script.js rebuilds the grid dynamically via initDatabase()  */
    const prodGrid = document.getElementById('products-grid');
    if (prodGrid) {
      prodGrid.addEventListener('mouseover', e => {
        const card = e.target.closest('.product-card');
        if (card && !card._hovering) {
          card._hovering = true;
          gsap.to(card, { y: -6, duration: 0.22, ease: 'power1.out' });
        }
      });
      prodGrid.addEventListener('mouseout', e => {
        const card = e.target.closest('.product-card');
        if (card) {
          card._hovering = false;
          gsap.to(card, { y: 0, duration: 0.28, ease: 'power1.inOut' });
        }
      });
    }

  }


  /* ══════════════════════════════════════════════════════════════════════════
     SCROLL TRIGGER REFRESH
     Recalculates all trigger positions after everything on the page
     has fully loaded (images, fonts, dynamically injected content).
  ══════════════════════════════════════════════════════════════════════════ */

  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });


} /* end reduced-motion check */