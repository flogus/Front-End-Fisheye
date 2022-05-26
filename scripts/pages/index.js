async function getPhotographers() {
  const photographers = await fetch("./data/photographers.json")
    .then((response) => {
      console.log("response", response);
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
      return data.photographers;
      console.log("Json", data);
    })
    .catch((err) => {
      console.log("Erreur fetch");
    });

  return {
    photographers,
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
