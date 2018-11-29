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

  const map = document.createElement("td");
  const mapLink = document.createElement("a");
  const x = this.munro.latlng_lng;
  const y = this.munro.latlng_lat;
  mapLink.setAttribute('href',`https://www.openstreetmap.org/#map=15/${y}/${x}&layers=C`);
  mapLink.textContent = "Map";
  map.appendChild(mapLink);

  row.appendChild(name);
  row.appendChild(map);
  row.appendChild(height);
  row.appendChild(rank);
  row.appendChild(region);
  return row;
};

module.exports = MunroCardView;
