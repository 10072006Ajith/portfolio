/* ===================================================================
   AJITH P — Portfolio Scripts
   Features: typing effect, mobile nav, smooth scroll, scroll reveal,
   animated counters, project filtering, active nav highlight,
   navbar shadow, back-to-top, contact form handling.
=================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Typing Effect ---------- */
  const typingEl = document.getElementById('typing');
  const phrases = [
    'Embedded Systems Enthusiast',
    'IoT Developer',
    'PCB Design Learner',
    'ECE Student',
  ];
  let pIndex = 0, cIndex = 0, deleting = false;

  function type() {
    const current = phrases[pIndex];
    if (deleting) {
      cIndex--;
    } else {
      cIndex++;
    }
    typingEl.textContent = current.substring(0, cIndex);

    let delay = deleting ? 50 : 110;

    if (!deleting && cIndex === current.length) {
      delay = 1600;              // pause at full word
      deleting = true;
    } else if (deleting && cIndex === 0) {
      deleting = false;
      pIndex = (pIndex + 1) % phrases.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  type();

  /* ---------- Mobile Navigation ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const icon = menuToggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-xmark');
    });
  });

  /* ---------- Navbar Shadow on Scroll + Back-to-Top ---------- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    backToTop.classList.toggle('show', window.scrollY > 500);
    highlightNav();
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Active Nav Highlight on Scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');

  function highlightNav() {
    let currentId = '';
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop) currentId = sec.id;
    });
    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }

  /* ---------- Scroll Reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Animated Counters ---------- */
  const counters = document.querySelectorAll('.counter-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 1500;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  /* ---------- Project Filtering ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const matches = filter === 'all' || card.dataset.category.includes(filter);
        card.classList.toggle('hide', !matches);
      });
    });
  });

  /* ---------- Contact Form ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill in all fields.';
      status.style.color = '#c0392b';
      return;
    }
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      status.textContent = 'Please enter a valid email address.';
      status.style.color = '#c0392b';
      return;
    }

    // Demo behaviour — no backend. Replace with real submission as needed.
    status.style.color = '';
    status.textContent = `Thank you, ${name}! Your message has been recorded.`;
    form.reset();
    setTimeout(() => { status.textContent = ''; }, 6000);
  });
});
