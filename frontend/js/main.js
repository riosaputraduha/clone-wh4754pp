const dropdown = document.getElementById('features-dropdown');
const dropdownButton = dropdown.querySelector('button');
const menu = document.getElementById('main-nav');
const menuButton = document.getElementById('menu-toggle');

function closeDropdown() {
  dropdown.classList.remove('open');
  dropdownButton.setAttribute('aria-expanded', 'false');
}

function closeMenu() {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  closeDropdown();
}

dropdownButton.addEventListener('click', () => {
  const open = dropdown.classList.toggle('open');
  dropdownButton.setAttribute('aria-expanded', String(open));
});

menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  if (!open) closeDropdown();
});

document.addEventListener('click', (event) => {
  if (!dropdown.contains(event.target)) closeDropdown();
  if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.matchMedia('(min-width: 1001px)').addEventListener('change', closeMenu);

const newsCards = document.getElementById('news-cards');
const newsPrev = document.getElementById('news-prev');
const newsNext = document.getElementById('news-next');

function updateNewsControls() {
  newsPrev.disabled = newsCards.scrollLeft <= 1;
  newsNext.disabled = newsCards.scrollLeft + newsCards.clientWidth >= newsCards.scrollWidth - 1;
}

function scrollNews(direction) {
  const card = newsCards.querySelector('.news-card');
  newsCards.scrollBy({ left: direction * (card.getBoundingClientRect().width + 24), behavior: 'smooth' });
}

newsPrev.addEventListener('click', () => scrollNews(-1));
newsNext.addEventListener('click', () => scrollNews(1));
newsCards.addEventListener('scroll', updateNewsControls, { passive: true });
window.addEventListener('resize', updateNewsControls);
updateNewsControls();
