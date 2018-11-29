const Munroes = require("./models/munroes.js");

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');
  const munroes = new Munroes();
  munroes.bindEvents();
});
