const dialog = document.querySelector('.lightbox');
if (dialog) {
  const image = dialog.querySelector('.lightbox-image');
  const frontend = dialog.querySelector('.lightbox-frontend');
  const frame = frontend.querySelector('iframe');
  const title = dialog.querySelector('#lightbox-title');
  const close = dialog.querySelector('.lightbox-close');
  let previousFocus;

  function sizeFrontend() {
    const available = Math.min(window.innerWidth - 48, 1100);
    const scale = Math.min(1.1, available / 1000);
    frontend.style.setProperty('--preview-scale', scale);
    frontend.style.width = `${1000 * scale}px`;
    frontend.style.height = `${610 * scale}px`;
  }

  document.querySelectorAll('[data-lightbox]').forEach(button => {
    button.addEventListener('click', () => {
      previousFocus = button;
      title.textContent = button.dataset.title;
      const isArchitecture = button.dataset.lightbox === 'architecture';
      image.hidden = !isArchitecture;
      frontend.hidden = isArchitecture;
      if (isArchitecture) {
        image.src = button.dataset.src;
        image.alt = button.dataset.title;
      } else {
        frame.src = button.dataset.src;
        sizeFrontend();
      }
      dialog.showModal();
      close.focus();
    });
  });

  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    frame.removeAttribute('src');
    image.removeAttribute('src');
    previousFocus?.focus();
  });
  window.addEventListener('resize', () => {
    if (dialog.open && !frontend.hidden) sizeFrontend();
  });
}
