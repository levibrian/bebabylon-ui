import './styles/index.css';
import { inject } from '@vercel/analytics';

import { initNavbar }       from './scripts/navbar';
import { initScrollReveal } from './scripts/scrollReveal';
import { initCountUp }      from './scripts/countUp';
import { initCharts }       from './scripts/charts';

inject();

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initCountUp();
  initCharts();
});
