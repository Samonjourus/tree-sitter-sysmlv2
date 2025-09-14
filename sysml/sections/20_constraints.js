// section 8.2.2.20: Constraints textual notation
module.exports = {
  constraint_definition: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.constraint_keyword,
      $.def_keyword,
      $.definition_declaration,
      $.calculation_body,
    ),

  constraint_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.constraint_keyword,
      $.constraint_usage_declaration,
      $.calculation_body,
    ),

  assert_constraint_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.assert_keyword,
      optional(field("isNegated", $.not_keyword)),
      choice(
        seq(
          field("ownedRelationship", $.owned_reference_subsetting),
          optional($.feature_specialization_part),
        ),
        seq($.constraint_keyword, $.constraint_usage_declaration),
      ),
      $.calculation_body,
    ),

  constraint_usage_declaration: ($) =>
    seq($.usage_declaration, optional($.value_part)),
};
