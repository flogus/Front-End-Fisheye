/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
function addLikes() {
  // Add clicks on the hearts likes
  const allHearts = document.querySelectorAll(
    '#photograph-gallerie img.svg-heart',
  );

  allHearts.forEach((imgheart) => {
    imgheart.addEventListener('click', function (event) {
      this.previousSibling.textContent = parseInt(this.getAttribute('value')) + 1;

      const totallikes = document
        .getElementById('bottom-infos-totallikes')
        .getAttribute('value');
      const tempTotallikes = parseInt(totallikes) + 1;
      document.getElementById('bottom-infos-totallikes').textContent = tempTotallikes;
      document
        .getElementById('bottom-infos-totallikes')
        .setAttribute('value', tempTotallikes);
    });
  });
}
document.onreadystatechange = () => {
  if (document.readyState == 'interactive') {
    addLikes();
  }
};
window.setTimeout(addLikes, 500);
