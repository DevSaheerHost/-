/* ============================================================
   animations.js — GSAP + ScrollTrigger Scroll Animations
   SahBitCode Portfolio
   ============================================================

   Strategy:
   - Hero section: staggered entrance on load
   - All [data-reveal] elements: ScrollTrigger fade+slide in
   - Section transitions: progress-based class adds
   - Nav: scroll-activated background
   - Hero badge: continuous spin (CSS) + entrance scale
   - Project items: stagger from bottom
   - Skills: stagger from left per group
============================================================ */

'use strict';

const Animations = (() => {

  function init() {
    if (!window.gsap || !window.ScrollTrigger) {
      // Fallback: just reveal everything
      document.querySelectorAll('[data-reveal]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    addGridBg();
    animateHero();
    animateRevealElements();
    animateNav();
    animateProjectItems();
    animateSkillGroups();
    animateContact();
    initActiveNavHighlight();
  }

  // ---- Grid background ----
  function addGridBg() {
    const div = document.createElement('div');
    div.className = 'grid-bg';
    document.body.insertBefore(div, document.body.firstChild);
  }

  // ---- Hero entrance ----
  function animateHero() {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.to('.hero-eyebrow', {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    })
    .to('.hero-name .line', {
      opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power4.out',
    }, '-=0.3')
    .to('.hero-sub', {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    }, '-=0.5')
    .to('.hero-desc', {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    }, '-=0.4')
    .to('.hero-cta', {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    }, '-=0.4')
    .to('.hero-avatar', {
      opacity: 1, duration: 1.0, ease: 'power3.out',
    }, '-=0.9')
    .from('.avatar-frame', {
      scale: 0.88, y: 20, duration: 1.1, ease: 'power4.out',
    }, '<')
    .from('.hero-badge', {
      scale: 0.5, opacity: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)',
    }, '-=0.7')
    .from('.scroll-indicator', {
      opacity: 0, y: 10, duration: 0.6, ease: 'power2.out',
    }, '-=0.3');
  }

  // ---- Generic [data-reveal] elements ----
  function animateRevealElements() {
    const revealEls = document.querySelectorAll('[data-reveal]');
    revealEls.forEach(el => {
      // Skip hero-internal (those animate immediately)
      if (el.closest('.hero-content') || el.classList.contains('hero-eyebrow')) return;

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleClass: { targets: el, className: 'revealed' },
          once: true,
          onEnter: () => el.classList.add('revealed'),
        },
      });
    });
  }

  // ---- Nav scroll background ----
  function animateNav() {
    const nav = document.getElementById('main-nav');
    ScrollTrigger.create({
      start: 80,
      onUpdate: self => {
        if (self.progress > 0) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
      },
    });
  }

  // ---- Project items: stagger on section enter ----
  function animateProjectItems() {
    const items = document.querySelectorAll('.project-item');
    items.forEach((item, i) => {
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: i * 0.12,
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          once: true,
          onEnter: () => item.classList.add('revealed'),
        },
      });
    });
  }

  // ---- Skill groups: cascade ----
  function animateSkillGroups() {
    const groups = document.querySelectorAll('.skill-group');
    groups.forEach((group, i) => {
      gsap.to(group, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: i * 0.18,
        scrollTrigger: {
          trigger: group,
          start: 'top 88%',
          once: true,
          onEnter: () => group.classList.add('revealed'),
        },
      });
    });
  }

  // ---- Contact heading split animation ----
  function animateContact() {
    gsap.to('.contact-heading', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.contact-heading',
        start: 'top 85%',
        once: true,
      },
    });
  }

  // ---- Active nav highlighting ----
  function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('[data-nav]');

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: () => {
        const scrollPos = window.scrollY + window.innerHeight * 0.4;
        sections.forEach(sec => {
          if (sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
            navLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + sec.id) {
                link.classList.add('active');
              }
            });
          }
        });
      },
    });
  }

  return { init };
})();

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Animations.init);
} else {
  Animations.init();
}
