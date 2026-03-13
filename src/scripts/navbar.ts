export function initNavbar(): void {
  const nav     = document.querySelector('.navbar') as HTMLElement | null;
  const menuBtn = document.querySelector<HTMLButtonElement>('.navbar__menu-btn');
  const mobileNav = document.querySelector<HTMLElement>('.navbar__mobile-nav');

  if (!nav) return;

  // ── Scroll blur effect ──────────────────────────────────────
  const SCROLL_THRESHOLD = 60;

  function updateScroll(): void {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav!.classList.add('scrolled');
    } else {
      nav!.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  // ── Mobile hamburger menu ───────────────────────────────────
  if (!menuBtn || !mobileNav) return;

  let isOpen = false;

  function openMenu(): void {
    isOpen = true;
    menuBtn!.setAttribute('aria-expanded', 'true');
    menuBtn!.setAttribute('aria-label', 'Close menu');
    mobileNav!.classList.add('navbar__mobile-nav--open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu(): void {
    isOpen = false;
    menuBtn!.setAttribute('aria-expanded', 'false');
    menuBtn!.setAttribute('aria-label', 'Open menu');
    mobileNav!.classList.remove('navbar__mobile-nav--open');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  // Close when a link inside the drawer is tapped
  mobileNav.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).tagName === 'A') {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });

  // Close on outside click (touch or mouse)
  document.addEventListener('pointerdown', (e) => {
    if (isOpen && !nav!.contains(e.target as Node) && !mobileNav!.contains(e.target as Node)) {
      closeMenu();
    }
  });

  // Close when viewport grows past mobile breakpoint
  const mq = window.matchMedia('(min-width: 641px)');
  mq.addEventListener('change', (e) => {
    if (e.matches && isOpen) closeMenu();
  });
}
