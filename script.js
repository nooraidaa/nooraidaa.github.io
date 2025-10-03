document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const threshold = 120;

  // --- Shrink-nav scrollissa ---
  if (nav) {
    const onScroll = () => nav.classList.toggle('shrink', window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // --- Custom smooth scroll funktio (easeInOutCubic) ---
  function smoothScrollTo(targetY, duration = 800) {
    const startY = window.scrollY;
    const diff = targetY - startY;
    let startTime;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const time = timestamp - startTime;
      const progress = Math.min(time / duration, 1);

      // easeInOutCubic
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startY + diff * ease);

      if (time < duration) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  // --- Klikkaus navigaatiopalloihin ---
  document.querySelectorAll('.nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();

      // Jos nav ei vielä shrinkannut, shrinkkaa se
      if (nav && !nav.classList.contains('shrink')) {
        nav.classList.add('shrink');
      }

      // Laske kohteen keskikohta
      const mid = target.offsetTop + target.offsetHeight / 2;
      const top = mid - window.innerHeight / 2;

      smoothScrollTo(top, 1000); // scrollaa 1 sekunnissa
    });
  });

  // --- Back to top -nappi ---
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    // Näytetään nappi kun scrollattu alas
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    // Klikkaus -> scrollaa ylös smoothilla easingillä
    backToTop.addEventListener('click', () => {
      smoothScrollTo(0, 1000);
    });
  }
});
