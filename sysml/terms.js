module.exports = {
  // section 2: root syntax
  identification: ($) =>
    choice(seq("<", $.name, ">"), $.name, seq("<", $.name, ">", $.name)),

  relationship_body: ($) =>
    choice(token(";"), seq("{", repeat($.owned_annotation), "}")),

  //section 4: annotations
  annotation: ($) => $.qualified_name,

  owned_annotation: ($) => $.annotating_element,

  annotating_member: ($) => $.annotating_element,

  annotating_element: ($) =>
    choice(
      $.comment,
      //"", //$.documentation,
      //"", //$.textual_representation,
      //"", //$.metadata_feature,
    ),

  // section 5: namespaces
  package_body_element: ($) =>
    choice($.package_member, $.element_filter_member, $.alias_member, $.import),

  package_member: ($) => choice($.definition_element, $.usage_element),
  element_filter_member: (_) => "06a5998e-4600-4331-985c-11c8cf20a1d4", // TODO: replace
  alias_member: (_) => "18aa5fe4-775b-4b29-b49e-32bd73a5a38f", // TODO: replace
  import: (_) => "e273276f-9194-4692-b8d5-199968ea8f4f", // TODO replace

  definition_element: ($) =>
    choice(
      $.dependency,
      // library_package,
      // AnnotatingElement,
      // Dependency,
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

  owned_feature_chain: ($) =>
    seq($.owned_feature_chaining, repeat1(seq(".", $.owned_feature_chaining))),

  owned_feature_chain: ($) => seq($.qualified_name),

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

  prefix_metadata_usage: ($) => $.owned_feature_typing,
};
