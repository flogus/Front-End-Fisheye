function mediaDetailFactory(data, photographName) {
  const { id, title, image, video, date, price, likes } = data;

  const gallerieImage = `assets/photographers/${photographName}/${image}`;
  const gallerieVideo = `assets/photographers/${photographName}/${video}`;

  function getUserGallerieDOM() {
    const gallerieCard = document.createElement("div");
    gallerieCard.setAttribute("class", "gallerie--card");
    const gallerie = document.createElement("div");
    gallerieCard.appendChild(gallerie);

    const imageLink = document.createElement("a");
    const anchorName = title.toLowerCase().replaceAll(" ", "-");
    imageLink.setAttribute("href", "#" + anchorName);
    gallerie.setAttribute("id", anchorName);
    imageLink.setAttribute("title", "Ouvrir " + title);
    gallerie.appendChild(imageLink);

    const descrip = document.createElement("div");
    descrip.setAttribute("class", "gallerie--card-description");

    const descripText = document.createElement("div");
    descripText.textContent = title;

    const descripLikes = document.createElement("i");
    descripLikes.textContent = likes;
    descripLikes.setAttribute("class", "fa-solid fa-heart");

    // File type
    if (image !== undefined) {
      const img = document.createElement("img");
      img.src = gallerieImage;
      const ratio = img.width / img.height;
      let orientationClass = "";

      imageLink.appendChild(img);
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
      imageLink.setAttribute("imageName", image);
    }
    if (video !== undefined) {
      const video = document.createElement("video");
      //video.setAttribute("controls", "");
      const source = document.createElement("source");
      //console.log("Video ratio : ", gallerieVideo);
      source.src = gallerieVideo;
      source.type = "video/mp4";

      video.appendChild(source);
      imageLink.appendChild(video);
    }

    descrip.appendChild(descripText);
    descrip.appendChild(descripLikes);
    gallerie.appendChild(descrip);
    return gallerieCard;
  }
  return { getUserGallerieDOM };
}
