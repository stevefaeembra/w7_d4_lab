const MunroCardView = function (munro) {
  this.munro = munro;
};

MunroCardView.prototype.render = function () {
  const row = document.createElement("tr");
  const name = document.createElement("td");
  name.textContent = this.munro.name;
  const height = document.createElement("td");
  height.textContent = `${this.munro.height}m `;
  const rank = document.createElement("td");
  rank.textContent = this.munro.rank;
  const region = document.createElement("td");
  region.textContent = this.munro.region;
  row.appendChild(name);
  row.appendChild(height);
  row.appendChild(rank);
  row.appendChild(region);
  return row;
};

module.exports = MunroCardView;
