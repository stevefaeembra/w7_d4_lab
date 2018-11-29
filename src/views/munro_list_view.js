const PubSub = require("../helpers/pub_sub.js");
const MunroCardView = require("./munro_card_view.js");

const MunroListView = function () {
};

MunroListView.prototype.bindEvents = function () {
  // subscribe to the munro list
  PubSub.subscribe("Munroes:got-data",(event) => {
    var munroData = event.detail;
    this.clearTable("#munro-list")
    this.populateTable("#munro-list", munroData);
  });
};

MunroListView.prototype.clearTable = function (tableName) {
  const div = document.querySelector(tableName);
  div.innerHTML = '';
};

MunroListView.prototype.populateTable = function (tableName, munroArray) {
  const div = document.querySelector(tableName);
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  munroArray.forEach((munro) => {
    const munroCard = new MunroCardView(munro);
    tbody.append(munroCard.render());
  })
  table.appendChild(tbody);
  div.appendChild(table);
};

module.exports = MunroListView;
