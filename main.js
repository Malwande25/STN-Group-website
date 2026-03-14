/* ══════════════════════════════════════════════
   STN GROUP — main.js
   ══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll-reveal animation ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── Stagger child cards in grids ── */
  document.querySelectorAll('.industries-grid, .adv-grid, .values-grid').forEach(grid => {
    grid.querySelectorAll('.industry-card, .adv-card, .value-card').forEach((card, i) => {
      card.classList.add('reveal');
      card.style.transitionDelay = `${i * 0.07}s`;
      revealObserver.observe(card);
    });
  });

  /* ── Nav: darken on scroll ── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 80
      ? 'rgba(13,26,13,0.97)'
      : 'rgba(13,26,13,0.85)';
  }, { passive: true });

  /* ── Nav: highlight active section link ── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.style.color = isActive ? 'var(--gold)' : '';
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(sec => sectionObserver.observe(sec));

});
