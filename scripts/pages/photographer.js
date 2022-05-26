/*
      console.log("Json", data.photographers, data.photographers[0].id);
      console.log(data.photographers.filter((element) => element.id == 82));
      const currentPhotographer = data.photographers.filter(
        (element) => element.id == 82
      );
*/
async function getPhotographers() {
  const photographers = await fetch("./data/photographers.json")
    .then((response) => {
      console.log("response photographers", response);
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
      return data.photographers;
      console.log("Json photographers", data);
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
      console.log("response media", response);
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
  // console.log("photographer", photographers);
  // console.log("medias", medias);

  const photographersSection = document.querySelector(".photograph-header");
  const photographersSectionButton = document.querySelector(".contact_button");

  photographers.forEach((photographer) => {
    const photographerModel = photographerDetailFactory(photographer);
    const userDetailDOM = photographerModel.getUserDetailDOM();
    const userPicture = photographerModel.getUserPictureDOM();
    /*photographersSection.insertBefore(
      userDetailDOM,
      photographersSectionButton
    );*/
    photographersSection.appendChild(userDetailDOM);
    photographersSection.appendChild(userPicture);
  });

  const photographerdGallerie = document.getElementById("photograph-gallerie");
  console.log("photographerdGallerie : ", photographerdGallerie);
  medias.forEach((media) => {
    if (media.photographerId == "82") {
      const mediaModel = mediaDetailFactory(media);
      const mediaDetail = mediaModel.getUserGallerieDOM();

      console.log("photo", media.id);
      photographerdGallerie.appendChild(mediaDetail);
    }
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  const { medias } = await getMedias();
  displayData(photographers, medias);
}

init();
