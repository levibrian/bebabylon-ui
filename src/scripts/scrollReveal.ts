export function initScrollReveal(): void {
  // Respect user preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  // Use a smaller negative rootMargin on short mobile viewports so elements
  // aren't required to enter deep into the viewport before revealing.
  const isMobile = window.matchMedia('(max-width: 640px)').matches;
  const rootMargin = isMobile ? '0px 0px -32px 0px' : '0px 0px -70px 0px';

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin,
    }
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    observer.observe(el);
  });
}
