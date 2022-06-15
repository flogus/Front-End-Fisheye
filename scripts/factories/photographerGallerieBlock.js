/**
 * @description Build the block of photographer for the gallerie
 *
 * @param {data}
 * @returns
 */
class PhotographerGallerieBlock {
  constructor(data, currentPhotographerName) {
    // console.log("PhotographerGallerieBlock : ", data);
    this._title = data.title;
    this._image = data.image;
    this._date = data.date;
    this._video = data.video;
    this._likes = data.likes;
    this._photoId = data.id;
    this._photographerName = currentPhotographerName;
  }
  get formatDate() {
    const dateArray = this._date.split("-");
    return dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
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
  get mediaUrl() {
    if (this._image !== undefined) {
      return this.imgUrl;
    }
    if (this._video !== undefined) {
      return this.videoUrl;
    }
  }
  get gallerieBlock() {
    let template = "<div class='gallerie--card'>";
    template +=
      "<a href='#' title='Ouvrir " +
      this._title +
      "' mediaName='" +
      this.mediaUrl +
      "' mediaTitle='" +
      this._title +
      "' id='" +
      this._photoId +
      "'>";
    if (this._image !== undefined) {
      template +=
        "<img id='" +
        this._photoId +
        "' src='" +
        this.imgUrl +
        "' class='' alt='" +
        this._title +
        "'>";
    }
    if (this._video !== undefined) {
      template += "<video width='100%' height='100%'>";
      template += "<source src=" + this.videoUrl + " type='video/mp4'>";
      template += "</video>";
    }
    template += "</a>";
    template += "<div class='gallerie--card-description'>";
    if (this._video !== undefined) {
      this._title = "VIDEO - " + this._title;
    }
    template += "<div>" + this.formatDate + " - " + this._title + "</div>";
    template +=
      "<div><img class='svg-heart' src='assets/icons/heart.svg' alt='Add a like' value=" +
      this._likes +
      " />" +
      this._likes +
      "</div>";
    template += "</div>";
    template += "</div>";

    return template;
  }
}
