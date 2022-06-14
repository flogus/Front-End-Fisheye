const globalImagesPath = "assets/images/";
const globalPhotosPath = "assets/photographers/";

async function getPhotographers() {
  const photographers = await fetch("./data/photographers.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
      return data.photographers;
    })
    .catch((err) => {
      console.error("Erreur fetch photographers");
    });

  return {
    photographers,
  };
}
async function getMedias() {
  const medias = await fetch("./data/photographers.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
      return data.media;
    })
    .catch((err) => {
      console.error("Erreur fetch media");
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
  const photographerInfos = document.getElementById("headerInfos");
  const photographerPhoto = document.getElementById("headerPhoto");

  const photographerHeaderModel = new PhotographerHeader(
    currentPhotographerData
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
      //console.log("photograph name", (await allMedias).medias[value]);
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
  let photographeName = "";
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
  let currentPhotographerData = "";
  photographers.forEach((photographer, index) => {
    if (photographer.id == currentPhotographerId) {
      currentPhotographerData = photographers[index];
    }
  });
  return currentPhotographerData;
}

/**
 * Build photograph gallerie
 */
async function gallerieBuilder() {
  const gallerieContainer = document.getElementById("photograph-gallerie");
  const currentSelectedtri = document.getElementById("selectFiltres").value;
  const currentMedia = await getMediasOfPhotographer();

  if (currentSelectedtri == "likes") {
    currentMedia.sort((b, a) =>
      a.likes
        .toString()
        .localeCompare(b.likes.toString(), "en", { numeric: "true" })
    );
  }
  if (currentSelectedtri == "date") {
    currentMedia.sort((a, b) => a.date.localeCompare(b.date));
  }
  if (currentSelectedtri == "titre") {
    currentMedia.sort((a, b) => a.title.localeCompare(b.title));
  }
  gallerieContainer.innerHTML = "";

  currentMedia.forEach(function (currentMedia, index) {
    // console.log(`${index}`, currentMedia);
    const mediaModel = new PhotographerGallerieBlock(
      currentMedia,
      currentPhotographerName
    );
    gallerieContainer.innerHTML += mediaModel.gallerieBlock;
  });
}

async function displayData(photographers, medias) {
  let currentPhotographerTotallikes = 0;

  photographers.forEach((photographer) => {
    photographer.medias = [];
    medias.forEach((media) => {
      if (photographer.id == media.photographerId) {
        photographer.medias.push(media.id);
        if (media.photographerId == currentPhotographerId) {
          currentPhotographerTotallikes =
            currentPhotographerTotallikes + media.likes;
        }
      }
    });
  });

  let currentPhotographerPrice = "";

  // Build the photographer block with informations and photo profil
  currentPhotographerData = await getCurrentPhotographerData(photographers);
  buildPhotographHeader(currentPhotographerData);

  function buildGallerieBlock(media) {
    const mediaModel = new PhotographerGallerieBlock(
      media,
      currentPhotographerName
    );
    photographerdGallerie.innerHTML += mediaModel.gallerieBlock;
  }

  const photographerdGallerie = document.getElementById("photograph-gallerie");

  const currentMedia = await getMediasOfPhotographer();

  gallerieBuilder();

  // Bottom infos
  //bottom-infos-dayprice
  const bottomInfosTotallikes = document.getElementById(
    "bottom-infos-totallikes"
  );
  bottomInfosTotallikes.textContent = currentPhotographerTotallikes;
  bottomInfosTotallikes.setAttribute("value", currentPhotographerTotallikes);
  const bottomInfosDayprice = document.getElementById("bottom-infos-dayprice");
  bottomInfosDayprice.textContent = currentPhotographerPrice + "€ / jour";
}

function addEventChange() {
  const dataSelectedTri = document.getElementById("selectFiltres");
  document
    .getElementById("selectFiltres")
    .addEventListener("change", function (event) {
      console.log(this.options[event.target.selectedIndex].value);
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
  const { medias } = await getMedias("totallikes");

  const currentPhotographerName = await getCurrentPhotographerName(
    photographers
  );
  displayData(photographers, medias);

  buildMediaPath(currentPhotographerName);
  addEventChange();
}

init();
