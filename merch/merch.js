const lightbox = document.querySelector('.product-lightbox');
const lightboxImage = lightbox?.querySelector('.product-lightbox-image');
const lightboxCaption = lightbox?.querySelector('.product-lightbox-caption');

for (const product of document.querySelectorAll('.merch-product')) {
  const hero = product.querySelector('.product-hero');
  const zoom = product.querySelector('.product-zoom');
  const caption = product.querySelector('.product-gallery-view');
  const count = product.querySelector('.product-gallery-count');
  const thumbnails = [...product.querySelectorAll('.product-thumbnail')];

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
