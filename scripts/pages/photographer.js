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
      console.log("Erreur fetch photographers");
    });

  return {
    photographers,
  };
}
async function getMedias() {
  const medias = await fetch("./data/photographers.json")
    .then((response) => {
      //console.log("response media", response);
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
      return data.media;
      console.log("Json media", data);
    })
    .catch((err) => {
      console.log("Erreur fetch media");
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
  const photographersSection = document.querySelector(".photograph-header");
  const photographersSectionButton = document.querySelector(".contact_button");
  let currentPhotographerPrice = "";
  // Construction du block information du photographe
  photographers.forEach((photographer) => {
    if (photographer.id == currentPhotographerId) {
      const photographerModel = photographerDetailFactory(photographer);
      const userDetailDOM = photographerModel.getUserDetailDOM();
      const userPicture = photographerModel.getUserPictureDOM();
      currentPhotographerPrice = photographer.price;
      console.log("currentPhotographerPrice", currentPhotographerPrice);
      photographersSection.prepend(userDetailDOM);
      photographersSection.appendChild(userPicture);
    }
  });

  const photographerdGallerie = document.getElementById("photograph-gallerie");
  const photographName = photographers.name;

  medias.forEach((media) => {
    if (media.photographerId == currentPhotographerId) {
      const mediaModel = mediaDetailFactory(media, currentPhotographerId);
      const mediaDetail = mediaModel.getUserGallerieDOM();
      photographerdGallerie.appendChild(mediaDetail);
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
