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

    // names ---
    // There are two types of names. Basic names are traditional identifiers.
    // unrestricted_names are single quoted strings that can contain any
    // character (not really but kinda...).
    basic_name: (_) => /[A-Za-z_][A-Za-z0-9_]*/,
    unrestricted_name: (_) => /'([^'\\]|\\.)*'/,

    // names or short names will appear in Sysmlv2 text
    short_name: ($) => seq("<", choice($.basic_name, $.unrestricted_name), ">"),
    name: ($) => choice($.basic_name, $.unrestricted_name),
    qualified_name: ($) => seq($.name, repeat(seq("::", $.name))),

    qualified_name_sequence: ($) =>
      seq($.qualified_name, repeat(seq(", ", $.qualified_name))),

    // tokens
    // NOTE: probably should split this into components
    locale_code: ($) => seq('"', /[A-Za-z0-9_@]*/, '"'),

    language_name: ($) => seq('"', /[A-Za-z0-9_@]*/, '"'),

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
    comment_keyword: (_) => token("comment"),
    doc_keyword: (_) => token("doc"),
    feature_keyword: (_) => token("feature"),
    dependency_keyword: (_) => token("dependency"),
    from_keyword: (_) => token("from"),
    to_keyword: (_) => token("to"),
    rep_keyword: (_) => token("rep"),
    language_keyword: (_) => token("language"),
    locale_keyword: (_) => token("locale"),
    about_keyword: (_) => token("about"),

    // statements ---
    statement: ($) =>
      seq(
        choice(
          $.feature_statement,
          $.classifier_statement,
          $.dependency_statement,
          $.comment,
          $.comment_statement,
          $.documentation_statement,
          $.representation_statement,
        ),
      ),

    classifier_statement: ($) =>
      seq($.classifier_keyword, optional($.name_and_or_short_name), ";"),

    comment_statement: ($) =>
      seq(
        $.comment_keyword,
        optional($.name_and_or_short_name),
        optional(seq($.about_keyword, $.qualified_name)),
        $.comment,
      ),

    documentation_statement: ($) =>
      seq(
        $.doc_keyword,
        optional($.name_and_or_short_name),
        optional(seq($.locale_keyword, $.locale_code)),
        optional(seq($.about_keyword, $.qualified_name)),
        $.comment,
      ),

    representation_statement: ($) =>
      seq(
        optional($.rep_keyword),
        $.language_keyword,
        $.language_name,
        $.comment,
      ),

    feature_statement: ($) =>
      seq($.feature_keyword, optional($.name_and_or_short_name), ";"),

    dependency_statement: ($) =>
      seq(
        $.dependency_keyword,
        optional(
          // you can specify a name and use 'from' or just use 'from'
          seq(optional($.name_and_or_short_name), $.from_keyword),
        ),
        $.qualified_name_sequence,
        $.to_keyword,
        $.qualified_name_sequence,
        choice(seq("{", repeat($.statement), "}"), ";"),
      ),

    // typical C-style comments
    comment: (_) =>
      choice(
        token(seq("//", /.*/)), // single line
        seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"), // multi-line
      ),
  },

  extras: ($) => [
    /\s+/, // whitespace
  ],
});
