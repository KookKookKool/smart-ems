document.addEventListener('DOMContentLoaded', () => {
  const heroImg = document.querySelector('.bottom-anim-img');
  const heroText = document.getElementById('heroOverlayText');
  if (!heroImg) return;

  // Set initial state
  heroImg.style.opacity = '1';
  heroImg.style.transformOrigin = 'bottom center';
  if (heroText) {
    heroText.style.opacity = '1';
    heroText.style.transform = 'translate(-50%, -50%) scale(1.6)';
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
  }

  window.addEventListener('scroll', updateHeroParallax);
  window.addEventListener('resize', updateHeroParallax);
  updateHeroParallax(); // initial
});

