/**
 * @file TreeSitter parser for Systems Modelling Language Version 2
 * @author Benjamin Standfield <benjaminstandfield@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const sysml = require("./sysml/core");
const kerml = require("./kerml/core");

let merged = {
  root_namespace: ($) => repeat($.package_body_element),

  ...kerml["terms"],
  ...sysml["terms"],

  ...kerml["keywords"],
  ...sysml["keywords"],

  ...kerml["statements"],
  ...sysml["statements"],
};

module.exports = grammar({
  name: "tree_sitter_sysmlv2",

  fields: {
    body: {},
    chainingFeature: {},
    differencingType: {},
    disjoiningType: {},
    general: {},
    intersectingType: {},
    isAbstract: {},
    isSufficient: {},
    language: {},
    memberElement: {},
    operator: {},
    ownedFeatureMember: {},
    ownedRelatedElement: {},
    ownedRelationship: {},
    ownedMemberElement: {},
    ownedMemberFeature: {},
    ownedMemberParameter: {},
    redefinedFeature: {},
    specific: {},
    superclassifier: {},
    type: {},
    typedFeature: {},
    typeDisjoined: {},
    unioningType: {},
    visibility: {},
    value: {},
  },

  rules: merged,

  extras: ($) => [
    /\s+/, // whitespace
  ],
});
