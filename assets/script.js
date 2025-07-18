// Monitor Zoom In then Out on Scroll (Apple-style)
function monitorZoomHandler() {
  const img = document.getElementById('monitorZoomImg');
  if (!img) return;
  const section = img.closest('.monitor-zoom-section');
  if (!section) return;
  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  // Only animate while section is in viewport
  const trigger = windowHeight * 0.7; // 30vh from top
  if (rect.top < trigger && rect.bottom > 0) {
    // progress: 0 (section top at 30vh) to 1 (section bottom at viewport bottom)
    const progress = Math.min(Math.max((trigger - rect.top) / (windowHeight + rect.height - windowHeight * 0.3), 0), 1);
    let scale = 2 - 2.35 * progress;
    if (scale < 1) scale = 1; // never smaller than normal
    img.style.transform = `scale(${scale})`;
  } else if (rect.top >= trigger) {
    // Before section enters trigger, keep zoomed in
    img.style.transform = 'scale(2)';
  } else if (rect.bottom <= 0) {
    // After section leaves viewport, keep normal
    img.style.transform = 'scale(1)';
  }
}
window.addEventListener('scroll', monitorZoomHandler);
window.addEventListener('resize', monitorZoomHandler);
document.addEventListener('DOMContentLoaded', monitorZoomHandler);
// Apple-style Card Carousel Arrow Scroll
function scrollCarousel(direction) {
  const track = document.getElementById('carouselTrack');
  if (!track) return;
  const card = track.querySelector('.carousel-card');
  if (!card) return;
  const cardWidth = card.offsetWidth + 32; // card width + gap
  const maxScroll = track.scrollWidth - track.clientWidth;
  let newScroll = track.scrollLeft + direction * cardWidth;
  if (newScroll < 0) newScroll = 0;
  if (newScroll > maxScroll) newScroll = maxScroll;
  track.scrollTo({ left: newScroll, behavior: 'smooth' });
}

// Disable arrow buttons at edges
function updateCarouselArrows() {
  const track = document.getElementById('carouselTrack');
  const leftBtn = document.querySelector('.carousel-arrow.left');
  const rightBtn = document.querySelector('.carousel-arrow.right');
  if (!track || !leftBtn || !rightBtn) return;
  leftBtn.disabled = track.scrollLeft <= 0;
  rightBtn.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
}
document.addEventListener('DOMContentLoaded', function() {
  const track = document.getElementById('carouselTrack');
  if (track) {
    track.addEventListener('scroll', updateCarouselArrows);
    updateCarouselArrows();
  }
});
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

