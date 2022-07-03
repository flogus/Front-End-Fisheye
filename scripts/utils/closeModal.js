/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
// Fermer une modale avec Escape
function escapeCloseModal(target) {
  document.onkeydown = function (evt) {
    if (evt.key == 'Escape') {
      closeModal(target);
    }
  };
}

function closeModal(target) {
  const modal = document.getElementById(`${target}_modal`);
  document.getElementById('main').setAttribute('aria-hidden', false);
  document.getElementById(`${target}_modal`).setAttribute('aria-hidden', true);

  modal.style.display = 'none';
}

const closeButtons = document.querySelectorAll('.close-modal');
closeButtons.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    closeModal('media');
    closeModal('contact');
  });
});
