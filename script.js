document.addEventListener('DOMContentLoaded', () => {
  const now = new Date();
  const formatDate = (date) => date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const heroDate = document.getElementById('hero-date');
  const footDate = document.getElementById('foot-date');
  if (heroDate) heroDate.textContent = formatDate(now);
  if (footDate) footDate.textContent = formatDate(now);

  const fills = document.querySelectorAll('.cal-fill');
  fills.forEach((fill) => {
    const target = Number(fill.dataset.target);
    if (!Number.isFinite(target)) return;

    const meter = fill.closest('.cal-meter');
    const percentage = meter ? meter.querySelector('.cal-pct') : null;
    const duration = 900;
    const start = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);

      fill.style.width = `${current}%`;
      if (percentage) percentage.textContent = `${current}%`;

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const revealTargets = document.querySelectorAll('.pillar-card, .project-row, .note-row');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observerInstance.unobserve(entry.target);
      });
    }, { threshold: 0.08 });

    revealTargets.forEach((target) => {
      target.classList.add('reveal');
      observer.observe(target);
    });
  }
});
