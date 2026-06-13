/* Equipment page - data, search, and filtering */

const IMG = typeof TMS_IMAGES !== 'undefined' ? TMS_IMAGES.equipment : {};

const EQUIPMENT_DATA = [
  // Sound — rates aligned with Nairobi PA hire market (premieraudiovisual, Janeson, Ccentrice)
  { id: 1, name: 'Line Array Speakers', category: 'sound', description: 'Professional line array system for large venues, concerts, and outdoor events.', price: 'KSh 18,000/day', available: true, image: IMG.lineArray },
  { id: 2, name: 'Subwoofers', category: 'sound', description: 'Dual 18" powered subwoofers delivering deep, punchy bass for any event.', price: 'KSh 4,500/day', available: true, image: IMG.subwoofers },
  { id: 3, name: 'Amplifiers', category: 'sound', description: 'Crown and QSC power amplifiers for reliable, high-output sound reinforcement.', price: 'KSh 3,500/day', available: true, image: IMG.amplifiers },
  { id: 4, name: 'Mixers', category: 'sound', description: 'Digital and analog mixing consoles from Behringer and Yamaha for precise control.', price: 'KSh 5,000/day', available: true, image: IMG.mixers },
  { id: 5, name: 'Wireless Microphones', category: 'sound', description: 'Shure wireless mic systems with handheld and lapel options for speakers and performers.', price: 'KSh 2,500/day', available: true, image: IMG.wirelessMics },

  // Instruments — based on Nakipo Studios & Bridah Fun World Nairobi hire rates
  { id: 6, name: 'Keyboards', category: 'instruments', description: 'Yamaha and Roland digital keyboards with weighted keys and built-in sounds.', price: 'KSh 3,500/day', available: true, image: IMG.keyboards },
  { id: 7, name: 'Pianos', category: 'instruments', description: 'Grand and upright acoustic pianos for weddings, concerts, and recitals.', price: 'KSh 5,000/day', available: true, image: IMG.pianos },
  { id: 8, name: 'Drum Sets', category: 'instruments', description: 'Full Pearl and Tama drum kits with cymbals for live performances.', price: 'KSh 5,000/day', available: true, image: IMG.drums },
  { id: 9, name: 'Electric Guitars', category: 'instruments', description: 'Electric guitars with combo amplifiers available for live performance.', price: 'KSh 2,000/day', available: true, image: IMG.electricGuitar },
  { id: 10, name: 'Bass Guitars', category: 'instruments', description: '4- and 5-string bass guitars with amps for any musical genre.', price: 'KSh 2,500/day', available: true, image: IMG.bassGuitar },
  { id: 11, name: 'Acoustic Guitars', category: 'instruments', description: 'Quality acoustic guitars for intimate performances, worship, and recordings.', price: 'KSh 2,000/day', available: true, image: IMG.acousticGuitar },
  { id: 12, name: 'Saxophones', category: 'instruments', description: 'Alto and tenor saxophones professionally maintained and ready to play.', price: 'KSh 3,000/day', available: false, image: IMG.saxophone },
  { id: 13, name: 'Trumpets', category: 'instruments', description: 'Professional trumpets for brass sections and solo performances.', price: 'KSh 2,500/day', available: true, image: IMG.trumpet },
  { id: 14, name: 'Violins', category: 'instruments', description: 'Quality student and professional violins with bows and cases included.', price: 'KSh 2,000/day', available: true, image: IMG.violin },

  // Lighting — Janeson LED PAR KSh 1,500; moving heads ~KSh 3,600–4,500; rigs from Ccentrice
  { id: 15, name: 'Moving Heads', category: 'lighting', description: 'Intelligent moving head fixtures with gobos, colors, and beam effects.', price: 'KSh 4,500/day', available: true, image: IMG.movingHeads },
  { id: 16, name: 'LED PAR Lights', category: 'lighting', description: 'RGBW LED PAR cans for wash lighting and color ambiance at any event.', price: 'KSh 1,500/day', available: true, image: IMG.ledPar },
  { id: 17, name: 'Laser Lights', category: 'lighting', description: 'Professional laser show systems for concerts, clubs, and celebrations.', price: 'KSh 8,000/day', available: true, image: IMG.laser },
  { id: 18, name: 'Stage Effects', category: 'lighting', description: 'Confetti cannons, spark machines, and special effects for memorable moments.', price: 'KSh 6,000/day', available: true, image: IMG.stageEffects },
  { id: 19, name: 'Smoke Machines', category: 'lighting', description: 'High-output fog and haze machines to enhance lighting effects.', price: 'KSh 2,500/day', available: true, image: IMG.smokeMachine },

  // Stage
  { id: 20, name: 'Stage Platforms', category: 'stage', description: 'Modular stage decking in various heights for performances and presentations.', price: 'KSh 12,000/day', available: true, image: IMG.stagePlatforms },
  { id: 21, name: 'Podiums', category: 'stage', description: 'Professional lecterns and podiums for conferences and ceremonies.', price: 'KSh 3,000/day', available: true, image: IMG.podiums },
  { id: 22, name: 'Backdrops', category: 'stage', description: 'Customizable pipe and drape backdrops for weddings and corporate events.', price: 'KSh 8,000/day', available: true, image: IMG.backdrops },
  { id: 23, name: 'Trusses', category: 'stage', description: 'Aluminum truss systems for lighting rigs, speakers, and stage structures.', price: 'KSh 7,000/day', available: true, image: IMG.trusses },
];

