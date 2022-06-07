function displayModal(target, mediaName) {
  console.log("target", target, "mediaName", mediaName);
  const modal = document.getElementById(target + "_modal");
  console.log("imageName:", mediaName, " - modal:", modal);
  if (mediaName) {
    changeModalImage(mediaName);
  }
  modal.style.display = "flex";
}

function closeModal(target) {
  const modal = document.getElementById(target + "_modal");
  modal.style.display = "none";
}

const mediaModal = document.getElementById("media_modal");
const contactButton = document.getElementById("contact_button");
//console.log("mediaModal", mediaModal);

const closeButtons = document.querySelectorAll(".close-modal");
//console.log("closeButtons : ", closeButtons);

closeButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    closeModal("media");
  });
});

function setPrevNextButtons() {
  const modalMediaPrev = document.getElementById("modalMediaPrev");
  const modalMediaNext = document.getElementById("modalMediaNext");
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
}

// Fermer une modale avec Escape
document.onkeydown = function (evt) {
  if (evt.key == "Escape") {
    if ((mediaModal.getAttribute("style").split(":")[1] = "flex")) {
      closeModal("media");
    }
  }
};
