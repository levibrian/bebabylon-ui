export function initNavbar(): void {
  const nav = document.querySelector('.navbar') as HTMLElement | null;
  if (!nav) return;

  const SCROLL_THRESHOLD = 60;

  function update(): void {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav!.classList.add('scrolled');
    } else {
      nav!.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  update(); // run on load in case page is already scrolled
}
