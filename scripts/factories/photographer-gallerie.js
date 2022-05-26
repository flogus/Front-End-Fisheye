function photographerGallerieFactory(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserGallerieDOM() {
    const gallerie = document.createElement("div");
    return gallerie;
  }
  return { getUserGallerieDOM };
}
