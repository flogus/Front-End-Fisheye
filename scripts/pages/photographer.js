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

function buildMediaPath(currentPhotographerName) {
  const pathName = currentPhotographerName.split(" ")[0];
  const portraitName = currentPhotographerName
    .split(" ")
    .join("")
    .split("-")
    .join("");
  const mediaPath = "assets/photographers/" + pathName;
  const portraitPath = "assets/photographers/" + portraitName + ".jpg";
  // console.log("Paths", mediaPath, " > ", portraitPath);
}

/**
 * get the id param of the URL and set the var currentPhotographerId
 * @returns id
 */
function setIdParam() {
  const QueryString = window.location.search;
  const urlParams = new URLSearchParams(QueryString);
  currentPhotographerId = urlParams.get("id");
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

  const photographersSectionButton = document.querySelector(".contact_button");
  let currentPhotographerPrice = "";

  // Build the photographer block with informations and photo profil
  currentPhotographerData = await getCurrentPhotographerData(photographers);
  buildPhotographHeader(currentPhotographerData);

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

  function buildGallerieBlock(media) {
    /*if (media.image !== undefined) {
      mediaList.push(media.image);
    }
    if (media.video !== undefined) {
      mediaList.push(media.video);
    }*/
    const mediaModel = new PhotographerGallerieBlock(
      media,
      currentPhotographerName
    );
    photographerdGallerie.innerHTML += mediaModel.gallerieBlock;
  }

  const photographerdGallerie = document.getElementById("photograph-gallerie");
  // buildGallerie();

  const currentMedia = await getMediasOfPhotographer();
  //console.log("currentMedia", currentMedia);

  Object.values(currentMedia).forEach((currentMedia) => {
    buildGallerieBlock(currentMedia);
  });
  /*

    if (triAttr == "likes") {
      const imageSorted = medias.sort((a, b) =>
        a.likes
          .toString()
          .localeCompare(b.likes.toString(), "en", { numeric: "true" })
      );
    }
    if (triAttr == "date") {
      const dateSorted = medias.sort((a, b) => a.date.localeCompare(b.date));
    }
    if (triAttr == "titre") {
      const titleSorted = medias.sort((a, b) => a.title.localeCompare(b.title));
    }
*/
  // Add clicks on the hearts likes
  const allHearts = document.querySelectorAll(
    "#photograph-gallerie img.svg-heart"
  );
  allHearts.forEach((imgheart) => {
    imgheart.addEventListener("click", function (event) {
      this.nextSibling.textContent = parseInt(this.getAttribute("value")) + 1;

      const totallikes = document
        .getElementById("bottom-infos-totallikes")
        .getAttribute("value");
      const tempTotallikes = parseInt(totallikes) + 1;
      document.getElementById("bottom-infos-totallikes").textContent =
        tempTotallikes;
      document
        .getElementById("bottom-infos-totallikes")
        .setAttribute("value", tempTotallikes);
    });
  });

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

async function addLightBoxLink() {
  // Ajouter les evenements sur les medias pour la lightbox
  const imageLinks = document.querySelectorAll(".gallerie--card a");

  imageLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      openModal("media");
    });
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

  addLightBoxLink();
  buildMediaPath(currentPhotographerName);
}

init();
