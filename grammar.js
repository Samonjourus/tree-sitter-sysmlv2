/**
 * @file TreeSitter parser for Systems MOdelling Language Version 2
 * @author Benjamin Standfield <benjaminstandfield@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "tree_sitter_sysmlv2",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
