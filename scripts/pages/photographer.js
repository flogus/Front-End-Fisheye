const globalImagesPath = 'assets/images/';
const globalPhotosPath = 'assets/photographers/';

async function getPhotographers() {
  const photographers = await fetch('./data/photographers.json')
    .then((response) => response.json())
    .then((data) =>
      // Work with JSON data here
      data.photographers)
    .catch((err) => {
      console.error('Erreur fetch photographers');
    });

  return {
    photographers,
  };
}
async function getMedias() {
  const medias = await fetch('./data/photographers.json')
    .then((response) => response.json())
    .then((data) =>
      // Work with JSON data here
      data.media)
    .catch((err) => {
      console.error('Erreur fetch media');
    });

  return {
    medias,
  };
}

/**
 * build the photograph header
 * @param {*} currentPhotographerData
 */
function buildPhotographHeader(currentPhotographerData) {
  const photographerInfos = document.getElementById('headerInfos');
  const photographerPhoto = document.getElementById('headerPhoto');

  const photographerHeaderModel = new PhotographerHeader(
    currentPhotographerData,
  );
  currentPhotographerPrice = currentPhotographerData.price;
  currentPhotographerName = currentPhotographerData.name;
  photographerInfos.innerHTML = photographerHeaderModel.headerInfos;
  photographerPhoto.innerHTML = photographerHeaderModel.headerPhoto;
}
/**
 * Get the list of medias for the current photographer
 * @returns
 */
async function getMediasOfPhotographer() {
  const allMedias = getMedias();
  const mediasOfPhotographer = [];

  for (const [value] of Object.entries((await allMedias).medias)) {
    // Filter on photographerId
    if (
      (await allMedias).medias[value].photographerId == currentPhotographerId
    ) {
      mediasOfPhotographer.push((await allMedias).medias[value]);
      // console.log("photograph name", (await allMedias).medias[value]);
    }
  }
  // console.log("mediasOfPhotographer ", mediasOfPhotographer);
  return mediasOfPhotographer;
}

/**
 * Filter photographers data and return photographe name
 * @param {*} photographers
 * @returns photographeName
 */
async function getCurrentPhotographerName(photographers) {
  let photographeName = '';
  photographers.forEach((photographer) => {
    if (photographer.id == currentPhotographerId) {
      photographeName = photographer.name;
    }
  });
  return photographeName;
}

/**
 * Filter photographers data and return current photographer data
 * @param {*} photographers
 * @returns
 */
async function getCurrentPhotographerData(photographers) {
  let currentPhotographerData = '';
  photographers.forEach((photographer, index) => {
    if (photographer.id == currentPhotographerId) {
      currentPhotographerData = photographers[index];
    }
  });
  // console.log("currentPhotographerData", currentPhotographerData);
  return currentPhotographerData;
}

/**
 * Build photograph gallerie
 */
async function gallerieBuilder() {
  const gallerieContainer = document.getElementById('photograph-gallerie');
  const currentSelectedtri = document.getElementById('selectFiltres').value;
  const currentMedia = await getMediasOfPhotographer();
  // console.log("gallerieBuilder currentMedia:", currentMedia);
  if (currentSelectedtri == 'likes') {
    currentMedia.sort((b, a) => a.likes
      .toString()
      .localeCompare(b.likes.toString(), 'en', { numeric: 'true' }));
  }
  if (currentSelectedtri == 'date') {
    currentMedia.sort((a, b) => a.date.localeCompare(b.date));
  }
  if (currentSelectedtri == 'titre') {
    currentMedia.sort((a, b) => a.title.localeCompare(b.title));
  }
  gallerieContainer.innerHTML = '';

  const modalData = [];
  const currentMediaName = '';
  currentMedia.forEach((currentMedia, index) => {
    // console.log(`${index}`, currentMedia);
    const mediaModel = new PhotographerGallerieBlock(
      currentMedia,
      currentPhotographerName,
    );
    gallerieContainer.innerHTML += mediaModel.gallerieBlock;

    // console.log(currentMedia.title, currentMedia.image, currentMedia.video);
    const obj = {};
    obj.id = currentMedia.id;
    obj.title = currentMedia.title;
    if (currentMedia.image != undefined) {
      obj.media = currentMedia.image;
    }
    if (currentMedia.video != undefined) {
      obj.media = currentMedia.video;
    }
    modalData.push(obj);

    const imageLinks = document.querySelectorAll('.gallerie--card a');
    imageLinks.forEach((link, index) => {
      link.addEventListener('click', (event) => {
        openModal('media', link, index);
      });
    });
  });

  // console.log("modalData", modalData.stringify);

  document
    .getElementById('photograph-gallerie')
    .setAttribute('data-medias', JSON.stringify(modalData));
}

async function displayData(photographers, medias) {
  let currentPhotographerTotallikes = 0;

  photographers.forEach((photographer) => {
    photographer.medias = [];
    medias.forEach((media) => {
      if (photographer.id == media.photographerId) {
        let tempMedia;
        if (media.image !== undefined) {
          tempMedia = media.image;
        }
        if (media.video !== undefined) {
          tempMedia = media.video;
        }
        photographer.medias.push({
          id: media.id,
          media: tempMedia,
          title: media.title,
        });
        if (media.photographerId == currentPhotographerId) {
          currentPhotographerTotallikes += media.likes;
        }
      }
    });
  });

  const currentPhotographerPrice = '';

  // Build the photographer block with informations and photo profil
  currentPhotographerData = await getCurrentPhotographerData(photographers);
  buildPhotographHeader(currentPhotographerData);

  function buildGallerieBlock(media) {
    const mediaModel = new PhotographerGallerieBlock(
      media,
      currentPhotographerName,
    );
    photographerdGallerie.innerHTML += mediaModel.gallerieBlock;
  }

  const photographerdGallerie = document.getElementById('photograph-gallerie');

  const currentMedia = await getMediasOfPhotographer();

  gallerieBuilder();

  // Bottom infos
  // bottom-infos-dayprice
  const bottomInfosTotallikes = document.getElementById(
    'bottom-infos-totallikes',
  );
  bottomInfosTotallikes.textContent = currentPhotographerTotallikes;
  bottomInfosTotallikes.setAttribute('value', currentPhotographerTotallikes);
  const bottomInfosDayprice = document.getElementById('bottom-infos-dayprice');
  bottomInfosDayprice.textContent = `${currentPhotographerPrice}€ / jour`;
}

function addEventChange() {
  const dataSelectedTri = document.getElementById('selectFiltres');
  document
    .getElementById('selectFiltres')
    .addEventListener('change', (event) => {
      // console.log(this.options[event.target.selectedIndex].value);
      gallerieBuilder();
    });
}

/**
 * defined currentPhotographerId and currentPhotographerName
 */
async function init() {
  const currentPhotographerId = setIdParam();
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  const { medias } = await getMedias('totallikes');

  const currentPhotographerName = await getCurrentPhotographerName(
    photographers,
  );
  displayData(photographers, medias);

  buildMediaPath(currentPhotographerName);
  addEventChange();
}

init();
