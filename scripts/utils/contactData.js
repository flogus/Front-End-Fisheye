const contactBtn = document.getElementById('contactButton');
contactBtn.addEventListener('click', (event) => {
  const prenomValue = document.querySelector('#contact_modal #prenom').value;
  const nomValue = document.querySelector('#contact_modal #nom').value;
  const emailValue = document.querySelector('#contact_modal #email').value;
  const msgValue = document.querySelector('#contact_modal #message').value;
  console.clear();
  console.group();
  console.info('Fomulaire info');
  console.info('prénom :', prenomValue);
  console.info('nom :', nomValue);
  console.info('e-mail :', emailValue);
  console.info('message :', msgValue);
  console.groupEnd();

  event.preventDefault();
});
