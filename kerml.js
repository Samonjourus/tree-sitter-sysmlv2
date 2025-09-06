/**
 * @file TreeSitter parser for Systems Modelling Language Version 2
 * @author Benjamin Standfield <benjaminstandfield@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = {
  // --- KerML ---
  feature_keyword: (_) => token("feature"), // from KerMl
  classifier_keyword: (_) => token("classifier"), // from KerML
};
