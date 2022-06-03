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
async function displayData(photographers, medias) {
  // Get Id param
  const QueryString = window.location.search;
  const urlParams = new URLSearchParams(QueryString);
  const currentPhotographerId = urlParams.get("id");
  console.log("currentPhotographerId", currentPhotographerId);
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

  //console.log("newPhotographers", photographers);
  const photographerInfos = document.getElementById("headerInfos");
  const photographerPhoto = document.getElementById("headerPhoto");
  const photographersSectionButton = document.querySelector(".contact_button");
  let currentPhotographerPrice = "";
  let currentPhotographerName = "";
  // Construction du block information du photographe
  photographers.forEach((photographer) => {
    if (photographer.id == currentPhotographerId) {
      const photographerHeaderModel = new PhotographerHeader(photographer);
      console.log("photographerHeaderModel", photographerHeaderModel);
      currentPhotographerPrice = photographer.price;
      console.log("currentPhotographerPrice", currentPhotographerPrice);
      currentPhotographerName = photographer.name;
      photographerInfos.innerHTML += photographerHeaderModel.headerInfos;
      photographerPhoto.innerHTML += photographerHeaderModel.headerPhoto;
    }
  });

  const photographerdGallerie = document.getElementById("photograph-gallerie");
  const photographName = photographers.name;

  medias.forEach((media) => {
    if (media.photographerId == currentPhotographerId) {
      media.name = currentPhotographerName;
      const mediaModel = new PhotographerGallerieBlock(media);
      photographerdGallerie.innerHTML += mediaModel.gallerieBlock;
    }
  });

  // Bottom infos
  //bottom-infos-dayprice
  const bottomInfosTotallikes = document.getElementById(
    "bottom-infos-totallikes"
  );
  bottomInfosTotallikes.textContent = currentPhotographerTotallikes;
  const bottomInfosDayprice = document.getElementById("bottom-infos-dayprice");
  bottomInfosDayprice.textContent = currentPhotographerPrice + "€ / jour";
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  const { medias } = await getMedias("totallikes");
  displayData(photographers, medias);

  // gallerie
  const imageLinks = document.querySelectorAll(".gallerie--card a");

  imageLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      displayModal("media", link.getAttribute("imageName"));
    });
  });
}

init();
