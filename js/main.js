/* Tripple M Sounds - Main JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemeToggle();
  initScrollAnimations();
  initCounters();
  initLightbox();
  initForms();
});

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  const toggler = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');

  toggler?.addEventListener('click', () => {
    menu?.classList.toggle('open');
    toggler.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu?.classList.remove('open');
      toggler?.classList.remove('active');
    });
  });
}

function initThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  const saved = localStorage.getItem('tms-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('tms-theme', next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;
  toggle.innerHTML = theme === 'dark' ? '&#9728;' : '&#9790;';
}

function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  elements.forEach(el => observer.observe(el));
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const animateCounter = el => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    const step = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach(c => observer.observe(c));
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('[data-lightbox]').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const close = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', close);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
}

function showFormMessage(form, message, isSuccess) {
  let alert = form.querySelector('.form-alert');
  if (!alert) {
    alert = document.createElement('div');
    form.appendChild(alert);
  }
  alert.className = `form-alert mt-3 ${isSuccess ? 'alert-success-custom' : 'alert-error-custom'}`;
  alert.textContent = message;
  alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function submitForm(form, type) {
  const btn = form.querySelector('[type="submit"]');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Sending...';

  const data = Object.fromEntries(new FormData(form));
  const key = `tms-${type}`;
  const items = JSON.parse(localStorage.getItem(key) || '[]');
  items.push({ ...data, submittedAt: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(items));

  const messages = {
    booking: 'Your booking request has been saved! We will contact you within 24 hours.',
    quote: 'Your quotation request has been submitted! We will send you a quote within 24 hours.',
    newsletter: 'Thank you for subscribing to our newsletter!',
    contact: 'Your message has been sent! We will get back to you shortly.',
  };

  setTimeout(() => {
    showFormMessage(form, messages[type] || 'Submitted successfully!', true);
    form.reset();
    btn.disabled = false;
    btn.textContent = originalText;
  }, 600);
}

function initForms() {
  document.getElementById('newsletter-form')?.addEventListener('submit', e => {
    e.preventDefault();
    submitForm(e.target, 'newsletter');
  });

  document.getElementById('booking-form')?.addEventListener('submit', e => {
    e.preventDefault();
    submitForm(e.target, 'booking');
  });

  document.getElementById('quote-form')?.addEventListener('submit', e => {
    e.preventDefault();
    submitForm(e.target, 'quote');
  });

  document.getElementById('contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    submitForm(e.target, 'contact');
  });
}
