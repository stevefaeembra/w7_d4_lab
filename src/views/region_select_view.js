const PubSub = require("../helpers/pub_sub.js");

const RegionSelectView = function () {
}

RegionSelectView.prototype.bindEvents = function () {
  PubSub.subscribe("Munroes:got-regions", (event) => {
    PubSub.signForDelivery(this, event);
    const regions = event.detail;
    console.dir(regions);
    this.populatePullDown("#region-select",regions);
  })
};

RegionSelectView.prototype.populatePullDown = function (location, myArray) {
  // populate pulldown from an array of string
  const pullDown = document.querySelector(location);
  myArray.forEach((item) => {
    var option = document.createElement("option");
    option.textContent = item;
    pullDown.appendChild(option);
  });
};

module.exports = RegionSelectView;
