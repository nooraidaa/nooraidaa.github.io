document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const threshold = 120;

  if (nav) {
    const onScroll = () => nav.classList.toggle('shrink', window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function smoothScrollTo(targetY, duration = 800) {
    const startY = window.scrollY;
    const diff = targetY - startY;
    let startTime;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const time = timestamp - startTime;
      const progress = Math.min(time / duration, 1);

      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startY + diff * ease);

      if (time < duration) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }
  
  document.querySelectorAll('.nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();

      if (nav && !nav.classList.contains('shrink')) {
        nav.classList.add('shrink');
      }

      const mid = target.offsetTop + target.offsetHeight / 2;
      const top = mid - window.innerHeight / 2;

      smoothScrollTo(top, 1000); //
    });
  });

  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', () => {
      smoothScrollTo(0, 1000);
    });
  }
});
