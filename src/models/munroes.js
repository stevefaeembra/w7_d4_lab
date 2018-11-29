const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Munroes = function () {
  this.data = [];
  this.regions = [];
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

Munroes.prototype.bindEvents = function () {
  const helper = new RequestHelper("https://munroapi.herokuapp.com/api/munros");
  helper.get().
  then((data) => {
    this.data = data;
    PubSub.publish("Munroes:got-data", this.data);
    this.regions = this.getRegions();
    PubSub.publish("Munroes:got-regions", this.regions);
  }).
  catch((err) => {
    console.log(err);
  });
};

module.exports = Munroes;
