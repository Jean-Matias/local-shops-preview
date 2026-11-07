const categories = {
  "shoes": {
    "name": "Shoe & Boot Repair",
    "items": [
      "Half & Full Resoling (Leather/Vibram)",
      "Heel Replacement & Tip Repair",
      "Stretching & Sizing Adjustments",
      "Orthopedic Build-Ups & Lifts",
      "Protective Rubber Half-Soles"
    ]
  },
  "leather": {
    "name": "Leather & Handbags",
    "items": [
      "Purse & Handbag Strap Repair",
      "Zipper Replacement & Slider Fixes",
      "Leather Deep Cleaning & Re-Dyeing",
      "Belt Shortening & Custom Holes",
      "Luggage & Briefcase Stitching"
    ]
  },
  "care": {
    "name": "Care & Polish",
    "items": [
      "Full Hand Cleaning & Conditioning",
      "High-Gloss Cream Polish",
      "Weatherproofing & Water Repellent",
      "Salt Stain Neutralization",
      "Hardware Buffing & Replacement"
    ]
  }
};

const categoryButtons = Array.from(document.querySelectorAll('.category-button'));
const servicesList = document.querySelector('#services-list');
const currentTitle = document.querySelector('#services-current-title');
const servicesKicker = document.querySelector('#services-kicker');

function switchCategory(catId) {
  const data = categories[catId];
  if (!data) return;

  categoryButtons.forEach((btn) => {
    const isActive = btn.dataset.category === catId;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });

  currentTitle.textContent = data.name;
  servicesKicker.textContent = data.name;

  servicesList.replaceChildren(...data.items.map((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    return li;
  }));
}

categoryButtons.forEach((btn) => {
  btn.addEventListener('click', () => switchCategory(btn.dataset.category));
});

// Mobile Navigation Drawer Toggle
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

function closeNav({ returnFocus = false } = {}) {
  if (!menuToggle || !siteNav) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  siteNav.classList.remove('is-open');
  if (returnFocus) menuToggle.focus();
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    siteNav.classList.toggle('is-open', !isOpen);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeNav());
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeNav({ returnFocus: true });
    }
  });

  document.addEventListener('click', (e) => {
    if (menuToggle.getAttribute('aria-expanded') === 'true' &&
        !siteNav.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      closeNav();
    }
  });
}
