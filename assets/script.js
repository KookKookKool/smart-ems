document.addEventListener('DOMContentLoaded', () => {
  const heroImg = document.querySelector('.bottom-anim-img');
  const heroText = document.getElementById('heroOverlayText');
  const heroInfoCard = document.querySelector('.hero-info-card');
  if (!heroImg) return;

  // Set initial state
  heroImg.style.opacity = '1';
  heroImg.style.transformOrigin = 'bottom center';
  if (heroText) {
    heroText.style.opacity = '1';
    heroText.style.transform = 'translate(-50%, -50%) scale(1.6)';
  }
  if (heroInfoCard) {
    heroInfoCard.style.transform = 'translateY(0)';
    heroInfoCard.style.transition = 'transform 0.4s cubic-bezier(.4,0,.2,1), opacity 0.4s cubic-bezier(.4,0,.2,1)';
  }

  // Parallax lid open based on scroll
  function updateHeroParallax() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    // Animation progress for image
    let progress = Math.max(Math.min(scrollY / (vh * 0.6), 1), 0);
    const rotate = 90 - 90 * progress;
    const scale = 0.8 + 0.2 * progress;
    const translateY = 100 - 100 * progress;
    heroImg.style.transform = `translateY(${translateY}%) scale(${scale}) rotateX(${rotate}deg)`;

    // Animation for overlay text: shrink and fade out
    if (heroText) {
      // Text shrinks and fades out as scroll progresses
      const textScale = 1.6 - 0.6 * progress;
      const textOpacity = 1 - progress * 1.2;
      heroText.style.transform = `translate(-50%, -50%) scale(${textScale})`;
      heroText.style.opacity = textOpacity < 0 ? 0 : textOpacity;
    }
    // Animate info card down 100px as scroll progresses
    if (heroInfoCard) {
      const cardTranslate = 100 * progress;
      heroInfoCard.style.transform = `translateY(${cardTranslate}px)`;
    }
  }

  window.addEventListener('scroll', updateHeroParallax);
  window.addEventListener('resize', updateHeroParallax);
  updateHeroParallax(); // initial

  // Animate showcase numbers on scroll into view
  function animateShowcaseNumbers() {
    const numbers = document.querySelectorAll('.showcase-number');
    numbers.forEach(num => {
      if (num.dataset.animated) return;
      const rect = num.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        num.dataset.animated = 'true';
        const target = parseInt(num.dataset.target, 10);
        let current = 0;
        const duration = 1200;
        const start = performance.now();
        function update(ts) {
          const elapsed = ts - start;
          const progress = Math.min(elapsed / duration, 1);
          let value = Math.floor(progress * target);
          if (num.dataset.target === '98') {
            value = Math.floor(progress * target);
            num.textContent = value >= target ? target + '%' : value + '%';
          } else {
            num.textContent = value >= target ? target : value;
          }
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            if (num.dataset.target === '98') {
              num.textContent = target + '%';
            } else {
              num.textContent = target;
            }
          }
        }
        requestAnimationFrame(update);
      }
    });
  }
  window.addEventListener('scroll', animateShowcaseNumbers);
  window.addEventListener('resize', animateShowcaseNumbers);
  animateShowcaseNumbers();
});

