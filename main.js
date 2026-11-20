/**
 * Om Kumar Portfolio — main.js
 * Animations: typewriter · cursor glow · scroll progress · 3D card tilt
 *             spotlight on cards · count-up numbers · button ripple
 *             timeline fill · staggered scroll reveals
 */
(function () {
  'use strict';

  const html = document.documentElement;
  const body = document.body;

  /* ══════════════════════════════════════
     1. THEME TOGGLE
  ══════════════════════════════════════ */
  if (localStorage.getItem('theme') === 'light') html.classList.add('light');

  document.getElementById('tog').addEventListener('click', () => {
    body.classList.add('thm');
    html.classList.toggle('light');
    localStorage.setItem('theme', html.classList.contains('light') ? 'light' : 'dark');
    setTimeout(() => body.classList.remove('thm'), 140);
  });

  /* ══════════════════════════════════════
     2. LUCIDE ICONS
  ══════════════════════════════════════ */
  lucide.createIcons();

  /* ══════════════════════════════════════
     3. HAMBURGER / MOBILE MENU
  ══════════════════════════════════════ */
  const ham     = document.getElementById('ham');
  const mobMenu = document.getElementById('mob-menu');

  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mobMenu.classList.toggle('open');
  });

  mobMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        mobMenu.classList.add('closing');
        ham.classList.remove('open');
        setTimeout(() => {
          mobMenu.classList.remove('open', 'closing');
          const target = document.querySelector(href);
          if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY - 72;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 180);
      }
    });
  });

  /* ══════════════════════════════════════
     4. TYPEWRITER EFFECT
  ══════════════════════════════════════ */
  const typeEl = document.getElementById('typewriter');
  if (typeEl) {
    const phrases = [
      'Data-Driven Insights',
      'Predictive ML Models',
      'Power BI Dashboards',
      'Full-Stack Web Apps',
      'REST APIs & Backends',
    ];
    let pIdx = 0, cIdx = 0, deleting = false;
    const SPEED_TYPE = 68, SPEED_DEL = 38, PAUSE = 1800;

    function tick() {
      const current = phrases[pIdx];
      if (!deleting) {
        typeEl.textContent = current.slice(0, ++cIdx);
        if (cIdx === current.length) {
          deleting = true;
          setTimeout(tick, PAUSE);
          return;
        }
      } else {
        typeEl.textContent = current.slice(0, --cIdx);
        if (cIdx === 0) {
          deleting = false;
          pIdx = (pIdx + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting ? SPEED_DEL : SPEED_TYPE);
    }
    setTimeout(tick, 600);
  }

  /* ══════════════════════════════════════
     5. CURSOR GLOW
  ══════════════════════════════════════ */
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let cx = -9999, cy = -9999;
    let rafId;
    document.addEventListener('mousemove', e => {
      cx = e.clientX; cy = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          cursorGlow.style.left = cx + 'px';
          cursorGlow.style.top  = cy + 'px';
          rafId = null;
        });
      }
    });
  }

  /* ══════════════════════════════════════
     6. SCROLL PROGRESS BAR
  ══════════════════════════════════════ */
  const scrollBar = document.getElementById('scroll-bar');
  function updateScrollBar() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (scrollBar) scrollBar.style.width = pct + '%';
  }

  /* ══════════════════════════════════════
     7. SKILLS ROWS — add data-anim dynamically
  ══════════════════════════════════════ */
  document.querySelectorAll('.skills-row').forEach(row => {
    row.setAttribute('data-anim', 'left');
  });

  /* ══════════════════════════════════════
     8. SECTION REVEAL (.rev → .in)
  ══════════════════════════════════════ */
  const revObs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in');
    }),
    { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
  );
  document.querySelectorAll('.rev').forEach(el => revObs.observe(el));

  /* ══════════════════════════════════════
     9. STAGGERED ITEM ANIMATIONS
        [data-anim] → .anim-in + delay
  ══════════════════════════════════════ */
  const STAGGER = 85; // ms per sibling

  function groupByParent(els) {
    const map = new Map();
    els.forEach(el => {
      const key = el.parentElement;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(el);
    });
    return map;
  }

  const animItems = Array.from(document.querySelectorAll('[data-anim]'));
  groupByParent(animItems).forEach(siblings => {
    siblings.forEach((el, i) => { el._si = i; });
  });

  const itemObs = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = (el._si || 0) * STAGGER;
        el.style.setProperty('--stagger', delay);
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('anim-in')));
        itemObs.unobserve(el);
      });
    },
    { threshold: 0.10, rootMargin: '0px 0px -28px 0px' }
  );
  animItems.forEach(el => itemObs.observe(el));

  /* ══════════════════════════════════════
     10. COUNT-UP NUMBERS on stat cards
  ══════════════════════════════════════ */
  const statCards = document.querySelectorAll('.stat-card[data-anim]');
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const numEl = entry.target.querySelector('.stat-num');
      if (!numEl) return;
      const raw    = numEl.textContent.trim();
      const suffix = raw.replace(/[\d.]/g, '');           // "+", ""
      const target = parseFloat(raw);
      const isFloat = raw.includes('.');
      const duration = 900;
      const startTime = performance.now();

      function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const val   = eased * target;
        numEl.textContent = (isFloat ? val.toFixed(1) : Math.floor(val)) + suffix;
        numEl.classList.add('counting');
        setTimeout(() => numEl.classList.remove('counting'), 150);
        if (progress < 1) requestAnimationFrame(step);
        else numEl.textContent = raw; // restore exact
      }
      requestAnimationFrame(step);
      countObs.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  statCards.forEach(c => countObs.observe(c));

  /* ══════════════════════════════════════
     11. 3D CARD TILT
  ══════════════════════════════════════ */
  const MAX_TILT = 8; // degrees
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const rotX = -dy * MAX_TILT;
      const rotY =  dx * MAX_TILT;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.025,1.025,1.025)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.15s, box-shadow 0.2s';
      card.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });

  /* ══════════════════════════════════════
     12. SPOTLIGHT GLOW ON CARD HOVER
  ══════════════════════════════════════ */
  document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');
    });
  });

  /* ══════════════════════════════════════
     13. BUTTON RIPPLE ON CLICK
  ══════════════════════════════════════ */
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', e => {
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty('--rx', (e.clientX - rect.left) + 'px');
      btn.style.setProperty('--ry', (e.clientY - rect.top)  + 'px');
      btn.classList.add('rippling');
      setTimeout(() => btn.classList.remove('rippling'), 500);
    });
  });

  /* ══════════════════════════════════════
     14. TIMELINE FILL as user scrolls
  ══════════════════════════════════════ */
  const timeline = document.querySelector('.timeline');
  function updateTimelineFill() {
    if (!timeline) return;
    const rect = timeline.getBoundingClientRect();
    const vh   = window.innerHeight;
    // How far through the timeline we've scrolled (0–100%)
    const pct  = Math.max(0, Math.min(100,
      ((vh * 0.6 - rect.top) / rect.height) * 100
    ));
    timeline.style.setProperty('--tl-fill', pct.toFixed(1) + '%');
  }

  /* ══════════════════════════════════════
     15. NAV: SCROLL SHADOW + ACTIVE LINKS
         + BACK TO TOP + scroll-driven logic
  ══════════════════════════════════════ */
  const navbar    = document.getElementById('navbar');
  const sections  = document.querySelectorAll('section[id]');
  const deskLinks = document.querySelectorAll('.nav-links a');
  const mobLinks  = document.querySelectorAll('.mob-menu .mob-link');
  const btt       = document.getElementById('btt');

  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 20);
    btt.classList.toggle('show', y > 360);

    let current = sections[0]?.id || '';
    sections.forEach(sec => {
      if (y >= sec.offsetTop - 120) current = sec.id;
    });
    deskLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
    mobLinks.forEach(a  => a.classList.toggle('active', a.getAttribute('href') === '#' + current));

    updateScrollBar();
    updateTimelineFill();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initialise on load

})();
