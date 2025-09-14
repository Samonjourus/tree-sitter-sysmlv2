// section 8.2.2.25: Use Cases textual notation
module.exports = {
  use_case_definition: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.use_keyword,
      $.case_keyword,
      $.def_keyword,
      $.definition_declaration,
      $.case_body,
    ),

  use_case_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.use_keyword,
      $.case_keyword,
      $.constraint_usage_declaration,
      $.case_body,
    ),

  include_use_case_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.include_keyword,
      choice(
        seq(
          field("ownedRelationship", $.owned_reference_subsetting),
          optional($.feature_specialization_part),
        ),
        seq($.use_keyword, $.case_keyword, $.usage_declaration),
      ),
      optional($.value_part),
      $.case_body,
    ),
};
