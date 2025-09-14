// section 8.2.2.14: Interfaces textual notation
module.exports = {
  // section 8.2.2.14.1: Interface definitions
  interface_definition: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.interface_keyword,
      $.def_keyword,
      $.definition_declaration,
      $.interface_body,
    ),

  interface_body: ($) =>
    choice(token("{"), seq(token("{"), $.interface_body_item, token("}"))),

  interface_body_item: ($) =>
    choice(
      field("ownedRelationship", $.definition_member),
      field("ownedRelationship", $.variant_usage_member),
      field("ownedRelationship", $.interface_non_occurrence_usage_member),
      seq(
        optional(field("ownedRelationship", $.source_succession_member)),
        field("ownedRelationship", $.interface_occurrence_usage_member),
      ),
      field("ownedRelationship", $.interface_occurrence_usage_member),
      field("ownedRelationship", $.alias_member),
      field("ownedRelationship", $.import),
    ),

  interface_non_occurrence_usage_member: ($) =>
    choice(
      $.reference_usage,
      $.attribute_usage,
      $.enumeration_usage,
      $.binding_connector_as_usage,
      $.succession_as_usage,
    ),

  interface_occurrence_usage_member: ($) =>
    seq(
      optional($.member_prefix),
      field("ownedRelatedElement", $.interface_occurrence_usage_member),
    ),

  interface_occurrence_usage_member: ($) =>
    choice(
      $.default_interface_end,
      $.structure_usage_element,
      $.behavior_usage_element,
    ),

  default_interface_end: ($) => seq(field("isEnd", $.end_keyword), $.usage),

  // section 8.2.2.14.2: Interface usage
  interface_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.interface_keyword,
      $.interface_usage_declaration,
      $.interface_body,
    ),

  interface_usage_declaration: ($) =>
    choice(
      seq(
        $.usage_declaration,
        optional($.value_part),
        optional(seq($.connect_keyword, $.interface_part)),
      ),
      $.interface_part,
    ),

  interface_part: ($) => choice($.binary_interface_part, $.nary_interface_part),

  binary_interface_part: ($) =>
    seq(
      field("ownedRelationship", $.interface_end_member),
      $.to_keyword,
      field("ownedRelationship", $.interface_end_member),
    ),

  nary_interface_part: ($) =>
    seq(
      token("("),
      field("ownedRelationship", $.interface_end_member),
      token(","),
      field("ownedRelationship", $.interface_end_member),
      repeat(
        seq(token(","), field("ownedRelationship", $.interface_end_member)),
      ),
      token(")"),
    ),

  interface_end_member: ($) => field("ownedRelatedElement", $.interface_end),

  interface_end: ($) =>
    seq(
      optional(field("ownedRelationship", $.owned_cross_multiplicity_member)),
      optional(seq(field("declaredName", $.references), $.references_keyword)),
      field("ownedRelationship", $.owned_reference_subsetting),
    ),
};
