const lightbox = document.querySelector('.product-lightbox');
const lightboxImage = lightbox?.querySelector('.product-lightbox-image');
const lightboxCaption = lightbox?.querySelector('.product-lightbox-caption');
if (navigator.maxTouchPoints > 0) document.body.classList.add('has-photo-swipe');

for (const product of document.querySelectorAll('.merch-product')) {
  const hero = product.querySelector('.product-hero');
  const zoom = product.querySelector('.product-zoom');
  const caption = product.querySelector('.product-gallery-view');
  const count = product.querySelector('.product-gallery-count');
  const thumbnails = [...product.querySelectorAll('.product-thumbnail')];
  let touchStart = null;
  let suppressClickUntil = 0;

  zoom.addEventListener('touchstart', (event) => {
    touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  }, { passive: true });
  zoom.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });
  zoom.addEventListener('touchend', (event) => {
    if (!touchStart || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) < 48 || Math.abs(dy) > Math.abs(dx) * .7) return;
    suppressClickUntil = Date.now() + 400;
    const current = thumbnails.findIndex(item => item.getAttribute('aria-current') === 'true');
    const next = (current + (dx < 0 ? 1 : -1) + thumbnails.length) % thumbnails.length;
    thumbnails[next].click();
  }, { passive: true });

  for (const [index, thumbnail] of thumbnails.entries()) {
    thumbnail.addEventListener('click', (event) => {
      event.preventDefault();
      hero.srcset = thumbnail.dataset.srcset;
      hero.src = thumbnail.dataset.src;
      hero.alt = thumbnail.dataset.alt;
      zoom.href = thumbnail.href;
      zoom.setAttribute('aria-label', `${thumbnail.dataset.alt} – enlarge photograph`);
      caption.textContent = thumbnail.dataset.view;
      count.textContent = `${index + 1} / ${thumbnails.length}`;
      for (const item of thumbnails) item.removeAttribute('aria-current');
      thumbnail.setAttribute('aria-current', 'true');
    });
  }

  zoom.addEventListener('click', (event) => {
    if (Date.now() < suppressClickUntil) { event.preventDefault(); return; }
    if (!lightbox || typeof lightbox.showModal !== 'function') return;
    event.preventDefault();
    lightboxImage.src = zoom.href;
    lightboxImage.alt = hero.alt;
    lightboxCaption.textContent = hero.alt;
    lightbox.showModal();
  });
}

lightbox?.querySelector('.product-lightbox-close').addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', (event) => {
  const box = lightbox.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) lightbox.close();
});
