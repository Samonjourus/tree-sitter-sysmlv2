/**
 * @file TreeSitter parser for Systems Modelling Language Version 2
 * @author Benjamin Standfield <benjaminstandfield@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const sysml = require("./sysml");
const kerml = require("./kerml");

let merged = { ...sysml, ...kerml };

module.exports = grammar({
  name: "tree_sitter_sysmlv2",

  rules: merged,

  extras: ($) => [
    /\s+/, // whitespace
  ],
});
