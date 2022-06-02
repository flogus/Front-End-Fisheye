async function getPhotographers() {
  const photographers = await fetch("./data/photographers.json")
    .then((response) => {
      //console.log("response photographers", response);
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
      return data.photographers;
      //console.log("Json photographers", data);
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
  // console.log("photographers", photographers);
  // console.log("medias", medias);
  // Get Id param
  const QueryString = window.location.search;
  const urlParams = new URLSearchParams(QueryString);
  const currentPhotographerId = urlParams.get("id");

  photographers.forEach((photographer) => {
    //console.log("photographer.id", photographer.id);
    photographer.medias = [];
    medias.forEach((media) => {
      if (photographer.id == media.photographerId) {
        photographer.medias.push(media.id);
      }
    });
  });

  //console.log("newPhotographers", photographers);
  const photographersSection = document.querySelector(".photograph-header");
  const photographersSectionButton = document.querySelector(".contact_button");

  // Construction du block information du photographe
  photographers.forEach((photographer) => {
    if (photographer.id == currentPhotographerId) {
      const photographerModel = photographerDetailFactory(photographer);
      const userDetailDOM = photographerModel.getUserDetailDOM();
      const userPicture = photographerModel.getUserPictureDOM();

      photographersSection.prepend(userDetailDOM);
      photographersSection.appendChild(userPicture);
    }
  });

  const photographerdGallerie = document.getElementById("photograph-gallerie");
  //console.log("photographerdGallerie : ", photographerdGallerie);
  const photographName = photographers.name;

  medias.forEach((media) => {
    if (media.photographerId == currentPhotographerId) {
      const mediaModel = mediaDetailFactory(media, currentPhotographerId);
      const mediaDetail = mediaModel.getUserGallerieDOM();

      //console.log("photo", media.id);
      photographerdGallerie.appendChild(mediaDetail);
    }
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  const { medias } = await getMedias();
  displayData(photographers, medias);

  // gallerie
  const imageLinks = document.querySelectorAll(".gallerie--card a");
  //console.log("imageLinks : ", imageLinks[0].getAttribute("imagename"));

  imageLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      displayModal("media", link.getAttribute("imageName"));
    });
  });
}

init();
