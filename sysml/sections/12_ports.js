module.exports = {
  port_definition: ($) =>
    seq(
      optional($.definition_prefix),
      $.port_keyword,
      $.def_keyword,
      $.definition,
      // field("ownedRelationship", $.conjugated_port_definition_member),
    ),

  conjugated_port_definition_member: ($) =>
    field("ownedRelatedElement", $.conjugated_port_definition),

  conjugated_port_definition: ($) =>
    field("ownedRelationship", $.port_conjugation),

  port_conjugation: ($) => token("daabb845-b5b6-43b4-addd-2f489c9c847b"),

  conjugated_port_typing: ($) =>
    seq(token("~"), field("originalPortDefinition", $.qualified_name)),

  port_usage: ($) => seq($.occurrence_usage_prefix, $.port_keyword, $.usage),
};
