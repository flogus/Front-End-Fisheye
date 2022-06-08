function displayModal(target, mediaName) {
  console.log("target", target, "mediaName", mediaName);
  const modal = document.getElementById(target + "_modal");
  console.log("imageName:", mediaName, " - modal:", modal);
  if (mediaName) {
    changeModalImage(mediaName);
  }
  modal.style.display = "flex";
  buildLinksPrevNext(mediaName);
}

function buildLinksPrevNext(mediaName) {
  const currentMediaName = mediaName.split("/").pop();
  const currentPhotographerName = mediaName.split("/").at(-2);

  const mediaModalId = document.getElementById("media_modal");
  const mediaListString = mediaModalId.getAttribute("data-medialist");
  let mediaListArray = mediaListString.split(",");
  const currentIndex = mediaListArray.findIndex(
    (element) => element == currentMediaName
  );
  setPrevNextButtons(
    currentPhotographerName + "/" + mediaListArray[currentIndex - 1],
    currentPhotographerName + "/" + mediaListArray[currentIndex + 1]
  );
}

function closeModal(target) {
  const modal = document.getElementById(target + "_modal");
  modal.style.display = "none";
}

const mediaModal = document.getElementById("media_modal");
const contactButton = document.getElementById("contact_button");
const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    closeModal("media");
  });
});

function setPrevNextButtons(mediaNamePrev, mediaNameNext) {
  const modalMediaPrev = document.getElementById("modalMediaPrev");
  modalMediaPrev.addEventListener("click", function () {
    changeModalImage(globalPhotosPath + mediaNamePrev);
  });

  const modalMediaNext = document.getElementById("modalMediaNext");
  modalMediaNext.addEventListener("click", function () {
    changeModalImage(globalPhotosPath + mediaNameNext);
  });
  document.onkeydown = function (evt) {
    if (evt.key == "ArrowLeft") {
      changeModalImage(globalPhotosPath + mediaNamePrev);
    }
    if (evt.key == "ArrowRight") {
      changeModalImage(globalPhotosPath + mediaNameNext);
    }
  };
}

function changeModalImage(mediaName) {
  console.log("changeModalImage > mediaName", mediaName);
  const extension = mediaName.split(".")[1];
  const mediaContainer = document.getElementById("media");
  if (extension == "mp4") {
    mediaContainer.querySelector("img").setAttribute("style", "display:none");
    mediaContainer
      .querySelector("video")
      .setAttribute("style", "display:block");
    mediaContainer.querySelector("source").setAttribute("src", mediaName);
    console.log("Change video source : ", mediaName);
  } else {
    mediaContainer.querySelector("img").setAttribute("style", "display:block");
    mediaContainer.querySelector("img").setAttribute("src", mediaName);
    mediaContainer.querySelector("video").setAttribute("style", "display:none");
  }
  buildLinksPrevNext(mediaName);
}

// Fermer une modale avec Escape
document.onkeydown = function (evt) {
  if (evt.key == "Escape") {
    if ((mediaModal.getAttribute("style").split(":")[1] = "flex")) {
      closeModal("media");
    }
  }
};
