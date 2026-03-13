function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function animateCount(el: HTMLElement): void {
  const target = parseFloat(el.dataset.countUp ?? '0');
  const duration = parseInt(el.dataset.duration ?? '2000', 10);
  const prefix = el.dataset.prefix ?? '';
  const suffix = el.dataset.suffix ?? '';
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;

  let startTime: number | null = null;

  function step(timestamp: number): void {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    const current = target * eased;

    el.textContent = prefix + current.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

export function initCountUp(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll<HTMLElement>('[data-count-up]').forEach((el) => {
      const target = parseFloat(el.dataset.countUp ?? '0');
      const prefix = el.dataset.prefix ?? '';
      const suffix = el.dataset.suffix ?? '';
      const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
      el.textContent = prefix + target.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) + suffix;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll<HTMLElement>('[data-count-up]').forEach((el) => {
    el.textContent = (el.dataset.prefix ?? '') + '0' + (el.dataset.suffix ?? '');
    observer.observe(el);
  });
}
