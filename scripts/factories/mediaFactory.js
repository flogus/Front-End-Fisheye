/* eslint-disable no-undef */
/* eslint-disable no-constructor-return */
/* eslint-disable no-unused-vars */
class MediaFactory {
  constructor(media, extension) {
    if (extension === 'mp4') {
      return new MediaVideo(media);
    }
    if (extension === 'jpg') {
      return new MediaImage(media);
    }
    // eslint-disable-next-line no-throw-literal
    throw 'Unknown extension format';
  }
}
