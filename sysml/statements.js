module.exports = {
  // section 8.2.2.4: Annotations
  comment: ($) =>
    seq(
      optional(
        seq(
          $.comment_keyword,
          $.identification,
          optional(
            seq($.about_keyword, $.annotation, repeat(seq(",", $.annotation))),
          ),
        ),
      ),
      optional(seq($.locale_keyword, $.string_value)),
      $.regular_comment,
    ),

  documentation: ($) =>
    seq(
      seq($.doc_keyword, $.identification),
      optional(seq($.locale_keyword, $.string_value)),
      $.regular_comment,
    ),

  // section 8.2.2.3: Dependencies
  dependency: ($) =>
    seq(
      repeat($.prefix_metadata_annotation),
      $.dependency_keyword,
      $.dependency_statement,
      $.relationship_body,
    ),
  dependency_statement: ($) =>
    seq(
      optional(seq($.identification, $.from_keyword)),
      seq($.qualified_name, repeat(seq(",", $.qualified_name))),
      $.to_keyword,
      seq($.qualified_name, repeat(seq(",", $.qualified_name))),
    ),
};