const CATEGORY_LABELS = {
  all: 'All Equipment',
  sound: 'Sound Equipment',
  instruments: 'Musical Instruments',
  lighting: 'Lighting Equipment',
  stage: 'Stage Equipment',
};

let activeCategory = 'all';
let searchQuery = '';

function renderEquipment() {
  const grid = document.getElementById('equipment-grid');
  if (!grid) return;

  const filtered = EQUIPMENT_DATA.filter(item => {
    const matchCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = !searchQuery ||
      item.name.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery);
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="text-center" style="grid-column: 1 / -1; padding: 3rem 0;">
        <p style="font-size: 2rem; color: var(--gold);">&#128269;</p>
        <h4>No equipment found</h4>
        <p class="text-secondary">Try adjusting your search or category filter.</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <div class="fade-in">
      <div class="equipment-card">
        <div class="img-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="equipment-card-body">
          <div class="equipment-header">
            <h5>${item.name}</h5>
            <span class="${item.available ? 'badge-available' : 'badge-unavailable'}">
              ${item.available ? 'Available' : 'Booked'}
            </span>
          </div>
          <p class="text-secondary text-small" style="flex-grow:1;margin-bottom:1rem;">${item.description}</p>
          <div class="flex-between" style="margin-top:auto;">
            <span class="equipment-price">${item.price}</span>
            <a href="booking.html?equipment=${encodeURIComponent(item.name)}" class="btn-gold btn-sm">Book Now</a>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  if (typeof initScrollAnimations === 'function') {
    document.querySelectorAll('#equipment-grid .fade-in').forEach(el => {
      el.classList.remove('visible');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.1 });
      observer.observe(el);
    });
  }
}

function initEquipmentPage() {
  const tabsContainer = document.getElementById('category-tabs');
  const searchInput = document.getElementById('equipment-search');

  if (tabsContainer) {
    tabsContainer.innerHTML = Object.entries(CATEGORY_LABELS).map(([key, label]) => `
      <button class="category-tab ${key === 'all' ? 'active' : ''}" data-category="${key}">
        ${label}
      </button>
    `).join('');

    tabsContainer.addEventListener('click', e => {
      const tab = e.target.closest('.category-tab');
      if (!tab) return;
      tabsContainer.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.category;
      renderEquipment();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderEquipment();
    });
  }

  renderEquipment();
}

document.addEventListener('DOMContentLoaded', initEquipmentPage);
