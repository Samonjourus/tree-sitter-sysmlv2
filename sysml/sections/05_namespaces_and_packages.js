module.exports = {
  // section 1: packages
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

  package_body_element: ($) =>
    choice($.package_member, $.element_filter_member, $.alias_member, $.import),

  // NOTE: made mandatory to comply with treesitter. References must mark this
  // as optional
  member_prefix: ($) => field("visibility", $.visibility_indicator),

  package_member: ($) => choice($.definition_element, $.usage_element),

  element_filter_member: ($) =>
    seq(optional($.member_prefix), $.filter_keyword, $.owned_expression, ";"),

  alias_member: ($) =>
    seq(
      optional($.member_prefix),
      $.alias_keyword,
      optional($.identification),
      $.for_keyword,
      $.qualified_name,
      $.relationship_body,
    ),

  import: ($) =>
    seq(
      $.visibility_indicator,
      $.import_keyword,
      optional($.all_keyword),
      $.import_declaration,
      $.relationship_body,
    ),

  // WARN: definitons of namespace import + membership import needed to be inlined...
  // because im simply not smart enough :)
  import_declaration: ($) => $.qualified_path,

  filter_package: ($) =>
    seq($.import_declaration, repeat1($.filter_package_member)),

  filter_package_member: ($) => seq(token("["), $.owned_expression, token("]")),

  visibility_indicator: (_) => choice("public", "private", "protected"),

  // section 2: package elements
  definition_element: ($) =>
    choice(
      $.annotating_element,
      $.package,
      $.dependency,
      $.library_package,
      $.attribute_definition,
      $.enumeration_definition,
      $.occurrence_definition,
      $.individual_definition,
      $.item_definition,
      $.part_definition,
      $.connection_definition,
      $.flow_definition,
      $.interface_definition,
      $.port_definition,
      $.action_definition,
      $.calculation_definition,
      $.state_definition,
      $.constraint_definition,
      $.requirement_definition,
      $.concern_definition,
      $.case_definition,
      $.analysis_case_definition,
      $.verification_case_definition,
      $.use_case_definition,
      $.view_definition,
      $.viewpoint_definition,
      $.rendering_definition,
      $.metadata_definition,
      $.extended_definition,
    ),

  usage_element: ($) =>
    choice($.non_occurrence_usage_element, $.occurrence_usage_element),
};
