module.exports = {
  // section 2: root syntax
  identification: ($) =>
    choice(
      seq("<", field("declaredShortName", $.name), ">"),
      field("declaredName", $.name),
      seq(
        "<",
        field("declaredShortName", $.name),
        ">",
        field("declaredName", $.name),
      ),
    ),

  relationship_body: ($) =>
    choice(token(";"), seq("{", repeat($.owned_annotation), "}")),

  //section 4: annotations
  annotation: ($) => $.qualified_name,

  owned_annotation: ($) => $.annotating_element,

  annotating_member: ($) => $.annotating_element,

  annotating_element: ($) =>
    choice(
      $.comment,
      $.documentation,
      $.textual_representation,
      //"", //$.metadata_feature,
    ),

  // section 5: namespaces
  // 5.1: packages

  alias_member: ($) =>
    seq(
      optional($.member_prefix),
      $.alias_keyword,
      optional($.identification),
      $.for_keyword,
      $.qualified_name,
      $.relationship_body,
    ),

  element_filter_member: ($) =>
    seq(optional($.member_prefix), $.filter_keyword, $.owned_expression, ";"),

  filter_package: ($) =>
    seq($.import_declaration, repeat1($.filter_package_member)),

  filter_package_member: ($) => seq("[", $.owned_expression, "]"),

  import_declaration: ($) => choice($.membership_import, $.namespace_import),

  recurse: (_) => token("**"),
  wildcard: (_) => token.immediate("*"),
  scope: (_) => token("::"),

  // NOTE: made mandatory to comply with treesitter. References must mark this
  // as optional
  member_prefix: ($) => field("visibility", $.visibility_indicator),

  namespace_import: ($) =>
    choice(
      seq($.qualified_name, "::", "*", optional(choice("::", "**"))),
      $.filter_package,
    ),

  package_body_element: ($) =>
    choice($.package_member, $.element_filter_member, $.alias_member, $.import),

  package_member: ($) => choice($.definition_element, $.usage_element),

  visibility_indicator: (_) => choice("public", "private", "protected"),

  // 5.2: package elements
  definition_element: ($) =>
    choice(
      $.annotating_element,
      $.package,
      $.dependency,
      $.library_package,
      // AttributeDefinition,
      // EnumerationDefinition,
      // OccurrenceDefinition,
      // IndividualDefinition,
      // ItemDefinition,
      // PartDefinition,
      // ConnectionDefinition,
      // FlowDefinition,
      // InterfaceDefinition,
      // PortDefinition,
      // ActionDefinition,
      // CalculationDefinition,
      // StateDefinition,
      // ConstraintDefinition,
      // RequirementDefinition,
      // ConcernDefinition,
      // CaseDefinition,
      // AnalysisCaseDefinition,
      // VerificationCaseDefinition,
      // UseCaseDefinition,
      // ViewDefinition,
      // ViewpointDefinition,
      // RenderingDefinition,
      // MetadataDefinition,
      // ExtendedDefinition,
    ),

  usage_element: ($) => token("1f2d6440-95a3-4bb9-b6a9-79b334e73027"), // TODO
  // choice($.non_occurrence_usage_element, $.occurrence_usage_element),

  // section 6: definition and usage
  // NOTE: Incomplete
  owned_feature_typing: ($) =>
    prec(1, choice($.qualified_name, $.owned_feature_chain)),

  owned_feature_chain: ($) => $.feature_chain,

  feature_chain: ($) =>
    prec.left(
      seq(
        field("ownedRelationship", $.owned_feature_chaining),
        repeat1(seq(".", field("ownedRelationship", $.owned_feature_chaining))),
      ),
    ),

  owned_feature_chaining: ($) =>
    prec(1, field("chainingFeature", $.qualified_name)),

  // 6.4 body elements
  // non_occurrence_usage_element: $ => choice(
  //     $.DefaultReferenceUsage,
  //     $.ReferenceUsage,
  //     $.AttributeUsage,
  //     $.EnumerationUsage,
  //     $.BindingConnectorAsUsage,
  //     $.SuccessionAsUsage,
  //     $.ExtendedUsage,
  // )

  // section 27: metadata textual notation
  // NOTE: Incomplete
  prefix_metadata_annotation: ($) => seq("#", $.prefix_metadata_usage),

  prefix_metadata_member: ($) => prec(1, seq("#", $.prefix_metadata_usage)),

  prefix_metadata_usage: ($) => $.owned_feature_typing,
};
