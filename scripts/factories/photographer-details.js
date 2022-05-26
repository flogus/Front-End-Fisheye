function photographerDetailFactory(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserPictureDOM() {
    //if (id == "82") {
    const userPicture = document.createElement("img");
    userPicture.setAttribute("src", picture);
    console.log("Picture", picture);
    userPicture.setAttribute("alt", name);
    return userPicture;
    // }
  }
  function getUserDetailDOM() {
    // if (id == "82") {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    const pCityCountry = document.createElement("p");
    const pTagLine = document.createElement("p");

    h2.textContent = name;
    pCityCountry.textContent = city + ", " + country;
    pTagLine.textContent = tagline;

    article.appendChild(h2);
    article.appendChild(pCityCountry);
    article.appendChild(pTagLine);

    return article;
    // }
  }

  return { getUserPictureDOM, getUserDetailDOM };
}
