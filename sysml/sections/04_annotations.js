//section 8.2.2.4: Annotations textual notation
module.exports = {
  annotation: ($) => field("annotatedElement", $.qualified_name),

  owned_annotation: ($) => $.annotating_element,

  annotating_member: ($) => $.annotating_element,

  annotating_element: ($) =>
    choice(
      $.comment,
      $.documentation,
      $.textual_representation,
      // $.metadata_feature,
    ),

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
      seq($.doc_keyword, optional($.identification)),
      optional(seq($.locale_keyword, $.string_value)),
      $.regular_comment,
    ),

  textual_representation: ($) =>
    seq(
      optional(seq($.rep_keyword, optional($.identification))),
      $.language_keyword,
      field("language", $.string_value),
      field("body", $.regular_comment),
    ),
};
