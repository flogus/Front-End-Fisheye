async function getPhotographers() {
  const photographers = await fetch('./data/photographers.json')
    .then((response) => response.json())
    .then((data) => data.photographers)
    .catch((err) => {
      console.error('Erreur fetch');
    });

  return {
    photographers,
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographers_details');
  // Loop on photographers
  photographers.forEach((photographer) => {
    const photographerModel = new PhotographerFactory(photographer, 'details');
    photographersSection.innerHTML += photographerModel.detailTemplate;
  });
}

async function init() {
  // Get photographers data
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
