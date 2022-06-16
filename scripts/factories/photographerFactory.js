/**
 * Photographer Factory
 * @type details, header, gallerieBlock
 */
class PhotographerFactory {
  constructor(data, type) {
    if (type === "details") {
      return new PhotographerDetails(data);
    } else if (type === "header") {
      return new PhotographerHeader(data);
    } else if (type === "gallerieBlock") {
      return new PhotographerGallerieBlock(data);
    } else {
      throw "Unknown type format";
    }
  }
}
