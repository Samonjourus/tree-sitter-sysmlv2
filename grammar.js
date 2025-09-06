/**
 * @file TreeSitter parser for Systems Modelling Language Version 2
 * @author Benjamin Standfield <benjaminstandfield@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const sysml = require("./sysml/core");
const kerml = require("./kerml/core");

let statement_keys = Object.keys(sysml["statements"]).concat(
  Object.keys(kerml["statements"]),
);

let merged = {
  source_file: ($) => repeat($.statement),

  statement: ($) => seq(choice(...statement_keys.map((k) => $[k]))),

  ...kerml["terms"],
  ...sysml["terms"],

  ...kerml["keywords"],
  ...sysml["keywords"],

  ...kerml["statements"],
  ...sysml["statements"],
};

module.exports = grammar({
  name: "tree_sitter_sysmlv2",

  rules: merged,

  extras: ($) => [
    /\s+/, // whitespace
  ],
});
