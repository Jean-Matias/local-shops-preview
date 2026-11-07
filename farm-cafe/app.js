const menu = {
  breakfast: {
    title: 'Breakfast',
    kicker: 'Start the day right',
    items: ['Egg & Cheese Sandwich', 'Meat Egg & Cheese Sandwich', 'Buttermilk Pancakes Platter', 'French Toast Platter', 'Western Omelet', 'Corned Beef Hash Platter']
  },
  lunch: {
    title: 'Lunch',
    kicker: 'Take a proper lunch break',
    items: ['B.L.T.', 'Grilled Cheese', 'Turkey Sandwich', 'Club Sandwich']
  },
  grill: {
    title: 'Grill & deli',
    kicker: 'From the grill and deli',
    items: ['Philly Steak and Cheese', 'Farm Philly Steak and Cheese', 'Beef Teriyaki Sub', 'Club Sub', '1/3 Pound Burger']
  }
};

const categoryButtons = [...document.querySelectorAll('.category-button')];
const itemList = document.querySelector('#item-list');
const currentTitle = document.querySelector('#menu-current-title');
const menuKicker = document.querySelector('#menu-kicker');

function showCategory(name) {
  const selection = menu[name];
  if (!selection) return;
  categoryButtons.forEach((button) => {
    const active = button.dataset.category === name;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  currentTitle.textContent = selection.title;
  menuKicker.textContent = selection.kicker;
  itemList.replaceChildren(...selection.items.map((item) => {
    const row = document.createElement('li');
    row.textContent = item;
    return row;
  }));
}

categoryButtons.forEach((button) => button.addEventListener('click', () => showCategory(button.dataset.category)));
showCategory('breakfast');

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

function closeNav({ returnFocus = false } = {}) {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  siteNav.classList.remove('is-open');
  if (returnFocus) menuToggle.focus();
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  siteNav.classList.toggle('is-open', !isOpen);
});

siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeNav()));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') closeNav({ returnFocus: true });
});
document.addEventListener('click', (event) => {
  if (menuToggle.getAttribute('aria-expanded') === 'true' && !siteNav.contains(event.target) && !menuToggle.contains(event.target)) closeNav();
});
