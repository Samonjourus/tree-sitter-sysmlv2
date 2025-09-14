// section 8.2.2.6: Definition and usage textual notation
module.exports = {
  // section 1: Definitions
  basic_definition_prefix: ($) =>
    choice(
      field("isAbstract", $.abstract_keyword),
      field("isVariation", $.variation_keyword),
    ),

  definition_extension_keyword: ($) =>
    field("ownedRelationship", $.prefix_metadata_member),

  // NOTE: must always be optional
  definition_prefix: ($) =>
    choice(
      repeat1($.definition_extension_keyword),
      $.basic_definition_prefix,
      seq($.basic_definition_prefix, repeat1($.definition_extension_keyword)),
    ),

  definition: ($) => choice($.definition_declaration, $.definition_body),

  definition_declaration: ($) =>
    choice($.identification, $.subclassification_part),

  definition_body: ($) =>
    choice(";", seq("{", repeat($.definition_body_item), "}")),

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

  non_occurrence_usage_member: ($) =>
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

  // section 2: Usages
  feature_direction: ($) =>
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

  owned_cross_feature: ($) => seq($.basic_usage_prefix, $.usage_declaration),

  usage_extension_keyword: ($) =>
    field("ownedRelationship", $.prefix_metadata_member),

  unextended_usage_prefix: ($) =>
    choice($.basic_usage_prefix, $.end_usage_prefix),

  usage_prefix: ($) =>
    seq($.unextended_usage_prefix, repeat($.usage_extension_keyword)),

  usage: ($) => seq($.usage_declaration, $.usage_completion),

  usage_declaration: ($) =>
    seq($.identification, optional($.feature_specialization_part)),

  usage_completion: ($) => seq(optional($.value_part), $.usage_body),

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

  // section 3: Reference usages
  default_reference_usage: ($) => seq($.ref_prefix, $.usage),

  reference_usage: ($) =>
    seq(choice($.end_usage_prefix, $.ref_prefix), $.ref_keyword, $.usage),

  variant_reference: ($) =>
    seq(
      field("ownedRelationship", $.owned_reference_subsetting),
      repeat($.feature_specialization),
      $.usage_body,
    ),

  // section 4: Body elements
  non_occurrence_usage_element: ($) =>
    choice(
      $.default_reference_usage,
      $.reference_usage,
      $.attribute_usage,
      $.enumeration_usage,
      $.binding_connector_as_usage,
      $.succession_as_usage,
      $.extended_usage,
    ),

  occurrence_usage_element: ($) =>
    choice($.structure_usage_element, $.behavior_usage_element),

  structure_usage_element: ($) =>
    choice(
      $.occurrence_usage,
      $.individual_usage,
      $.portion_usage,
      $.event_occurrence_usage,
      $.item_usage,
      $.part_usage,
      $.view_usage,
      $.rendering_usage,
      $.port_usage,
      $.connection_usage,
      $.interface_usage,
      $.allocation_usage,
      $.message,
      $.flow_usage,
      $.succession_flow_usage,
    ),

  behavior_usage_element: ($) =>
    choice(
      $.action_usage,
      $.calculation_usage,
      $.state_usage,
      $.constraint_usage,
      $.requirement_usage,
      $.concern_usage,
      $.case_usage,
      $.analysis_case_usage,
      $.verification_case_usage,
      $.use_case_usage,
      $.viewpoint_usage,
      $.perform_action_usage,
      $.exhibit_state_usage,
      $.include_use_case_usage,
      $.assert_constraint_usage,
      $.satisfy_requirement_usage,
    ),

  variant_usage_element: ($) =>
    choice(
      $.variant_reference,
      $.reference_usage,
      $.attribute_usage,
      $.binding_connector_as_usage,
      $.succession_as_usage,
      $.occurrence_usage,
      $.individual_usage,
      $.portion_usage,
      $.event_occurrence_usage,
      $.item_usage,
      $.part_usage,
      $.view_usage,
      $.rendering_usage,
      $.port_usage,
      $.connection_usage,
      $.interface_usage,
      $.allocation_usage,
      $.message,
      $.flow_usage,
      $.succession_flow_usage,
      $.behavior_usage_element,
    ),

  // section 5: Specialization
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
      seq($.multiplicity_part, repeat($.feature_specialization)),
    ),

  feature_specialization: ($) =>
    choice($.typings, $.subsettings, $.references, $.crosses, $.redefinitions),

  typings: ($) =>
    seq(
      $.typed_by,
      repeat(seq(token(","), field("ownedRelationship", $.feature_typing))),
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
      repeat(seq(token(","), field("ownedRelationship", $.feature_typing))),
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
      repeat1(seq(".", field("ownedRelationship", $.owned_feature_chaining))),
    ),

  owned_feature_chaining: ($) => field("chainingFeature", $.qualified_name),

  // section 6: Multiplicity
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
};
