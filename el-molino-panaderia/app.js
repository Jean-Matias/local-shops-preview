// Local Storefront Interaction Controller
document.addEventListener('DOMContentLoaded', () => {
  // Accessible Tab List for Services
  const tabList = document.querySelector('[role="tablist"]');
  if (tabList) {
    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
    const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

    function activateTab(tab, { focus = true } = {}) {
      tabs.forEach((t) => {
        const isSelected = t === tab;
        t.setAttribute('aria-selected', String(isSelected));
        t.setAttribute('tabindex', isSelected ? '0' : '-1');
      });

      const targetId = tab.getAttribute('aria-controls');
      panels.forEach((p) => {
        const isMatch = p.id === targetId;
        if (isMatch) {
          p.removeAttribute('hidden');
        } else {
          p.setAttribute('hidden', '');
        }
      });

      if (focus) {
        tab.focus();
      }
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => activateTab(tab, { focus: false }));
    });

    tabList.addEventListener('keydown', (e) => {
      const currentTab = document.activeElement;
      const index = tabs.indexOf(currentTab);
      if (index === -1) return;

      let nextIndex = null;
      if (e.key === 'ArrowRight') {
        nextIndex = (index + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft') {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        nextIndex = 0;
      } else if (e.key === 'End') {
        nextIndex = tabs.length - 1;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        activateTab(tabs[nextIndex], { focus: true });
      }
    });
  }

  // Mobile Navigation Drawer Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const primaryNav = document.querySelector('#primary-nav');

  function closeNav({ returnFocus = false } = {}) {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('is-open');
    if (returnFocus) {
      menuToggle.focus();
    }
  }

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      primaryNav.classList.toggle('is-open', !isOpen);
    });

    primaryNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => closeNav());
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeNav({ returnFocus: true });
      }
    });

    document.addEventListener('click', (e) => {
      if (
        menuToggle.getAttribute('aria-expanded') === 'true' &&
        !primaryNav.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        closeNav();
      }
    });
  }
});
