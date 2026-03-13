/**
 * Donut chart: each <circle data-pct="N"> is one arc segment.
 *
 * Positioning: CSS transform: rotate() around the circle center.
 *   - Segments start at -90deg (12 o'clock) and accumulate clockwise.
 *
 * Animation: stroke-dasharray transitions "0 C" to "visLen C" via CSS.
 *
 * Sparkline: stroke-dashoffset from totalLength to 0 via CSS transition.
 */

const TWO_PI = Math.PI * 2;
function circ(r: number): number { return TWO_PI * r; }

interface DonutSegment { el: SVGCircleElement; dashArray: string; }

function initDonut(svg: SVGSVGElement): void {
  const r   = parseFloat(svg.dataset.radius ?? '70');
  const c   = circ(r);
  const gap = 4;
  const circles = Array.from(svg.querySelectorAll<SVGCircleElement>('circle[data-pct]'));
  let angleDeg = -90;

  const segments: DonutSegment[] = circles.map((el, i) => {
    const pct    = parseFloat(el.dataset.pct ?? '0') / 100;
    const arcLen = pct * c;
    const visLen = Math.max(0, arcLen - gap);
    el.style.transform        = `rotate(${angleDeg}deg)`;
    el.style.transformOrigin  = '50% 50%';
    el.style.strokeDasharray  = `0 ${c}`;
    el.style.strokeDashoffset = '0';
    el.style.transition       = `stroke-dasharray 0.85s cubic-bezier(0.16,1,0.3,1) ${i * 110}ms`;
    angleDeg += pct * 360;
    return { el, dashArray: `${visLen} ${c}` };
  });
  (svg as any)._segments = segments;
}

function revealDonut(svg: SVGSVGElement): void {
  const segs: DonutSegment[] = (svg as any)._segments ?? [];
  segs.forEach(({ el, dashArray }) => { el.style.strokeDasharray = dashArray; });
}

interface SparkData { path: SVGPathElement; area: SVGPathElement | null; }

function initSparkline(svg: SVGSVGElement): void {
  const path = svg.querySelector<SVGPathElement>('path[data-animate]');
  if (!path) return;
  let len = 0;
  try { len = path.getTotalLength(); } catch { return; }
  if (!len) return;
  path.style.strokeDasharray  = `${len}`;
  path.style.strokeDashoffset = `${len}`;
  path.style.transition       = 'stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)';
  const area = svg.querySelector<SVGPathElement>('path[data-area]');
  if (area) { area.style.opacity = '0'; area.style.transition = 'opacity 0.9s ease 0.5s'; }
  (svg as any)._spark = { path, area } satisfies SparkData;
}

function revealSparkline(svg: SVGSVGElement): void {
  const d: SparkData | undefined = (svg as any)._spark;
  if (!d) return;
  d.path.style.strokeDashoffset = '0';
  if (d.area) d.area.style.opacity = '1';
}

export function initCharts(): void {
  const donuts = Array.from(document.querySelectorAll<SVGSVGElement>('svg[data-chart="donut"]'));
  const sparks  = Array.from(document.querySelectorAll<SVGSVGElement>('svg[data-chart="sparkline"]'));
  donuts.forEach(initDonut);
  requestAnimationFrame(() => sparks.forEach(initSparkline));
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    donuts.forEach(revealDonut); sparks.forEach(revealSparkline); return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      const svg = target as SVGSVGElement;
      if (svg.dataset.chart === 'donut')     revealDonut(svg);
      if (svg.dataset.chart === 'sparkline') revealSparkline(svg);
      io.unobserve(svg);
    });
  }, { threshold: 0.3 });
  donuts.forEach(s => io.observe(s));
  sparks.forEach(s => io.observe(s));
}
