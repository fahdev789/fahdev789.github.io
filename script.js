// Animate calibration bars once they scroll into view
const fills = document.querySelectorAll('.cal-fill');
const pcts = document.querySelectorAll('.cal-pct');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const row = entry.target;
      const fill = row.querySelector('.cal-fill');
      const pct = row.querySelector('.cal-pct');
      const target = parseInt(fill.dataset.target, 10);

      fill.style.width = target + '%';

      let current = 0;
      const step = Math.max(1, Math.round(target / 40));
      const timer = setInterval(() => {
        current = Math.min(target, current + step);
        pct.textContent = current + '%';
        if (current >= target) clearInterval(timer);
      }, 20);

      observer.unobserve(row);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.cal-row').forEach(row => observer.observe(row));

// Dates
const now = new Date();
const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
const heroDate = document.getElementById('hero-date');
const footDate = document.getElementById('foot-date');
if (heroDate) heroDate.textContent = dateStr;
if (footDate) footDate.textContent = dateStr;
