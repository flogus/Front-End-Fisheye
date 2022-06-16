/**
 * get the id param of the URL and set the var currentPhotographerId
 * @returns id
 */
function setIdParam() {
  const QueryString = window.location.search;
  const urlParams = new URLSearchParams(QueryString);
  currentPhotographerId = urlParams.get("id");
}

function buildMediaPath(currentPhotographerName) {
  const pathName = currentPhotographerName.split(" ")[0];
  const portraitName = currentPhotographerName
    .split(" ")
    .join("")
    .split("-")
    .join("");
  const mediaPath = "assets/photographers/" + pathName;
  const portraitPath = "assets/photographers/" + portraitName + ".jpg";
}
