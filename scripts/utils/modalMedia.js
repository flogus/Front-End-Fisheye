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

  if (nbSetPN == 0) {
    setPrevNext(allModalData, index);
    nbSetPN = 1;
  }
}
function setMedia(media) {
  document
    .getElementById("mediaImage")
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
  // modalMediaPrev.removeEventListener("click", clickPrev);
  modalMediaPrev.addEventListener("click", clickPrev);
  const modalMediaNext = document.getElementById("modalMediaNext");
  // modalMediaNext.removeEventListener("click", clickNext);
  modalMediaNext.addEventListener("click", clickNext);

  function clickPrev() {
    index--;
    if (index == -1) {
      index = allModalData.length - 1;
    }
    console.log("modalMediaPrev Index", index);
  }

  function clickNext() {
    index++;
    if (index == allModalData.length) {
      index = 0;
    }
    console.log("modalMediaNext Index", index);
  }
}

function changeModalData() {
  console.log("changeModalData > mediaName", mediaName);
  const extension = mediaName.split(".")[1];
  const mediaContainer = document.getElementById("media");
  if (extension == "mp4") {
    mediaContainer.querySelector("img").setAttribute("style", "display:none");
    mediaContainer
      .querySelector("video")
      .setAttribute("style", "display:block");
    mediaContainer.querySelector("source").setAttribute("src", mediaName);
    //console.log("Change video source : ", mediaName);
  } else {
    mediaContainer.querySelector("img").setAttribute("style", "display:block");
    mediaContainer.querySelector("img").setAttribute("src", mediaName);
    mediaContainer.querySelector("img").setAttribute("alt", mediaName);
    mediaContainer.querySelector("video").setAttribute("style", "display:none");
  }
  //buildLinksPrevNext(mediaName);
}

const contactButton = document.getElementById("contact_button");
contactButton.addEventListener("click", function () {
  displayModal("contact", "");
});
