// section 8.2.2.19: Calculations textual notation
module.exports = {
  calculation_definition: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.calc_keyword,
      $.def_keyword,
      $.definition_declaration,
      $.calculation_body,
    ),

  calculation_usage: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.calc_keyword,
      $.def_keyword,
      $.definition_declaration,
      $.calculation_body,
    ),

  calculation_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.calc_keyword,
      $.action_usage_declaration,
      $.calculation_body,
    ),

  calculation_body: ($) =>
    choice(token(";"), seq(token("{"), $.calculation_body_item, token("}"))),

  calculation_body_part: ($) =>
    seq(
      repeat($.calculation_body_item),
      field("ownedRelationship", $.result_expression_member),
    ),

  calculation_body_item: ($) =>
    seq(
      repeat($.action_body_item),
      field("ownedRelationship", $.return_parameter_member),
    ),

  return_parameter_member: ($) =>
    seq(
      optional($.member_prefix),
      $.return_keyword,
      field("ownedRelatedElement", $.usage_element),
    ),

  result_expression_member: ($) =>
    seq(
      optional($.member_prefix),
      field("ownedRelatedElement", $.owned_expression),
    ),
};
