/**
 * @file TreeSitter parser for Systems Modelling Language Version 2
 * @author Benjamin Standfield <benjaminstandfield@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "tree_sitter_sysmlv2",

  rules: {
    source_file: ($) => repeat($.statement),

    // typical C-style comments
    comment: (_) =>
      choice(
        token(seq("//", /.*/)), // single line
        token(seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")), // multi-line
      ),

    // names ---
    // There are two types of names. Basic names are traditional identifiers.
    // unrestricted_names are single quoted strings that can contain any
    // character (not really but kinda...).
    basic_name: (_) => /[A-Za-z_][A-Za-z0-9_]*/,
    unrestricted_name: (_) => /'([^'\\]|\\.)*'/,

    // names or short names will appear in Sysmlv2 text
    short_name: ($) => seq("<", choice($.basic_name, $.unrestricted_name), ">"),
    name: ($) => choice($.basic_name, $.unrestricted_name),

    // handy ---
    name_and_or_short_name: ($) =>
      choice(seq($.short_name, $.name), $.name, $.short_name),

    // keywords ---
    keyword: ($) =>
      choice(
        $.feature_keyword,
        $.classifier_keyword,
        $.dependency_keyword,
        $.from_keyword,
        $.to_keyword,
      ),

    classifier_keyword: (_) => token("classifier"),
    feature_keyword: (_) => token("feature"),
    dependency_keyword: (_) => token("dependency"),
    from_keyword: (_) => token("from"),
    to_keyword: (_) => token("to"),

    // statements ---
    statement: ($) =>
      seq(
        choice(
          $.feature_statement,
          $.classifier_statement,
          $.dependency_statement,
        ),
        ";",
      ),

    classifier_statement: ($) =>
      seq($.classifier_keyword, optional($.name_and_or_short_name)),

    feature_statement: ($) =>
      seq($.feature_keyword, optional($.name_and_or_short_name)),

    dependency_statement: ($) =>
      seq(
        $.dependency_keyword,
        $.name_and_or_short_name,
        $.from_keyword,
        $.name_and_or_short_name,
        $.to_keyword,
        $.name_and_or_short_name,
      ),
  },

  extras: ($) => [
    /\s+/, // whitespace
    $.comment, // your comment rules
  ],
});
