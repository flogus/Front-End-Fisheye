/**
 * @description Build the block of photographer for the gallerie
 *
 * @param {data}
 * @returns
 */
class PhotographerGallerieBlock {
  constructor(data) {
    console.log("PhotographerGallerieBlock : ", data);
    this._title = data.title;
    this._image = data.image;
    this._video = data.video;
    this._likes = data.likes;
    this._name = data.name;
  }

  get name() {
    return this._name.split(" ")[0];
  }
  get gallerieBlock() {
    let template = "<div>";
    template += "<h2>" + this._title + "</h2>";

    if (this._image !== undefined) {
      template +=
        "<img width='200' src='" +
        globalPhotosPath +
        this._name.split(" ")[0] +
        "/" +
        this._image +
        "'>";
    }
    if (this._video !== undefined) {
      template += "<video width='200'>";
      template +=
        "<source src=" +
        globalPhotosPath +
        this._name.split(" ")[0] +
        "/" +
        this._video +
        " type='video/mp4'>";
      template += "</video>";
    }
    template += "<h2>" + this._likes + "</h2>";
    template += "</div>";

    return template;
  }
}
