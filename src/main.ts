import './styles/index.css';

import { initNavbar }       from './scripts/navbar';
import { initScrollReveal } from './scripts/scrollReveal';
import { initCountUp }      from './scripts/countUp';
import { initCharts }       from './scripts/charts';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initCountUp();
  initCharts();
});
