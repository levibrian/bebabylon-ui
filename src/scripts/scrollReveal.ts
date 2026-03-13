export function initScrollReveal(): void {
  // Respect user preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Make all elements immediately visible
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after reveal — one-shot
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -70px 0px',
    }
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    observer.observe(el);
  });
}
