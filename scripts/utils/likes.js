/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
function addLikes() {
  // Add clicks on the hearts likes
  const allHearts = document.querySelectorAll('#photograph-gallerie img.svg-heart');

  allHearts.forEach((imgheart) => {
    imgheart.addEventListener('click', function (event) {
      const tempCurrentlikes = parseInt(this.previousSibling.textContent) + 1;
      this.previousSibling.textContent = tempCurrentlikes;

      const totallikes = document.getElementById('bottom-infos-totallikes').getAttribute('value');
      const tempTotallikes = parseInt(totallikes) + 1;
      document.getElementById('bottom-infos-totallikes').textContent = tempTotallikes;
      document.getElementById('bottom-infos-totallikes').setAttribute('value', tempTotallikes);
    });
  });
}
