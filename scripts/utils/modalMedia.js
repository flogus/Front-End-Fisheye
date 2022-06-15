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

  escapeCloseModal();
}
function setMedia(media) {
  const extention = media.split(".").pop();

  let mediaIdTarget = "mediaImage";
  if (extention == "mp4") {
    mediaIdTarget = "mediaVideo";
    document
      .querySelector("#media video")
      .setAttribute("style", "display:block");
    document.querySelector("#mediaImage").setAttribute("style", "display:none");
  } else {
    document
      .querySelector("#media video")
      .setAttribute("style", "display:none");
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
  const modalMediaPrev = document.getElementById("modalMediaPrev");
  const modalMediaNext = document.getElementById("modalMediaNext");
  if (nbSetPN == 0) {
    modalMediaPrev.addEventListener("click", clickPrev);
    modalMediaNext.addEventListener("click", clickNext);
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

  document.onkeydown = function (evt) {
    if (evt.key == "ArrowLeft") {
      index--;
      console.log("ArrowLeft");
      setMedia(allModalData[index].media);
      setTitle(allModalData[index].title);
    }
    if (evt.key == "ArrowRight") {
      index++;
      console.log("ArrowRight");
      setMedia(allModalData[index].media);
      setTitle(allModalData[index].title);
    }
  };
}

const contactButton = document.getElementById("contact_button");
contactButton.addEventListener("click", function () {
  openModalContact();
});

function openModalContact() {
  const contactModal = document.getElementById("contact_modal");

  document.getElementById("contact-name").textContent = currentPhotographerName;

  console.log(currentPhotographerName);
  contactModal.style.display = "flex";
}
