const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Munroes = function () {
  this.data = [];
  this.regions = [];
}

Munroes.prototype.bindEvents = function () {
  const helper = new RequestHelper("https://munroapi.herokuapp.com/api/munros");
  helper.get().
  then((data) => {
    this.data = data;
    PubSub.publish("Munroes:got-data", this.data);
    console.dir(this.data);
  }).
  catch((err) => {
    console.log(err);
  });
};

module.exports = Munroes;
