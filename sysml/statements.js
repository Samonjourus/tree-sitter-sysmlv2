module.exports = {
  // section 8.2.2.5: Namespaces and Packages
  package: ($) => seq($.package_declaration, $.package_body),

  library_package: ($) =>
    seq(
      optional($.standard_keyword),
      $.library_keyword,
      repeat($.prefix_metadata_member),
      $.package_declaration,
      $.package_body,
    ),

  package_declaration: ($) =>
    seq($.package_keyword, optional($.identification)),

  package_body: ($) =>
    choice(";", seq("{", repeat($.package_body_element), "}")),

  import: ($) =>
    seq(
      $.visibility_indicator,
      $.import_keyword,
      optional($.all_keyword),
      $.import_declaration,
      $.relationship_body,
    ),

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
