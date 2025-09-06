module.exports = {
  documentation_statement: ($) =>
    seq(
      $.doc_keyword,
      optional($.name_and_or_short_name),
      optional(seq($.locale_keyword, $.locale_code)),
      optional(seq($.about_keyword, $.qualified_name)),
      $.comment,
    ),

  comment_statement: ($) =>
    seq(
      $.comment_keyword,
      optional($.name_and_or_short_name),
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
};
