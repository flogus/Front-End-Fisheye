function photographerFactory(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const lien = document.createElement("a");
    lien.setAttribute("href", "photographer.html?id=" + id);

    const article = document.createElement("article");
    const divDescription = document.createElement("div");

    const img = document.createElement("img");

    if (picture == undefined) {
      picture = "account.png";
    }
    img.setAttribute("src", picture);
    console.log("Picture", picture);
    img.setAttribute("alt", name);

    const h2 = document.createElement("h2");
    const pCityCountry = document.createElement("p");
    const pTagLine = document.createElement("p");
    const pPrice = document.createElement("p");

    h2.textContent = name;
    pCityCountry.textContent = city + ", " + country;
    pTagLine.textContent = tagline;
    pPrice.textContent = price + "€/jour";

    article.appendChild(lien);
    article.appendChild(divDescription);
    lien.appendChild(img);
    lien.appendChild(h2);
    divDescription.appendChild(pCityCountry);
    divDescription.appendChild(pTagLine);
    divDescription.appendChild(pPrice);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
