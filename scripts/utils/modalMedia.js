const mediaModal = document.getElementById("media_modal");
let nbSetPN = 0;

function openModal(target, link, index) {
  const currentPhotoId = link.id;
  const allModalData = JSON.parse(
    document.getElementById("photograph-gallerie").dataset.medias
  );
  const modal = document.getElementById(target + "_modal");
  modal.style.display = "flex";

  setMedia(allModalData[index].media);
  setTitle(allModalData[index].title);

  setPrevNext(allModalData, index);

  escapeCloseModal("media");
}
function setMedia(media) {
  const extention = media.split(".").pop();

  let mediaIdTarget = "mediaImage";
  if (extention == "mp4") {
    // mediaIdTarget = "mediaVideo";
    // document
    //   .querySelector("#media video")
    //   .setAttribute("style", "display:block");
    document.querySelector("#mediaImage").setAttribute("style", "display:none");
    const videoPlayer = document.createElement("video");
    videoPlayer.setAttribute("controls", "");
    videoPlayer.setAttribute("autoplay", "");
    videoPlayer.setAttribute("muted", "");

    const videoSrc = document.createElement("source");
    videoSrc.setAttribute(
      "src",
      globalPhotosPath + currentPhotographerName.split(" ")[0] + "/" + media
    );
    videoSrc.setAttribute("type", "video/mp4");
    videoPlayer.append(videoSrc);
    document.querySelector("#media").prepend(videoPlayer);
  } else {
    if (document.body.contains(document.querySelector("#media video"))) {
      document.querySelector("#media video").remove();
    }
    document
      .querySelector("#mediaImage")
      .setAttribute("style", "display:block");
  }

  // Set media
  document
    .getElementById(mediaIdTarget)
    .setAttribute(
      "src",
      globalPhotosPath + currentPhotographerName.split(" ")[0] + "/" + media
    );
}
function setTitle(title) {
  document.getElementById("mediaTitle").textContent = title;
}

function setPrevNext(allModalData, index) {
  if (nbSetPN == 0) {
    const modalMediaPrev = document.getElementById("modalMediaPrev");
    const modalMediaNext = document.getElementById("modalMediaNext");

    modalMediaPrev.addEventListener("click", clickPrev);
    modalMediaNext.addEventListener("click", clickNext);

    setArrowsListeners();
    nbSetPN = 1;
  }

  function clickPrev() {
    index--;
    if (index == -1) {
      index = allModalData.length - 1;
    }
    setMedia(allModalData[index].media);
    setTitle(allModalData[index].title);
    console.log("modalMediaPrev Index", index);
  }

  function clickNext() {
    index++;
    if (index == allModalData.length) {
      index = 0;
    }
    setMedia(allModalData[index].media);
    setTitle(allModalData[index].title);
    console.log("modalMediaNext Index", index);
  }
  function setArrowsListeners() {
    document.addEventListener("keydown", function (event) {
      const key = event.key;
      switch (key) {
        case "ArrowLeft":
          clickPrev();
          break;
        case "ArrowRight":
          clickNext();
          break;
      }
    });
  }
}

const contactButton = document.getElementById("contact_button");
contactButton.addEventListener("click", function () {
  openModalContact();
});
function setArrows() {
  console.log("setArrows");
  const prevArrow = document.getElementById("modalMediaPrev");

  document.onkeydown = function (evt) {
    console.log(`${evt.code}`);

    if (evt.key === "ArrowLeft") {
      clickPrev();
    }
    if (evt.key === "ArrowRight") {
      clickNext();
    }
  };
}

function openModalContact() {
  const contactModal = document.getElementById("contact_modal");
  document.getElementById("contact-name").textContent = currentPhotographerName;
  contactModal.style.display = "flex";
  escapeCloseModal("contact");
}
