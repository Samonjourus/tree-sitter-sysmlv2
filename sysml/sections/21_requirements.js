// section 8.2.2.21: Requirements textual notation
module.exports = {
  // section 8.2.2.21.1: Requirements definitions
  requirement_definition: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.requirement_keyword,
      $.def_keyword,
      $.definition_declaration,
      $.requirement_body,
    ),

  requirement_body: ($) =>
    choice(
      token(";"),
      seq(token("{"), repeat($.requirement_body_item), token("}")),
    ),

  requirement_body_item: ($) =>
    choice(
      $.definition_body_item,
      $.subject_member,
      $.requirement_constraint_member,
      $.framed_concern_member,
      $.requirement_verification_member,
      $.actor_member,
      $.stakeholder_member,
    ),

  subject_member: ($) =>
    seq($.subject_keyword, field("ownedRelatedElement", $.subject_usage)),

  subject_usage: ($) =>
    seq($.subject_keyword, repeat($.usage_extension_keyword), $.usage),

  requirement_constraint_member: ($) =>
    seq(
      optional($.member_prefix),
      $.requirement_kind,
      field("ownedRelatedElement", $.requirement_constraint_usage),
    ),

  requirement_kind: ($) => choice($.assume_keyword, $.require_keyword),

  requirement_constraint_usage: ($) =>
    seq(
      field("ownedRelationship", $.owned_reference_subsetting),
      optional($.feature_specialization_part),
      $.requirement_body,
      choice(
        seq(repeat($.usage_extension_keyword), $.constraint_keyword),
        repeat1($.usage_extension_keyword),
      ),
      $.constraint_usage_declaration,
      $.calculation_body,
    ),

  framed_concern_member: ($) =>
    seq(
      optional($.member_prefix),
      $.frame_keyword,
      field("ownedRelatedElement", $.framed_concern_usage),
    ),

  framed_concern_usage: ($) =>
    choice(
      seq(
        field("ownedRelationship", $.owned_reference_subsetting),
        optional($.feature_specialization_part),
        $.calculation_body,
      ),
      seq(
        choice(
          seq(repeat($.usage_extension_keyword), $.concern_keyword),
          repeat1($.usage_extension_keyword),
        ),
        // $.calculation_usage_declaration,
        // $.calculation_body,
      ),
    ),

  actor_member: ($) =>
    seq($.member_prefix, field("ownedRelatedElement", $.actor_usage)),

  actor_usage: ($) =>
    seq($.actor_keyword, repeat($.usage_extension_keyword), $.usage),

  stakeholder_member: ($) =>
    seq($.member_prefix, field("ownedRelatedElement", $.stakeholder_usage)),

  stakeholder_usage: ($) =>
    seq($.stakeholder_keyword, repeat($.usage_extension_keyword), $.usage),

  // section 8.2.2.21.2: Requirement usages
  requirement_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.requirement_keyword,
      $.constraint_usage_declaration,
      $.requirement_body,
    ),

  satisfy_requirement_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.assert_keyword,
      field("isNegated", $.not_keyword),
      $.satisfy_keyword,
      choice(
        seq(
          field("ownedRelationship", $.owned_reference_subsetting),
          optional($.feature_specialization_part),
        ),
        seq($.requirement_keyword, $.usage_declaration),
      ),
      optional($.value_part),
      optional(seq($.by_keyword, $.satisfaction_subject_matter)),
      $.requirement_body,
    ),

  satisfaction_subject_matter: ($) =>
    field("ownedRelatedElement", $.satisfaction_parameter),

  satisfaction_parameter: ($) =>
    field("ownedRelationship", $.satisfaction_feature_value),

  satisfaction_feature_value: ($) =>
    field("ownedRelatedElement", $.satisfaction_reference_expression),

  satisfaction_reference_expression: ($) =>
    field("ownedRelationship", $.feature_chain_member),

  // section 8.2.2.21.3: concerns
  concern_definition: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.concern_keyword,
      $.def_keyword,
      $.definition_declaration,
      $.requirement_body,
    ),

  concern_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.concern_keyword,
      $.constraint_usage_declaration,
      $.requirement_body,
    ),
};
