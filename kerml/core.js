const statements = require("./statements");
const keywords = require("./keywords");
const terms = require("./terms");

let core = {
  keywords: keywords,
  statements: statements,
  terms: terms,
};

module.exports = core;
