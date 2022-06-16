/**
 * @description Build the header of detail page of photographer
 *
 * @param {data}
 * @returns
 */
class PhotographerHeader {
  constructor(data) {
    // console.log("PhotographerHeader : ", data);
    this._name = data.name;
    this._portrait = data.portrait;
    this._city = data.city;
    this._country = data.country;
    this._tagline = data.tagline;
  }
  get headerInfos() {
    let template = "<div>";
    template += "<h1>" + this._name + "</h1>";
    template += "<h2>" + this._city + ", " + this._country + "</h2>";
    template += "<h3>" + this._tagline + "</h3>";
    template += "</div>";

    return template;
  }
  get headerPhoto() {
    let template = "<div>";
    template +=
      "<img alt='Photographe : " +
      this._name +
      "' src='" +
      globalPhotosPath +
      "Photographers ID Photos/" +
      this._portrait +
      "' />";
    template += "</div>";

    return template;
  }
}
