/**
 * @description Build the detail of photographer on the index page
 *
 * @param {data}
 */
class PhotographerDetail {
  constructor(data) {
    console.log("PhotographerDetail : ", data);
    this._name = data.name;
    this._id = data.id;
    this._city = data.city;
    this._country = data.country;
    this._tagline = data.tagline;
    this._price = data.price;
    this._portrait = data.portrait;
  }

  get name() {
    return this._name;
  }
  get city() {
    return this._city;
  }
  get country() {
    return this._country;
  }

  get tagline() {
    return this._tagline;
  }
  get price() {
    return this._price;
  }
  get portrait() {
    return this._portrait;
  }
  get detailTemplate() {
    let template = "<div>";
    template +=
      "<a href='photographer.html?id=" +
      this._id +
      "' title='" +
      this._name +
      "'>";
    template +=
      "<img src='assets/photographers/Photographers ID Photos/" +
      this._portrait +
      "' alt='" +
      this._name +
      "' />";
    template += "</a>";
    template += "<h2>" + this._name + "</h2>";
    template += "<div>" + this._city + ", " + this._country + "</div>";
    template += "<div>" + this._tagline + "</div>";
    template += "<div>" + this._price + "€/jour</div>";
    template += "</div>";

    return template;
  }
}
