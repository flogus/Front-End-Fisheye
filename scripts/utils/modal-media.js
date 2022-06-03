function displayModal(target, imageName) {
  const modal = document.getElementById(target + "_modal");
  if (imageName) {
    console.log("imageName:", imageName);
    changeModalImage(imageName);
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

function changeModalImage(imageName) {
  const newSrc = "assets/photographers/" + imageName;
  console.log("sources :", newSrc);
  document
    .getElementById("media")
    .querySelector("img")
    .setAttribute("src", newSrc);
}

// Fermer une modale avec Escape
document.onkeydown = function (evt) {
  if (evt.key == "Escape") {
    if ((mediaModal.getAttribute("style").split(":")[1] = "flex")) {
      closeModal("media");
    }
  }
};
