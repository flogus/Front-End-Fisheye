/**
 * @description Build the block of photographer for the gallerie
 *
 * @param {data}
 * @returns
 */
class PhotographerGallerieBlock {
  constructor(data) {
    // console.log("PhotographerGallerieBlock : ", data);
    this._title = data.title;
    this._image = data.image;
    this._video = data.video;
    this._likes = data.likes;
    this._photoId = data.id;
    this._photographerName = data.name;
  }

  get name() {
    return this._photographerName.split(" ")[0];
  }
  get imgUrl() {
    return (
      globalPhotosPath +
      this._photographerName.split(" ")[0] +
      "/" +
      this._image
    );
  }
  get videoUrl() {
    return (
      globalPhotosPath +
      this._photographerName.split(" ")[0] +
      "/" +
      this._video
    );
  }
  get gallerieBlock() {
    let template = "<div class='gallerie--card'>";

    template += "<a href='#' title='Ouvrir " + this._title + "'>";
    if (this._image !== undefined) {
      template +=
        "<img id='" + this._photoId + "' src='" + this.imgUrl + "' class=''>";
    }
    if (this._video !== undefined) {
      template += "<video width='200'>";
      template += "<source src=" + this.videoUrl + " type='video/mp4'>";
      template += "</video>";
    }
    template += "</a>";
    template += "<div class='gallerie--card-description'>";
    template += "<div>" + this._title + "</div>";
    template +=
      "<div><img class='svg-heart' src='assets/icons/heart.svg' value=" +
      this._likes +
      " />" +
      this._likes +
      "</div>";
    template += "</div>";
    template += "</div>";

    return template;
  }
}
