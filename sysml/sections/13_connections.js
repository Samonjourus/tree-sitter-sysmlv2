// section 8.2.2.13: Connections textual notation
module.exports = {
  // section 8.2.2.13.1: Connections definition and usage
  connection_definition: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.connection_keyword,
      $.def_keyword,
      $.definition,
    ),

  connection_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      choice(
        seq(
          $.connection_keyword,
          $.usage_declaration,
          optional($.value_part),
          optional(seq($.connect_keyword, $.connector_part)),
        ),
        seq($.connect_keyword, $.connector_part),
      ),
      $.usage_body,
    ),

  connector_part: ($) => choice($.binary_connector_part, $.nary_connector_part),

  binary_connector_part: ($) =>
    seq(
      field("ownedRelationship", $.connector_end_member),
      $.to_keyword,
      field("ownedRelationship", $.connector_end_member),
    ),

  nary_connector_part: ($) =>
    seq(
      token("("),
      field("ownedRelationship", $.connector_end_member),
      token(","),
      field("ownedRelationship", $.connector_end_member),
      repeat(
        seq(token(","), field("ownedRelationship", $.connector_end_member)),
      ),
      token(")"),
    ),

  connector_end_member: ($) => field("ownedRelatedElement", $.connector_end),

  connector_end: ($) =>
    seq(
      optional(field("ownedRelationship", $.owned_cross_multiplicity_member)),
      optional(seq(field("declaredName", $.references), $.references_keyword)),
      field("ownedRelationship", $.owned_reference_subsetting),
    ),

  owned_cross_multiplicity_member: ($) =>
    field("ownedRelatedElement", $.owned_cross_multiplicity),

  owned_cross_multiplicity: ($) =>
    field("ownedRelationship", $.owned_multiplicity),

  // section 8.2.2.13.2: Binding Connectors
  binding_connector_as_usage: ($) =>
    seq(
      $.usage_prefix,
      optional(seq($.binding_keyword, $.usage_declaration)),
      $.bind_keyword,
      field("ownedRelationship", $.connector_end_member),
      token("="),
      field("ownedRelationship", $.connector_end_member),
      $.usage_body,
    ),
  // section 8.2.2.13.3: Successions
  succession_as_usage: ($) =>
    seq(
      $.usage_prefix,
      optional(seq($.succession_keyword, $.usage_declaration)),
      $.first_keyword,
      field("ownedRelationship", $.connector_end_member),
      $.then_keyword,
      field("ownedRelationship", $.connector_end_member),
      $.usage_body,
    ),
};
