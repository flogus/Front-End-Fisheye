function mediaDetailFactory(data, photographName) {
  const { id, title, image, video, date, price, likes } = data;

  const gallerieImage = `assets/photographers/${photographName}/${image}`;
  const gallerieVideo = `assets/photographers/${photographName}/${video}`;

  function getUserGallerieDOM() {
    const gallerieCard = document.createElement("div");
    gallerieCard.setAttribute("class", "gallerie--card");
    const gallerie = document.createElement("div");
    gallerieCard.appendChild(gallerie);

    const descrip = document.createElement("div");
    descrip.setAttribute("class", "gallerie--card-description");
    const descripText = document.createElement("div");
    const descripLikes = document.createElement("i");
    descripLikes.textContent = likes;
    descripLikes.setAttribute("class", "fa-solid fa-heart");

    // File type
    if (image !== undefined) {
      const img = document.createElement("img");
      img.src = gallerieImage;
      gallerie.appendChild(img);
    }
    if (video !== undefined) {
      const video = document.createElement("video");
      const source = document.createElement("source");
      source.src = gallerieVideo;
      source.type = "video/mp4";
      video.appendChild(source);
      gallerie.appendChild(video);
    }

    //<i class="fa-solid fa-heart"></i>
    descrip.appendChild(descripText);
    descrip.appendChild(descripLikes);
    descripText.textContent = title;
    gallerie.appendChild(descrip);
    return gallerieCard;
  }
  return { getUserGallerieDOM };
}
