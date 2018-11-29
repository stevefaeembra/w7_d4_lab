const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Munroes = function () {
  this.data = [];
  this.regions = [];
  // this filter is used to restrict what gets sent out
  // it's an arrow function passed a munro, which should
  // return true if it's to be included.
  this.filter = (munro) => true; // no filtering
}

Munroes.prototype.getRegions = function () {
  // extract an array of unique region names from data
  let regions = [];
  this.data.forEach((munro) => {
    if (!(regions.includes(munro.region))) {
      regions.push(munro.region);
    };
  });
  return regions.sort();
};

Munroes.prototype.addRanks = function () {
  let rank = 0;
  let height = 9999;
  this.data.forEach((munro) => {
    if(munro.height<height) {
      rank += 1;
      munro.rank = `${rank}`;
      height = munro.height;
    } else {
      munro.rank = `${rank}=`;
    };
  })
};
Munroes.prototype.bindEvents = function () {
  const helper = new RequestHelper("https://munroapi.herokuapp.com/api/munros");
  helper.get().
  then((data) => {
    this.data = data;
    this.addRanks();
    PubSub.publish("Munroes:got-data", this.data);
    this.regions = this.getRegions();
    PubSub.publish("Munroes:got-regions", this.regions);
  }).
  catch((err) => {
    console.log(err);
  });

  PubSub.subscribe("RegionSelectView:select-changed", (event) => {
    region = event.detail;
    if (region==="") {
      this.filter = (munro) => true;
    } else {
      this.filter = (munro) => munro.region === region;
    };
    const filteredData = this.data.filter(this.filter);
    PubSub.publish("Munroes:got-data", filteredData);
  })
};

module.exports = Munroes;
