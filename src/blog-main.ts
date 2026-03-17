import './styles/index.css';
import { inject } from '@vercel/analytics';

import { initNavbar }       from './scripts/navbar';
import { initScrollReveal } from './scripts/scrollReveal';

inject();

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();

  // Reading progress bar
  const bar = document.getElementById('reading-progress');
  if (bar) {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${Math.min(100, (scrollTop / docHeight) * 100)}%`;
    };
    window.addEventListener('scroll', update, { passive: true });
  }
});
