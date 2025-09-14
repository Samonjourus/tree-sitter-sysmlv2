module.exports = {
  // section 8.2.2.9.1: Occurrence definitions
  occurrence_definition_prefix: ($) =>
    seq(
      optional($.basic_definition_prefix),
      optional(
        seq(
          field("isIndivdual", $.individual_keyword),
          field("ownedRelationship", $.empty_multiplicity_member),
        ),
      ),
      repeat($.definition_extension_keyword),
    ),

  occurrence_definition: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.occurrence_keyword,
      $.def_keyword,
      $.definition,
    ),

  individual_definition: ($) =>
    seq(
      optional($.basic_definition_prefix),
      optional(field("isIndivdual", $.individual_keyword)),
      repeat($.definition_extension_keyword),
      $.def_keyword,
      $.definition,
      field("ownedRelationship", $.empty_multiplicity_member),
    ),

  empty_multiplicity_member: ($) =>
    field("ownedRelatedElement", $.empty_multiplicity),

  empty_multiplicity: ($) => seq(token("{"), token("}")),

  // section 8.2.2.9.2: Occurrences Usages
  occurrence_usage_prefix: ($) =>
    seq(
      $.basic_usage_prefix,
      optional(field("isIndivdual", $.individual_keyword)),
      optional(field("portionKind", $.portion_kind)),
      repeat($.usage_extension_keyword),
    ),

  occurrence_usage: ($) =>
    seq($.occurrence_usage_prefix, $.occurrence_keyword, $.usage),

  individual_usage: ($) =>
    seq(
      $.basic_usage_prefix,
      optional(field("isIndivdual", $.individual_keyword)),
      field("portionKind", $.portion_kind),
      repeat($.usage_extension_keyword),
      $.usage,
    ),

  portion_usage: ($) =>
    seq(
      $.basic_usage_prefix,
      optional(field("isIndivdual", $.individual_keyword)),
      field("portionKind", $.portion_kind),
      repeat($.usage_extension_keyword),
      $.usage,
    ),

  portion_kind: ($) => choice($.snapshot_keyword, $.timeslice_keyword),

  event_occurrence_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.event_keyword,
      choice(
        seq(
          field("ownedRelationship", $.owned_reference_subsetting),
          optional($.feature_specialization_part),
        ),
        seq($.occurrence_keyword, optional($.usage_declaration)),
      ),
      $.usage_completion,
    ),
  // section 8.2.2.9.3 Occurrence successions
  source_succession_member: ($) =>
    seq(
      $.then_keyword,
      optional(field("ownedRelatedElement", $.source_succession)),
    ),

  // must always be made optional
  source_succession: ($) => field("ownedRelationship", $.source_end_member),

  // must always be made optional
  source_end_member: ($) => field("ownedRelatedElement", $.source_end),

  // must always be made optional
  source_end: ($) => field("ownedRelationship", $.owned_multiplicity),
};
