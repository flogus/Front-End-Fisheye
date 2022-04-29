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

  const photographerslocal = [
    {
      name: "Ma data test",
      id: 1,
      city: "Paris",
      country: "France",
      tagline: "Ceci est ma data test",
      price: 400,
      portrait: "account.png",
    },
    {
      name: "Autre data test",
      id: 2,
      city: "Londres",
      country: "UK",
      tagline: "Ceci est ma data test 2",
      price: 500,
      portrait: "account.png",
    },
  ];
  console.log("photographerslocal", photographerslocal);
  // et bien retourner le tableau photographers seulement une fois
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
