const Munroes = require("./models/munroes.js");
const RegionSelectView = require("./views/region_select_view.js");
const MunroListView = require("./views/munro_list_view.js");

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');
  const items = [
    new Munroes(),
    new RegionSelectView(),
    new MunroListView()
  ]
  items.forEach((item) => {
    item.bindEvents();
  });
});
