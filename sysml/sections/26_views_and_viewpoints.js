// section 8.2.2.26: Views and Viewpoints textual notation
module.exports = {
  // section 8.2.2.26.1: View definitions
  view_definition: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.view_keyword,
      $.def_keyword,
      $.definition_declaration,
      $.view_definition_body,
    ),

  view_definition_body: ($) =>
    choice(
      token(";"),
      seq(token("{"), $.view_definition_body_item, token("}")),
    ),

  view_definition_body_item: ($) =>
    choice(
      $.definition_body_item,
      field("ownedRelationship", $.element_filter_member),
      field("ownedRelationship", $.view_rendering_member),
    ),

  view_rendering_member: ($) =>
    seq(
      $.member_prefix,
      $.rendering_keyword,
      field("ownedRelatedElement", $.view_rendering_usage),
    ),

  view_rendering_usage: ($) =>
    choice(
      seq(
        field("ownedRelationship", $.owned_reference_subsetting),
        optional($.feature_specialization_part),
        $.usage_body,
      ),
      seq(
        choice(
          seq(repeat($.usage_extension_keyword), $.rendering_keyword),
          repeat1($.usage_extension_keyword),
        ),
        $.usage,
      ),
    ),
  // section 8.2.2.26.2: View usages
  view_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.view_keyword,
      optional($.usage_declaration),
      optional($.value_part),
      $.view_body,
    ),

  view_body: ($) =>
    choice(token(";"), seq(token("{"), repeat($.view_body_item), token("}"))),

  view_body_item: ($) =>
    choice(
      $.definition_body_item,
      field("ownedRelationship", $.element_filter_member),
      field("ownedRelationship", $.view_rendering_member),
      field("ownedRelationship", $.expose),
    ),

  expose: ($) =>
    seq(
      $.expose_keyword,
      choice($.membership_expose, $.namespace_expose),
      $.relationship_body,
    ),

  membership_expose: ($) => $.qualified_path,

  namespace_expose: ($) => $.qualified_path,

  // section 8.2.2.26.3: Viewpoints
  viewpoint_definition: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.viewpoint_keyword,
      $.constraint_usage_declaration,
      $.requirement_body,
    ),

  viewpoint_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.viewpoint_keyword,
      $.constraint_usage_declaration,
      $.requirement_body,
    ),
  // section 8.2.2.26.4: Renderings
  rendering_definition: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.rendering_keyword,
      $.def_keyword,
      $.definition,
    ),

  rendering_usage: ($) =>
    seq($.occurrence_usage_prefix, $.rendering_keyword, $.usage),
};
