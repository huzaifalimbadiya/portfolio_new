/* Theme */
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.setAttribute('data-theme', 'light');
  const btn = document.getElementById('themeToggle');
  btn?.addEventListener('click', () => {
    const isLight = document.body.getAttribute('data-theme') === 'light';
    document.body.setAttribute('data-theme', isLight ? 'dark' : 'light');
    localStorage.setItem('theme', isLight ? 'dark' : 'light');
  });
})();

/* Mobile menu */
(function () {
  const toggle = document.getElementById('menuToggle');
  const links = document.querySelector('.nav-links');
  toggle?.addEventListener('click', () => {
    links?.classList.toggle('open');
  });
})();

/* Navbar shrink on scroll */
(function () {
  const nav = document.getElementById('navbar');
  const toTop = document.getElementById('toTop');
  const onScroll = () => {
    const y = window.scrollY;
    if (y > 8) nav?.classList.add('scrolled'); else nav?.classList.remove('scrolled');
    if (y > 400) toTop?.classList.add('show'); else toTop?.classList.remove('show');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* Year */
(function () {
  const el = document.getElementById('year');
  if (el) el.textContent = String(new Date().getFullYear());
})();

/* Typing animation */
(function () {
  const el = document.getElementById('typewriterText');
  if (!el) return;
  const phrases = [
    'Full Stack Python & Django Developer',
    'I build fast, modern web apps',
    'AI-powered tools & dashboards'
  ];
  let i = 0;
  let j = 0;
  let deleting = false;
  const speed = { type: 55, delete: 28, pause: 1500 };
  const tick = () => {
    const curr = phrases[i];
    if (!deleting) {
      j++;
      el.textContent = curr.slice(0, j);
      if (j >= curr.length) {
        deleting = true;
        setTimeout(tick, speed.pause);
        return;
      }
      setTimeout(tick, speed.type);
    } else {
      j--;
      el.textContent = curr.slice(0, j);
      if (j <= 0) {
        deleting = false;
        i = (i + 1) % phrases.length;
      }
      setTimeout(tick, speed.delete);
    }
  };
  tick();
})();

/* In-view animations */
(function () {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    },
    { threshold: 0.14 }
  );
  document.querySelectorAll('.project, .section .card').forEach(el => observer.observe(el));
})();

/* Smooth anchor scrolling */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href')?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.querySelector('.nav-links')?.classList.remove('open');
      }
    });
  });
})();

/* Project filters */
(function () {
  const chips = document.querySelectorAll('.filters .chip');
  const cards = document.querySelectorAll('.projects-grid .project');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.getAttribute('data-filter');
      cards.forEach(card => {
        const tech = (card.getAttribute('data-tech') || '').toLowerCase();
        const matches =
          filter === 'all' ||
          tech.split(/\s+/).includes(filter || '') ||
          tech.includes(filter || '');
        card.style.display = matches ? '' : 'none';
      });
    });
  });
})();

/* Contact form: validate and mailto */
(function () {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = /** @type {HTMLInputElement} */(document.getElementById('name')).value.trim();
    const email = /** @type {HTMLInputElement} */(document.getElementById('email')).value.trim();
    const subjectInput = /** @type {HTMLInputElement} */(document.getElementById('subject'));
    const subject = subjectInput ? subjectInput.value.trim() : '';
    const phoneInput = /** @type {HTMLInputElement} */(document.getElementById('phone'));
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const message = /** @type {HTMLTextAreaElement} */(document.getElementById('message')).value.trim();
    if (!name || !email || !message) {
      status.textContent = 'Please fill in all fields.';
      return;
    }
    const finalSubject = subject || ('Portfolio Contact from ' + name);
    const bodyLines = [
      `From: ${name} (${email})`,
      phone ? `Phone: ${phone}` : '',
      '',
      message
    ].filter(Boolean).join('\n');
    const mailto = `mailto:limbadiyahuzef1@gmail.com?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(bodyLines)}`;
    status.textContent = 'Opening your email app...';
    window.location.href = mailto;
    setTimeout(() => (status.textContent = 'If your email app did not open, please copy and email manually.'), 1200);
  });
})();
