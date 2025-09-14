// section 8.2.2.23: Analysis textual notation
module.exports = {
  analysis_case_definition: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.analysis_keyword,
      $.def_keyword,
      $.definition_declaration,
      $.case_body,
    ),

  analysis_case_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.analysis_keyword,
      $.constraint_usage_declaration,
      $.case_body,
    ),
};
