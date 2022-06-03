// function photographerFactory(data) {
//   const { name, portrait, id, city, country, tagline, price } = data;

//   const picture = `assets/photographers/${portrait}`;

//   return { name, picture, getUserCardDOM };
// }

class PhotographerFactory {
  constructor(data, type) {
    console.log("build ", type, data);
    if (type === "detail") {
      return new PhotographerDetail(data);
    } else if (type === "header") {
      return new PhotographerHeader(data);
    } else if (type === "gallerieBlock") {
      return new PhotographerGallerieBlock(data);
    } else {
      throw "Unknown type format";
    }
  }
}
