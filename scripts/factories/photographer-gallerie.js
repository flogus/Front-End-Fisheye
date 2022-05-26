function mediaDetailFactory(data) {
  const { id, portrait, title, image, date, price, name } = data;

  const gallerieImage = `assets/photographers/Tracy/${image}`;

  function getUserGallerieDOM() {
    const gallerieCard = document.createElement("div");
    gallerieCard.setAttribute("class", "gallerie--card");
    const gallerie = document.createElement("div");
    gallerieCard.appendChild(gallerie);

    const descrip = document.createElement("div");
    descrip.setAttribute("class", "gallerie--card-description");
    const descripText = document.createElement("div");
    const descripLikes = document.createElement("div");
    const img = document.createElement("img");
    img.src = gallerieImage;

    descrip.appendChild(descripText);
    descrip.appendChild(descripLikes);
    descripText.textContent = title;
    descripLikes.textContent = "Like";

    gallerie.appendChild(img);
    gallerie.appendChild(descrip);
    //gallerie.textContent = id + title + name;
    return gallerieCard;
  }
  return { getUserGallerieDOM };
}
