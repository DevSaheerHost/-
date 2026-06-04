/* ============================================================
   main.js — UI Interactions, Cursor, Nav, Contact Form
   SahBitCode Portfolio  |  Vanilla JS — no frameworks
   ============================================================ */

'use strict';

// ============================================================
// 1. Firebase (optional — graceful skip if not loaded)
// ============================================================
const DB = (() => {
  const firebaseConfig = {
    apiKey: "AIzaSyAthM6oD2dYuAPrrLtqZT3pOWvkb17zRME",
    authDomain: "codersaheer.firebaseapp.com",
    databaseURL: "https://codersaheer-default-rtdb.firebaseio.com",
    projectId: "codersaheer",
    storageBucket: "codersaheer.appspot.com",
    messagingSenderId: "894319865406",
    appId: "1:894319865406:web:d3dfb840065d9c9344ab6f",
  };

  let db = null;

  function init() {
    try {
      if (window.firebase) {
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
        db = firebase.database();
      }
    } catch (e) {
      console.warn('Firebase not available:', e);
    }
  }

  async function saveContact(data) {
    if (!db) return false;
    try {
      const ref = db.ref('portfolio/contacts');
      await ref.push({ ...data, timestamp: Date.now() });
      return true;
    } catch (e) {
      console.error('DB write failed:', e);
      return false;
    }
  }

  return { init, saveContact };
})();

// ============================================================
// 2. Custom Cursor
// ============================================================
const Cursor = (() => {
  let cursor, follower;
  let followerX = 0, followerY = 0;
  let mouseX = 0, mouseY = 0;

  function init() {
    cursor = document.getElementById('cursor');
    follower = document.getElementById('cursorFollower');
    if (!cursor || !follower) return;

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      follower.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      follower.style.opacity = '0';
    });

    loop();
  }

  function onMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  }

  function loop() {
    followerX += (mouseX - followerX) * 0.14;
    followerY += (mouseY - followerY) * 0.14;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(loop);
  }

  return { init };
})();

// ============================================================
// 3. Navigation
// ============================================================
const Nav = (() => {
  function init() {
    const btn   = document.getElementById('menuBtn');
    const menu  = document.getElementById('mobileMenu');
    const links = document.querySelectorAll('.mobile-link');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        btn.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Smooth scroll for all internal anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  return { init };
})();

// ============================================================
// 4. Toast Notification
// ============================================================
const Toast = (() => {
  let el;
  let timer;

  function init() {
    el = document.getElementById('toast');
  }

  function show(msg, duration = 3500) {
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => el.classList.remove('show'), duration);
  }

  return { init, show };
})();

// ============================================================
// 5. Contact Form
// ============================================================
const ContactForm = (() => {
  function init() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const nameEl  = document.getElementById('fname');
      const emailEl = document.getElementById('femail');
      const msgEl   = document.getElementById('fmsg');

      const name  = nameEl.value.trim();
      const email = emailEl.value.trim();
      const msg   = msgEl.value.trim();

      if (!name || !email || !msg) {
        Toast.show('Please fill in all fields.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        Toast.show('Please enter a valid email address.');
        return;
      }

      btn.classList.add('loading');
      btn.disabled = true;

      const saved = await DB.saveContact({ name, email, message: msg });

      btn.classList.remove('loading');
      btn.disabled = false;

      if (saved) {
        Toast.show('Message sent! I\'ll get back to you soon.');
        form.reset();
      } else {
        // Fallback: open email client
        const mailTo = `mailto:saheerbabu@example.com?subject=Portfolio Contact — ${encodeURIComponent(name)}&body=${encodeURIComponent(msg)}`;
        window.open(mailTo, '_blank');
        Toast.show('Opening your email client…');
      }
    });
  }

  return { init };
})();

// ============================================================
// 6. Skill hover → 3D hint
// ============================================================
const SkillInteraction = (() => {
  function init() {
    const items = document.querySelectorAll('.skill-list li');
    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.querySelector('.skill-dot').style.background = '#f5a623';
      });
      item.addEventListener('mouseleave', () => {
        item.querySelector('.skill-dot').style.background = '';
      });
    });
  }

  return { init };
})();

// ============================================================
// 7. Project item micro-interaction
// ============================================================
const ProjectInteraction = (() => {
  function init() {
    document.querySelectorAll('.project-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        // slight tilt via CSS transform
        item.style.transform = 'translateX(3px)';
      });
      item.addEventListener('mouseleave', () => {
        item.style.transform = '';
      });
    });
  }

  return { init };
})();

// ============================================================
// 8. Hero badge data-text mirroring (glitch effect support)
// ============================================================
function setupGlitchText() {
  const accentLine = document.querySelector('.hero-name .accent-line');
  if (accentLine) {
    accentLine.setAttribute('data-text', accentLine.textContent);
  }
}

// ============================================================
// BOOT
// ============================================================
function boot() {
  DB.init();
  Cursor.init();
  Nav.init();
  Toast.init();
  ContactForm.init();
  SkillInteraction.init();
  ProjectInteraction.init();
  setupGlitchText();

  // Add transition class after initial paint to prevent flash
  setTimeout(() => {
    document.body.classList.add('transitions-ready');
  }, 100);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
