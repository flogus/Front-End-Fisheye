function addLightBoxLink() {
  // console.log("addLightBoxLink", addLightBoxLink);
  // Ajouter les evenements sur les medias pour la lightbox
  const imageLinks = document.querySelectorAll('.gallerie--card a');

  imageLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      openModal('media', link);
    });
  });
}
