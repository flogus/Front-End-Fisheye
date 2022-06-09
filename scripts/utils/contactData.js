const contactBtn = document.getElementById("contactButton");
contactBtn.addEventListener("click", function (event) {
  let prenomValue = document.querySelector("#contact_modal #prenom").value;
  let nomValue = document.querySelector("#contact_modal #nom").value;
  let emailValue = document.querySelector("#contact_modal #email").value;
  let msgValue = document.querySelector("#contact_modal #message").value;
  console.clear();
  console.group();
  console.info("Fomulaire info");
  console.info("prénom :", prenomValue);
  console.info("nom :", nomValue);
  console.info("e-mail :", emailValue);
  console.info("message :", msgValue);
  console.groupEnd();

  event.preventDefault();
});
