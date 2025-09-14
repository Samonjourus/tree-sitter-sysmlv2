// section 8.2.2.18: States textual notation
module.exports = {
  // section 8.2.2.18.1: State definitions
  state_definition: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.state_keyword,
      $.def_keyword,
      $.definition_declaration,
      $.state_def_body,
    ),

  state_def_body: ($) =>
    choice(
      token(";"),
      seq(
        optional(field("isParallel", $.parallel_keyword)),
        token("{"),
        repeat($.state_body_item),
        token("}"),
      ),
    ),

  state_body_item: ($) =>
    choice(
      $.non_behavior_body_item,
      seq(
        optional(field("ownedRelationship", $.source_succession_member)),
        field("ownedRelationship", $.behavior_usage_member),
        repeat(field("ownedRelationship", $.target_transition_usage_member)),
      ),
      field("ownedRelationship", $.transition_usage_member),
      seq(
        field("ownedRelationship", $.entry_action_member),
        repeat(field("ownedRelationship", $.empty_transition_member)),
      ),
      field("ownedRelationship", $.do_action_member),
      field("ownedRelationship", $.entry_action_member),
    ),

  entry_action_member: ($) =>
    seq(
      optional($.member_prefix),
      field("kind", $.entry_keyword),
      field("ownedRelatedElement", $.state_action_usage),
    ),

  do_action_member: ($) =>
    seq(
      optional($.member_prefix),
      field("kind", $.do_keyword),
      field("ownedRelatedElement", $.state_action_usage),
    ),

  exit_action_member: ($) =>
    seq(
      optional($.member_prefix),
      field("kind", $.exit_keyword),
      field("ownedRelatedElement", $.state_action_usage),
    ),

  empty_transition_member: ($) =>
    seq(
      optional($.member_prefix),
      choice(
        field("ownedRelatedElement", $.guarded_target_succession),
        seq($.then_keyword, field("ownedRelatedElement", $.target_succession)),
      ),
      token(";"),
    ),

  state_action_usage: ($) =>
    choice(
      seq($.empty_action_usage, token(";")),
      $.state_perform_action_usage,
      $.state_accept_action_usage,
      $.state_send_action_usage,
      $.state_assignment_action_usage,
    ),

  empty_action_usage: (_) => token("d5ecb9e9-8649-4fe4-b878-ede63d3ee043"),

  state_perform_action_usage: ($) =>
    seq($.perform_action_usage_declaration, $.action_body),

  state_accept_action_usage: ($) =>
    seq($.accept_node_declaration, $.action_body),

  state_send_action_usage: ($) => seq($.send_node_declaration, $.action_body),

  state_assignment_action_usage: ($) =>
    seq($.assignment_node_declaration, $.action_body),

  transition_usage_member: ($) =>
    seq(
      optional($.member_prefix),
      field("ownedRelatedElement", $.transition_usage),
    ),

  target_transition_usage_member: ($) =>
    seq(
      optional($.member_prefix),
      field("ownedRelatedElement", $.target_transition_usage),
    ),

  // section 8.2.2.18.2: State usages
  state_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.state_keyword,
      $.action_usage_declaration,
      $.state_usage_body,
    ),

  state_usage_body: ($) =>
    choice(
      token(";"),
      seq(
        optional(field("isParallel", $.parallel_keyword)),
        token("{"),
        repeat($.state_body_item),
        token("}"),
      ),
    ),

  exhibit_state_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.exhibit_keyword,
      choice(
        seq(
          field("ownedRelationship", $.owned_reference_subsetting),
          optional($.feature_specialization_part),
        ),
        seq($.state_keyword, $.usage_declaration),
      ),
      $.value_part,
      $.state_usage_body,
    ),

  // section 8.2.2.18.3: Transition usages
  transition_usage: ($) =>
    seq(
      $.transition_keyword,
      optional(seq($.usage_declaration, $.first_keyword)),
      field("ownedRelationship", $.feature_chain_member),
      field("ownedRelationship", $.empty_parameter_member),
      optional(
        seq(
          field("ownedRelationship", $.empty_parameter_member),
          field("ownedRelationship", $.trigger_action_member),
        ),
      ),
      optional(field("ownedRelationship", $.guard_expression_member)),
      optional(field("ownedRelationship", $.effect_behavior_member)),
      $.then_keyword,
      optional(field("ownedRelationship", $.transition_succession_member)),
      $.action_body,
    ),

  target_transition_usage: ($) =>
    seq(
      field("ownedRelationship", $.empty_parameter_member),
      optional(
        choice(
          seq(
            $.transition_keyword,
            optional(
              seq(
                field("ownedRelationship", $.empty_parameter_member),
                field("ownedRelationship", $.trigger_action_member),
              ),
            ),
            optional(field("ownedRelationship", $.guard_expression_member)),
            optional(field("ownedRelationship", $.effect_behavior_member)),
          ),
          seq(
            field("ownedRelationship", $.empty_parameter_member),
            field("ownedRelationship", $.trigger_action_member),
            optional(field("ownedRelationship", $.guard_expression_member)),
            optional(field("ownedRelationship", $.effect_behavior_member)),
          ),
          seq(
            field("ownedRelationship", $.guard_expression_member),
            optional(field("ownedRelationship", $.effect_behavior_member)),
          ),
        ),
      ),
      $.then_keyword,
      field("ownedRelationship", $.transition_succession_member),
      $.action_body,
    ),

  trigger_action_member: ($) =>
    seq($.action_keyword, field("ownedRelatedElement", $.trigger_action)),

  trigger_action: ($) =>
    seq(
      $.action_keyword,
      field("ownedRelatedElement", $.accept_parameter_part),
    ),

  guard_expression_member: ($) =>
    seq($.if_keyword, field("ownedRelatedElement", $.owned_expression)),

  effect_behavior_member: ($) =>
    seq($.do_keyword, field("ownedRelatedElement", $.effect_behavior_usage)),

  effect_behavior_usage: ($) =>
    choice(
      $.empty_action_usage,
      $.transition_perform_action_usage,
      $.transition_accept_action_usage,
      $.transition_send_action_usage,
      $.transition_assignment_action_usage,
    ),

  transition_perform_action_usage: ($) =>
    seq(
      $.perform_action_usage_declaration,
      optional(seq(token("{"), repeat($.action_body_item), token("}"))),
    ),

  transition_accept_action_usage: ($) =>
    seq(
      $.accept_node_declaration,
      optional(seq(token("{"), repeat($.action_body_item), token("}"))),
    ),

  transition_send_action_usage: ($) =>
    seq(
      $.send_node_declaration,
      optional(seq(token("{"), repeat($.action_body_item), token("}"))),
    ),

  transition_assignment_action_usage: ($) =>
    seq(
      $.assignment_node_declaration,
      optional(seq(token("{"), repeat($.action_body_item), token("}"))),
    ),

  transition_succession_member: ($) =>
    field("ownedRelatedElement", $.transition_succession),

  transition_succession: ($) =>
    seq(
      field("ownedRelationship", $.empty_end_member),
      field("ownedRelationship", $.connector_end_member),
    ),

  empty_end_member: ($) => field("ownedRelatedElement", $.empty_feature),

  empty_feature: (_) => token("e0b3432f-86d7-46c1-b123-f648ffda9299"),
};
