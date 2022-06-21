/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
let nbSetPN = 0;

// eslint-disable-next-line no-unused-vars
function openModal(target, link, index) {
  // const currentPhotoId = link.id;
  const allModalData = JSON.parse(
    document.getElementById('photograph-gallerie').dataset.medias,
  );
  const modal = document.getElementById(`${target}_modal`);
  modal.style.display = 'flex';

  setMedia(allModalData[index].media);
  setTitle(allModalData[index].title);
  setPrevNext(allModalData, index);
  escapeCloseModal('media');
}
function setMedia(media) {
  const extention = media.split('.').pop();
  const mediaIdTarget = 'mediaImage';
  const mediaModel = new MediaFactory(media, extention);

  // Remove media
  if (document.body.contains(document.querySelector('#media img'))) {
    document.querySelector('#media img').remove();
  }
  if (document.body.contains(document.querySelector('#media video'))) {
    document.querySelector('#media video').remove();
  }
  // Set media
  if (extention == 'mp4') {
    document.querySelector('#media').prepend(mediaModel.getVideo);
  }
  if (extention == 'jpg') {
    document.querySelector('#media').prepend(mediaModel.getImage);
  }
}
function setTitle(title) {
  document.getElementById('mediaTitle').textContent = title;
}

function setPrevNext(allModalData, index) {
  if (nbSetPN == 0) {
    const modalMediaPrev = document.getElementById('modalMediaPrev');
    const modalMediaNext = document.getElementById('modalMediaNext');

    modalMediaPrev.addEventListener('click', clickPrev);
    modalMediaNext.addEventListener('click', clickNext);

    setArrowsListeners();
    nbSetPN = 1;
  }

  function clickPrev() {
    index -= 1;
    if (index == -1) {
      index = allModalData.length - 1;
    }
    setMedia(allModalData[index].media);
    setTitle(allModalData[index].title);
  }

  function clickNext() {
    index += 1;
    if (index == allModalData.length) {
      index = 0;
    }
    setMedia(allModalData[index].media);
    setTitle(allModalData[index].title);
  }
  function setArrowsListeners() {
    document.addEventListener('keydown', (event) => {
      const { key } = event;
      switch (key) {
        case 'ArrowLeft':
          clickPrev();
          break;
        case 'ArrowRight':
          clickNext();
          break;
        default:
      }
    });
  }
}

const contactButton = document.getElementById('contact_button');
contactButton.addEventListener('click', () => {
  openModalContact();
});

function openModalContact() {
  const contactModal = document.getElementById('contact_modal');
  document.getElementById('contact-name').textContent = currentPhotographerName;
  contactModal.style.display = 'flex';
  escapeCloseModal('contact');
}
