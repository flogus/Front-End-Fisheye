/**
 * @description Build the detail of photographer on the index page
 *
 * @param {data}
 */
class PhotographerDetails {
  constructor(data) {
    // console.log("PhotographerDetail : ", data);
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
    let template = "<article>";
    template +=
      "<a href='photographer.html?id=" +
      this._id +
      "' title='Voir les photos de " +
      this._name +
      "'>";
    template +=
      "<img src='assets/photographers/" +
      this._portrait +
      "' alt='Photo " +
      this._name +
      "' />";
    template += "</a>";
    template += "<h2>" + this._name + "</h2>";
    template += "<h3>" + this._city + ", " + this._country + "</h3>";
    template += "<h4>" + this._tagline + "</h4>";
    template += "<h5>" + this._price + "€/jour</h5>";
    template += "</article>";

    return template;
  }
}
