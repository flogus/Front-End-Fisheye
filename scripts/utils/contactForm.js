function displayModal(target, imageName) {
  const modal = document.getElementById(target + "_modal");
  if (imageName) {
    console.log("imageName:", imageName);
    changeModalImage(imageName);
  }
  modal.style.display = "flex";
}

function closeModal(target) {
  //   if (target == "contact") {
  //     const modal = document.getElementById("contact_modal");
  //   }
  //   if (target == "media") {
  //     const modal = document.getElementById("media_modal");
  //   }
  const modal = document.getElementById(target + "_modal");
  modal.style.display = "none";
}

const mediaModal = document.getElementById("media_modal");
const contactButton = document.getElementById("contact_button");
console.log("mediaModal", mediaModal);

const closeButtons = document.querySelectorAll(".close-modal");
console.log("closeButtons : ", closeButtons);

closeButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    closeModal("media");
  });
});

function changeModalImage(imageName) {
  let currentSrc = document
    .getElementById("media")
    .querySelector("img")
    .getAttribute("src");
  const currentSrcArr = currentSrc.split("/");
  const currentImageName = currentSrcArr.pop();
  const newSrc = currentSrcArr.join("/") + "/" + imageName;
  document
    .getElementById("media")
    .querySelector("img")
    .setAttribute("src", newSrc);
}
