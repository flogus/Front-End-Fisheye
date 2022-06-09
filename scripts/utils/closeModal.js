// Fermer une modale avec Escape
function escapeCloseModal() {
  document.onkeydown = function (evt) {
    if (evt.key == "Escape") {
      if (
        document
          .getElementById("media_modal")
          .getAttribute("style")
          .split(":")[1]
          .trim() == "flex;"
      ) {
        closeModal("media");
      }
    }
  };
}

function closeModal(target) {
  const modal = document.getElementById(target + "_modal");
  modal.style.display = "none";
}

closeButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    closeModal("media");
    closeModal("contact");
  });
});
