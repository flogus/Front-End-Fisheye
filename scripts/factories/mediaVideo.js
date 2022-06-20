/* eslint-disable class-methods-use-this */
/* eslint-disable no-const-assign */
class MediaVideo {
  constructor(media) {
    this._media = media;
  }

  get getVideo() {
    const video = document.createElement('video');
    video.setAttribute('controls', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');

    const videoSrc = document.createElement('source');
    videoSrc.setAttribute(
      'src',
      `${globalPhotosPath + currentPhotographerName.split(' ')[0]}/${this._media}`,
    );
    videoSrc.setAttribute('type', 'video/mp4');
    video.append(videoSrc);
    return video;
  }
}
