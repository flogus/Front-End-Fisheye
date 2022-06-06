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
      console.error("Erreur fetch");
    });

  return {
    photographers,
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographers_details");

  photographers.forEach((photographer) => {
    const photographerModel = new PhotographerFactory(photographer, "details");
    console.log("photographerModel", photographerModel);

    photographersSection.innerHTML += photographerModel.detailTemplate;
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
