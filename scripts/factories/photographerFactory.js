/* eslint-disable no-undef */
/* eslint-disable no-constructor-return */
/* eslint-disable no-unused-vars */
/**
 * Photographer Factory
 * @type details, header, gallerieBlock
 */
class PhotographerFactory {
  constructor(data, type) {
    if (type === 'details') {
      return new PhotographerDetails(data);
    } if (type === 'header') {
      return new PhotographerHeader(data);
    } if (type === 'gallerieBlock') {
      return new PhotographerGallerieBlock(data);
    }
    // eslint-disable-next-line no-throw-literal
    throw 'Unknown type format';
  }
}
