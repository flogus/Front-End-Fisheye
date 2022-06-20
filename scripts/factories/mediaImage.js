class MediaImage {
  constructor(media) {
    console.log('MediaImage Constructor', media);
    this._media = media;
  }

  get getImage() {
    const img = document.createElement('img');
    img.setAttribute('id', 'mediaImage');
    img.setAttribute('alt', 'media');
    img.setAttribute('style', 'display:block');
    img.setAttribute(
      'src',
      `${globalPhotosPath + currentPhotographerName.split(' ')[0]}/${this._media}`,
    );
    return img;
  }
}
