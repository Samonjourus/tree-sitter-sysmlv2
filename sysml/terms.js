module.exports = {
  // section 8.2.2.2: Elements and relationships textual notation
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

  //section 8.2.2.4: Annotations textual notation
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

  // section 5: Namespaces and packages textual notation
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

  filter_package_member: ($) => seq(token("["), $.owned_expression, token("]")),

  // definitons of namespace import + membership import needed to be inlined...
  // because im simply not smart enough :)
  import_declaration: ($) => $.qualified_path,

  recurse: (_) => token("**"),
  wildcard: (_) => token.immediate("*"),
  scope: (_) => token("::"),
  square_close: (_) => token("]"),
  square_open: (_) => token("["),

  // NOTE: made mandatory to comply with treesitter. References must mark this
  // as optional
  member_prefix: ($) => field("visibility", $.visibility_indicator),

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

  // section 8.2.2.6: Definition and usage textual notation
  // section 8.2.2.6.1: Definitions

  basic_definition_prefix: ($) =>
    choice(
      field("isAbstract", $.abstract_keyword),
      field("isVariation", $.variation_keyword),
    ),

  definition_extension_keyword: ($) =>
    field("ownedRelationship", $.prefix_metadata_member),

  definition_prefix: ($) =>
    seq(
      optional($.basic_definition_prefix),
      repeat($.definition_extension_keyword),
    ),

  definition_body: ($) =>
    choice(";", seq("{", repeat($.definition_body_item), "}")),

  definition_declaration: ($) =>
    choice($.identification, $.subclassification_part),

  definition_body_item: ($) =>
    choice(
      field("ownedRelationship", $.definition_member),
      field("ownedRelationship", $.variant_usage_member),
      field("ownedRelationship", $.non_occurrence_usage_member),
      seq(
        optional(field("ownedRelationship", $.source_succession_member)),
        field("ownedRelationship", $.occurrence_usage_member),
      ),
      field("ownedRelationship", $.alias_member),
      field("ownedRelationship", $.import),
    ),

  definition_member: ($) =>
    seq($.member_prefix, field("ownedRelatedElement", $.definition_element)),

  variant_usage_member: ($) =>
    seq(
      $.member_prefix,
      $.variant_keyword,
      field("ownedVariantUsage", $.variant_usage_element),
    ),

  non_currence_usage_member: ($) =>
    seq(
      $.member_prefix,
      field("ownedRelatedElement", $.non_occurrence_usage_element),
    ),

  occurrence_usage_member: ($) =>
    seq(
      $.member_prefix,
      field("ownedRelatedElement", $.occurrence_usage_element),
    ),

  structure_usage_member: ($) =>
    seq(
      $.member_prefix,
      field("ownedRelatedElement", $.structure_usage_element),
    ),

  behavior_usage_member: ($) =>
    seq(
      $.member_prefix,
      field("ownedRelatedElement", $.behavior_usage_element),
    ),

  // section 8.2.2.6.2: Usages
  feature_direction: (_) =>
    choice($.in_keyword, $.out_keyword, $.inout_keyword),

  ref_prefix: ($) =>
    seq(
      optional(field("direction", $.feature_direction)),
      optional(field("isDerived", $.derived_keyword)),
      optional(
        choice(
          field("isAbstract", $.abstract_keyword),
          field("isVariation", $.variation_keyword),
        ),
      ),
      field("isConstant", $.constant_keyword),
    ),

  basic_usage_prefix: ($) => seq($.ref_prefix, optional($.ref_prefix)),

  end_usage_prefix: ($) =>
    seq(
      field("isEnd", $.end_keyword),
      optional(field("ownedRelationship", $.owned_cross_feature_member)),
    ),

  owned_cross_feature_member: ($) =>
    field("ownedRelatedElement", $.owned_cross_feature),

  owned_cross_feature: ($) => seq($.basic_usage_prefix, $.usage_declararion),

  usage_extension_keyword: ($) =>
    field("ownedRelationship", $.prefix_metadata_member),

  unextended_usage_prefix: ($) =>
    choice($.basic_usage_prefix, $.end_usage_prefix),

  usage_prefix: ($) =>
    seq($.unextended_usage_prefix, repeat($.usage_extension_keyword)),

  usage: ($) => seq($.usage_declararion, $.usage_completion),

  usage_declararion: ($) =>
    seq($.identification, optional($.feature_specialization_part)),

  usage_completion: ($) => seq(optional($.value_path), $.usage_body),

  usage_body: ($) => $.definition_body,

  value_part: ($) => field("ownedRelationship", $.feature_value),

  feature_value: ($) =>
    seq(
      choice(
        token("="),
        field("isInitial", token(":=")),
        seq(
          field("isDefault", $.default_keyword),
          choice(token("="), field("isInitial", token(":="))),
        ),
      ),
      $.owned_expression,
    ),

  // section 8.2.2.6.3: Reference usages
  default_reference_usage: ($) => seq($.ref_prefix, $.usage),

  reference_usage: ($) =>
    seq(choice($.end_usage_prefix, $.ref_prefix), $.ref_keyword, $.usage),

  variant_reference: ($) =>
    seq(
      field("ownedRelationship", $.owned_reference_subsetting),
      repeat($.feature_specialization),
      $.usage_body,
    ),

  // section 8.2.2.6.4: Body elements
  non_occurrence_usage_element: ($) =>
    choice(
      $.DefaultReferenceUsage,
      $.ReferenceUsage,
      $.AttributeUsage,
      $.EnumerationUsage,
      $.BindingConnectorAsUsage,
      $.SuccessionAsUsage,
      $.ExtendedUsage,
    ),

  occurrence_usage_element: ($) =>
    choice($.structure_usage_element, $.behavior_usage_element),

  structure_usage_element: ($) =>
    choice(
      $.OccurrenceUsage,
      $.IndividualUsage,
      $.PortionUsage,
      $.EventOccurrenceUsage,
      $.ItemUsage,
      $.PartUsage,
      $.ViewUsage,
      $.RenderingUsage,
      $.PortUsage,
      $.ConnectionUsage,
      $.InterfaceUsage,
      $.AllocationUsage,
      $.Message,
      $.FlowUsage,
      $.SuccessionFlowUsage,
    ),

  behavior_usage_element: ($) =>
    choice(
      $.ActionUsage,
      $.CalculationUsage,
      $.StateUsage,
      $.ConstraintUsage,
      $.RequirementUsage,
      $.ConcernUsage,
      $.CaseUsage,
      $.AnalysisCaseUsage,
      $.VerificationCaseUsage,
      $.UseCaseUsage,
      $.ViewpointUsage,
      $.PerformActionUsage,
      $.ExhibitStateUsage,
      $.IncludeUseCaseUsage,
      $.AssertConstraintUsage,
      $.SatisfyRequirementUsage,
    ),

  variant_usage_element: ($) =>
    choice(
      $.VariantReference,
      $.ReferenceUsage,
      $.AttributeUsage,
      $.BindingConnectorAsUsage,
      $.SuccessionAsUsage,
      $.OccurrenceUsage,
      $.IndividualUsage,
      $.PortionUsage,
      $.EventOccurrenceUsage,
      $.ItemUsage,
      $.PartUsage,
      $.ViewUsage,
      $.RenderingUsage,
      $.PortUsage,
      $.ConnectionUsage,
      $.InterfaceUsage,
      $.AllocationUsage,
      $.Message,
      $.FlowUsage,
      $.SuccessionFlowUsage,
      $.BehaviorUsageElement,
    ),

  // section 8.2.2.6.5: specialization
  subclassification_part: ($) =>
    seq(
      $.specializes_keyword,
      field("ownedRelationship", $.owned_subclassification),
      repeat(
        seq(token(","), field("ownedRelationship", $.owned_subclassification)),
      ),
    ),

  owned_subclassification: ($) => field("superclassifier", $.qualified_name),

  feature_specialization_part: ($) =>
    choice(
      seq(
        repeat1($.feature_specialization),
        optional($.multiplicity_part),
        repeat($.feature_specialization),
      ),
      $.multiplicity_part,
      repeat($.feature_specialization),
    ),

  feature_specialization: ($) =>
    choice($.typings, $.subsettings, $.references, $.crosses, $.redefinitions),

  typings: ($) =>
    seq(
      $.typed_by,
      repeat(token(","), field("ownedRelationship", $.feature_typing)),
    ),

  typed_by: ($) =>
    seq($.defined_by, field("ownedRelationship", $.feature_typing)),

  feature_typing: ($) =>
    choice($.owned_feature_typing, $.conjugated_port_typing),

  owned_feature_typing: ($) =>
    choice(
      field("type", $.qualified_name),
      field("type", $.owned_feature_chain),
    ),

  subsettings: ($) =>
    seq(
      $.subsets,
      repeat(token(","), field("ownedRelationship", $.feature_typing)),
    ),

  subsets: ($) =>
    seq($.subsets_keyword, field("ownedRelationship", $.owned_subsetting)),

  owned_subsetting: ($) =>
    choice(
      field("type", $.qualified_name),
      field("type", $.owned_feature_chain),
    ),

  references: ($) =>
    seq(
      $.references_keyword,
      field("ownedRelationship", $.owned_reference_subsetting),
    ),

  owned_reference_subsetting: ($) =>
    choice(
      field("referencedFeature", $.qualified_name),
      field("referencedFeature", $.owned_feature_chain),
    ),

  crosses: ($) =>
    seq(
      $.crosses_keyword,
      field("ownedRelationship", $.owned_cross_subsetting),
    ),

  owned_cross_subsetting: ($) =>
    choice(
      field("crossedFeature", $.qualified_name),
      field("crossedFeature", $.owned_feature_chain),
    ),

  redefinitions: ($) =>
    seq(
      $.redefines,
      repeat(seq(",", field("ownedRelationship", $.owned_redefinition))),
    ),

  redefines: ($) =>
    seq($.redefines_keyword, field("ownedRelationship", $.owned_redefinition)),

  owned_redefinition: ($) =>
    choice(
      field("redefinedFeature", $.qualified_name),
      field("redefinedFeature", $.owned_feature_chain),
    ),

  owned_feature_chain: ($) =>
    seq(
      field("ownedRelationship", $.owned_feature_chaining),
      repeat1(".", field("ownedRelationship", $.owned_feature_chaining)),
    ),

  owned_feature_chaining: ($) => field("chainingFeature", $.qualified_name),

  // section 8.2.2.6.5: specialization
  multiplicity_part: ($) =>
    choice(
      field("ownedRelationship", $.owned_multiplicity),
      seq(
        optional(field("ownedRelationship", $.owned_multiplicity)),
        choice(
          seq(
            field("isOrdered", $.ordered_keyword),
            optional($.nonunique_keyword),
          ),
          seq(
            $.nonunique_keyword,
            optional(field("isOrdered", $.ordered_keyword)),
          ),
        ),
      ),
    ),

  owned_multiplicity: ($) => field("ownedRelatedElement", $.multiplicity_range),

  multiplicity_range: ($) =>
    seq(
      $.square_open,
      optional(
        seq(field("ownedRelationship", $.multiplicity_expression_member), ".."),
      ),
      field("ownedRelationship", $.multiplicity_expression_member),
      $.square_close,
    ),

  multiplicity_expression_member: ($) =>
    field(
      "ownedRelatedElement",
      choice($.literal_expression, $.feature_reference_expression),
    ),

  // section 8.2.2.7: Attributes textual notation
  attribute_definition: ($) =>
    seq($.definition_prefix, $.attribute_keyword, $.def_keyword, $.definition),

  attribute_usage: ($) => seq($.usage_prefix, $.attribute_keyword, $.usage),
  // section 8.2.2.8: Enumerations textual notation
  // section 8.2.2.9: Occurrences textual notation
  // section 8.2.2.10: Items textual notation
  // section 8.2.2.11: Parts textual notation
  // section 8.2.2.12: Ports textual notation
  // section 8.2.2.13: Connections textual notation
  // section 8.2.2.14: Interfaces textual notation
  // section 8.2.2.15: Allocations textual notation
  // section 8.2.2.16: Flows textual notation
  // section 8.2.2.17: Actions textual notation
  // section 8.2.2.18: States textual notation
  // section 8.2.2.19: Calculations textual notation
  // section 8.2.2.20: Constraints textual notation
  // section 8.2.2.21: Requirements textual notation
  // section 8.2.2.22: Cases textual notation
  // section 8.2.2.23: Analysis textual notation
  // section 8.2.2.24: Verification textual notation
  // section 8.2.2.25: Use Cases textual notation
  // section 8.2.2.26: Views and Viewpoints textual notation
  // section 8.2.2.27: Metadata textual notation

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
