(function () {
  const openBtn = document.getElementById('regalo-open-btn');
  const modal = document.getElementById('regalo-modal');
  const closeBtn = document.getElementById('regalo-modal-close');

  if (!openBtn || !modal || !closeBtn) return;

  const texts = openBtn.dataset.texts.split('|');
  let step = 0;

  function openModal() {
    modal.classList.add('is-open');
  }

  function closeModal() {
    modal.classList.remove('is-open');
  }

  openBtn.addEventListener('click', function () {
    if (step < texts.length - 1) {
      step += 1;
      openBtn.textContent = texts[step];
    } else {
      openModal();
    }
  });

  closeBtn.addEventListener('click', closeModal);

  // Cerrar también haciendo click en el fondo oscurecido (fuera de la carta)
  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
})();
