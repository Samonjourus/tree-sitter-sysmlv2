module.exports = {
  classifier_statement: ($) =>
    seq($.classifier_keyword, optional($.name_and_or_short_name), ";"),

  feature_statement: ($) =>
    seq($.feature_keyword, optional($.name_and_or_short_name), ";"),

  // typical C-style comments
  comment: (_) =>
    choice(
      token(seq("//", /.*/)), // single line
      seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"), // multi-line
    ),
};
