function mediaDetailFactory(data, photographName) {
  const { id, title, image, video, likes } = data;

  const gallerieImage = `assets/photographers/${photographName}/${image}`;
  const gallerieVideo = `assets/photographers/${photographName}/${video}`;

  // Construction de la gallerie
  function getUserGallerieDOM() {
    const gallerieCard = document.createElement("div");
    gallerieCard.setAttribute("class", "gallerie--card");

    const gallerie = document.createElement("div");
    const anchorName = title.toLowerCase().replaceAll(" ", "-");
    gallerie.setAttribute("id", anchorName);

    const imageLink = document.createElement("a");
    imageLink.setAttribute("href", "#" + anchorName);
    imageLink.setAttribute("title", "Ouvrir " + title);

    const descrip = document.createElement("div");
    descrip.setAttribute("class", "gallerie--card-description");

    const descripText = document.createElement("div");
    descripText.textContent = title;

    const descripLikes = document.createElement("span");
    descripLikes.textContent = likes;

    const descripHeart = document.createElement("img");
    descripHeart.setAttribute("src", "assets/icons/heart.svg");
    descripHeart.setAttribute("class", "svg-color heart");

    // File type
    if (image !== undefined) {
      const img = document.createElement("img");
      img.src = gallerieImage;
      const ratio = img.width / img.height;
      let orientationClass = "";

      if (ratio == 1) {
        orientationClass = "orientation-square";
      }
      if (ratio > 1) {
        orientationClass = "orientation-landscape";
      }
      if (ratio < 1) {
        orientationClass = "orientation-portrait";
      }
      imageLink.setAttribute("class", orientationClass);
      imageLink.setAttribute("imageName", photographName + "/" + image);
      imageLink.appendChild(img);
    }
    if (video !== undefined) {
      const video = document.createElement("video");
      const source = document.createElement("source");
      source.src = gallerieVideo;
      source.type = "video/mp4";

      video.appendChild(source);
      imageLink.appendChild(video);
    }
    gallerieCard.appendChild(gallerie);

    gallerie.appendChild(imageLink);

    descrip.appendChild(descripText);
    descrip.appendChild(descripLikes);
    descrip.appendChild(descripHeart);
    gallerie.appendChild(descrip);
    return gallerieCard;
  }
  return { getUserGallerieDOM };
}
