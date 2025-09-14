module.exports = {
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
