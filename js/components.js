/* Tripple M Sounds — Shared layout components */

const NAV_LINKS = [
  { href: 'index.html', label: 'Home' },
  { href: 'about.html', label: 'About' },
  { href: 'equipment.html', label: 'Equipment' },
  { href: 'gallery.html', label: 'Gallery' },
  { href: 'services.html', label: 'Services' },
  { href: 'booking.html', label: 'Booking' },
  { href: 'contact.html', label: 'Contact' },
];

const WHATSAPP_SVG = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.126 1.528 5.867L0 24l6.335-1.662A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.78 9.78 0 01-4.986-1.364l-.357-.212-3.756.986 1.002-3.66-.233-.376A9.818 9.818 0 1121.818 12 9.832 9.832 0 0112 21.818z"/></svg>';

function getCurrentPage() {
  const path = window.location.pathname.split('/').pop();
  return path || 'index.html';
}

function renderNavbar(scrolled = false) {
  const current = getCurrentPage();
  const links = NAV_LINKS.map(
    l => `<li><a class="nav-link${l.href === current ? ' active' : ''}" href="${l.href}">${l.label}</a></li>`
  ).join('');

  return `
    <nav class="navbar${scrolled ? ' scrolled' : ''}">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          <span class="brand-mark">M³</span>
          <span class="brand-divider"></span>
          <span>Tripple M Sounds</span>
        </a>
        <button class="nav-toggle" type="button" aria-label="Toggle navigation">
          <span></span><span></span><span></span>
        </button>
        <div class="nav-menu">
          <ul class="nav-links">${links}</ul>
          <div class="nav-actions">
            <button class="theme-toggle" aria-label="Toggle theme">&#9728;</button>
            <a href="booking.html" class="btn-gold btn-sm hide-mobile">Get a Quote</a>
          </div>
        </div>
      </div>
    </nav>`;
}

function renderFooter(showNewsletter = true) {
  const newsletter = showNewsletter ? `
    <div class="mt-4" style="max-width:420px;">
      <p class="text-small text-secondary mb-2">Stay updated with equipment deals and event tips.</p>
      <form id="newsletter-form" class="newsletter-form">
        <input type="email" name="email" class="form-control" placeholder="Your email address" required>
        <button type="submit" class="btn-gold btn-sm">Subscribe</button>
      </form>
    </div>` : '';

  const social = ['facebook', 'instagram', 'twitter', 'youtube'].map(s =>
    `<a href="#" aria-label="${s}">${typeof icon === 'function' ? icon(s) : s}</a>`
  ).join('');

  return `
    <footer class="footer">
      <div class="container">
        <div class="grid grid-4">
          <div>
            <p class="footer-brand">Tripple M Sounds</p>
            <p class="text-secondary text-small">Premium sound, instruments & event production solutions. Trusted since 2010.</p>
            <div class="social-links mt-3">${social}</div>
            ${newsletter}
          </div>
          <div>
            <h5>Navigation</h5>
            <a href="index.html">Home</a>
            <a href="about.html">About Us</a>
            <a href="equipment.html">Equipment</a>
            <a href="gallery.html">Gallery</a>
            <a href="booking.html">Booking</a>
          </div>
          <div>
            <h5>Services</h5>
            <a href="services.html">Sound System Hire</a>
            <a href="services.html">Instrument Hire</a>
            <a href="services.html">DJ Services</a>
            <a href="services.html">Event Lighting</a>
            <a href="services.html">Stage Setup</a>
          </div>
          <div>
            <h5>Contact</h5>
            <a href="tel:+254710241295">0 241 295</a>
            <a href="mailto:edisonkipkemoi319@gmail.com">edisonkipkemoi319@gmail.com</a>
            <a href="contact.html">View Location</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 Tripple M Sounds. All Rights Reserved.</p>
        </div>
      </div>
    </footer>`;
}

function renderWhatsApp(message = 'equipment hire') {
  const text = encodeURIComponent(`Hi Tripple M Sounds, I'd like to inquire about ${message}.`);
  return `
    <a href="https://wa.me/254710241295?text=${text}" class="whatsapp-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
      ${WHATSAPP_SVG}
    </a>`;
}

function injectLayout(options = {}) {
  const { scrolled = false, showNewsletter = true, whatsappMsg = 'equipment hire' } = options;
  const navRoot = document.getElementById('site-nav');
  const footerRoot = document.getElementById('site-footer');
  const waRoot = document.getElementById('site-whatsapp');

  if (navRoot) navRoot.innerHTML = renderNavbar(scrolled);
  if (footerRoot) footerRoot.innerHTML = renderFooter(showNewsletter);
  if (waRoot) waRoot.innerHTML = renderWhatsApp(whatsappMsg);
}

document.addEventListener('DOMContentLoaded', () => {
  const opts = window.TMS_LAYOUT || {};
  injectLayout(opts);
});
