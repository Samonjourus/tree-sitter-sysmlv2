module.exports = {
  flow_definition: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.flow_keyword,
      $.def_keyword,
      $.definition,
    ),

  message: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.message_keyword,
      $.message_declaration,
      $.definition_body,
    ),

  message_declaration: ($) =>
    choice(
      seq(
        $.usage_declaration,
        optional($.value_part),
        optional(
          seq(
            $.of_keyword,
            field("ownedRelationship", $.flow_payload_feature_member),
          ),
        ),
        optional(
          seq(
            $.from_keyword,
            field("ownedRelationship", $.message_event_member),
            $.to_keyword,
            field("ownedRelationship", $.message_event_member),
          ),
        ),
      ),
      seq(
        field("ownedRelationship", $.message_event_member),
        $.to_keyword,
        field("ownedRelationship", $.message_event_member),
      ),
    ),

  message_event_member: ($) => field("ownedRelatedElement", $.message_event),

  message_event: ($) =>
    field("ownedRelationship", $.owned_reference_subsetting),

  flow_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.flow_keyword,
      $.flow_declaration,
      $.definition_body,
    ),

  succession_flow_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.succession_keyword,
      $.flow_keyword,
      $.flow_declaration,
      $.definition_body,
    ),

  flow_declaration: ($) =>
    choice(
      seq(
        $.usage_declaration,
        optional($.value_part),
        optional(seq($.of_keyword, $.flow_payload_feature_member)),
        optional(
          seq(
            $.from_keyword,
            $.flow_end_member,
            $.to_keyword,
            $.flow_end_member,
          ),
        ),
      ),
      seq($.flow_end_member, $.to_keyword, $.flow_end_member),
    ),

  flow_payload_feature_member: ($) =>
    field("ownedRelatedElement", $.flow_payload_feature),

  flow_payload_feature: ($) => $.payload_feature,

  payload_feature: ($) =>
    choice(
      seq(
        optional($.identification),
        $.payload_feature_specialization_part,
        optional($.value_part),
      ),
      seq(
        field("ownedRelationship", $.owned_feature_typing),
        field("ownedRelationship", $.owned_multiplicity),
      ),
      seq(
        field("ownedRelationship", $.owned_multiplicity),
        field("ownedRelationship", $.owned_feature_typing),
      ),
    ),

  payload_feature_specialization_part: ($) =>
    choice(
      seq(
        repeat1($.feature_specialization),
        optional($.multiplicity_part),
        repeat($.feature_specialization),
      ),
      seq($.multiplicity_part, repeat1($.feature_specialization)),
    ),

  flow_end_member: ($) => field("ownedRelatedElement", $.flow_end),

  flow_end: ($) =>
    seq(
      optional(field("ownedRelationship", $.flow_end_subsetting)),
      field("ownedRelationship", $.flow_feature_member),
    ),

  flow_end_subsetting: ($) =>
    choice(
      field("referencedFeature", $.qualified_name),
      field("referencedFeature", $.feature_chain_prefix),
    ),

  feature_chain_prefix: ($) =>
    seq(
      repeat1(
        seq(field("ownedRelationship", $.owned_feature_chaining), token(".")),
      ),
      field("ownedRelationship", $.owned_feature_chaining),
      token("."),
    ),

  flow_feature_member: ($) => field("ownedRelationship", $.flow_feature),

  flow_feature: ($) => field("ownedRelationship", $.flow_feature_redefinition),

  flow_feature_redefinition: ($) =>
    field("ownedRelationship", $.qualified_name),
};
