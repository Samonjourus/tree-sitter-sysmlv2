const keywords = require("./keywords");
const symbols = require("./symbols");
const rules = require("./sections/rules");

let core = {
  keywords: keywords,
  symbols: symbols,
  rules: rules,
};

module.exports = core;
