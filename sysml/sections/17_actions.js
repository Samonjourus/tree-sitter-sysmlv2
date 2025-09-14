// section 8.2.2.17: Actions textual notation
module.exports = {
  // section 8.2.2.17.1: Action definitions
  action_definition: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.action_keyword,
      $.def_keyword,
      $.definition_declaration,
      $.action_body,
    ),

  action_body: ($) =>
    choice(token(";"), seq(token("{"), repeat($.action_body_item), token("}"))),

  action_body_item: ($) =>
    choice(
      $.non_behavior_body_item,
      seq(
        field("ownedRelationship", $.initial_node_member),
        repeat(field("ownedRelationship", $.action_target_succession_member)),
      ),
      seq(
        optional(field("ownedRelationship", $.source_succession_member)),
        field("ownedRelationship", $.action_behavior_member),
        field("ownedRelationship", $.action_target_succession_member),
      ),
      $.guarded_succession_member,
    ),

  non_behavior_body_item: ($) =>
    choice(
      field("ownedRelationship", $.import),
      field("ownedRelationship", $.alias_member),
      field("ownedRelationship", $.definition_member),
      field("ownedRelationship", $.variant_usage_member),
      field("ownedRelationship", $.non_occurrence_usage_member),
      seq(
        optional(field("ownedRelationship", $.source_succession_member)),
        field("ownedRelationship", $.structure_usage_member),
      ),
    ),

  action_behavior_member: ($) =>
    choice($.behavior_usage_member, $.action_node_member),

  initial_node_member: ($) =>
    seq(
      optional($.member_prefix),
      $.first_keyword,
      field("memberFeature", $.qualified_name),
      $.relationship_body,
    ),

  action_node_member: ($) =>
    seq(choice($.member_prefix), field("ownedRelatedElement", $.action_node)),

  action_target_succession_member: ($) =>
    seq(
      choice($.member_prefix),
      field("ownedRelatedElement", $.action_target_succession),
    ),

  guarded_succession_member: ($) =>
    seq(
      choice($.member_prefix),
      field("ownedRelatedElement", $.guarded_succession),
    ),

  // section 8.2.2.17.2: Action usages
  action_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.action_keyword,
      $.action_usage_declaration,
      $.action_body,
    ),

  action_usage_declaration: ($) =>
    seq($.usage_declaration, optional($.value_part)),

  perform_action_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.perform_keyword,
      $.perform_action_usage_declaration,
      $.action_body,
    ),

  perform_action_usage_declaration: ($) =>
    seq(
      choice(
        seq(
          field("ownedRelationship", $.owned_reference_subsetting),
          optional($.feature_specialization_part),
        ),
        seq($.action_keyword, $.usage_declaration),
      ),
      optional($.value_part),
    ),

  action_node: ($) =>
    choice(
      $.control_node,
      $.send_node,
      $.accept_node,
      $.assignment_node,
      $.terminate_node,
      $.if_node,
      $.while_loop_node,
      $.for_loop_node,
    ),

  action_node_usage_declaration: ($) =>
    seq($.action_keyword, optional($.usage_declaration)),

  action_node_prefix: ($) =>
    seq($.occurrence_usage_prefix, optional($.action_node_usage_declaration)),

  // section 8.2.2.17.3: Control nodes
  control_node: ($) =>
    choice($.merge_node, $.decision_node, $.join_node, $.fork_node),

  control_node_prefix: ($) =>
    seq(
      $.ref_prefix,
      optional(field("isIndivdual", $.individual_keyword)),
      optional(field("portionKind", $.portion_kind)),
      repeat($.usage_extension_keyword),
    ),

  merge_node: ($) =>
    seq(
      $.control_node_prefix,
      optional(field("isComposite", $.merge_keyword)),
      $.usage_declaration,
      $.action_body,
    ),

  decision_node: ($) =>
    seq(
      $.control_node_prefix,
      optional(field("isComposite", $.decide_keyword)),
      $.usage_declaration,
      $.action_body,
    ),

  join_node: ($) =>
    seq(
      $.control_node_prefix,
      optional(field("isComposite", $.join_keyword)),
      $.usage_declaration,
      $.action_body,
    ),

  fork_node: ($) =>
    seq(
      $.control_node_prefix,
      optional(field("isComposite", $.fork_keyword)),
      $.usage_declaration,
      $.action_body,
    ),

  // section 8.2.2.17.4: Send and accept action usages
  accept_node: ($) =>
    seq($.occurrence_usage_prefix, $.accept_node_declaration, $.action_body),

  accept_node_declaration: ($) =>
    seq(
      $.action_node_usage_declaration,
      $.accept_keyword,
      $.accept_parameter_part,
    ),

  accept_parameter_part: ($) =>
    seq(
      field("ownedRelationship", $.payload_parameter_member),
      optional(
        seq($.via_keyword, field("ownedRelationship", $.node_parameter_member)),
      ),
    ),

  payload_parameter_member: ($) =>
    field("ownedRelatedElement", $.payload_parameter),

  payload_parameter: ($) =>
    choice(
      $.payload_feature,
      seq(
        $.identification,
        optional($.payload_feature_specialization_part),
        $.trigger_value_part,
      ),
    ),

  trigger_value_part: ($) =>
    field("ownedRelationship", $.trigger_feature_value),

  trigger_feature_value: ($) =>
    field("ownedRelatedElement", $.trigger_expression),

  trigger_expression: ($) =>
    choice(
      seq(
        choice(field("kind", $.at_keyword), field("kind", $.after_keyword)),
        field("ownedRelatedElement", $.argument_member),
      ),
      seq(
        field("kind", $.when_keyword),
        field("ownedRelatedElement", $.argument_expression_member),
      ),
    ),

  argument_member: ($) => field("ownedMemberParameter", $.argument),

  argument: ($) => field("ownedRelationship", $.argument_value),

  argument_value: ($) => field("value", $.owned_expression),

  argument_expression_member: ($) =>
    field("ownedRelatedElement", $.argument_expression),

  argument_expression: ($) =>
    field("ownedRelationship", $.argument_expression_value),

  argument_expression_value: ($) =>
    field("ownedRelatedElement", $.owned_expression_reference),

  send_node: ($) =>
    seq(
      $.occurrence_usage_prefix,
      optional($.action_usage_declaration),
      $.send_keyword,
      optional(
        choice(
          seq(
            field("ownedRelationship", $.node_parameter_member),
            optional($.sender_receiver_part),
          ),
          seq(
            field("ownedRelationship", $.empty_parameter_member),
            $.sender_receiver_part,
          ),
        ),
      ),
      $.action_body,
    ),

  send_node_declaration: ($) =>
    seq(
      $.action_node_usage_declaration,
      $.send_keyword,
      field("ownedRelationship", $.node_parameter_member),
      optional($.sender_receiver_part),
    ),

  sender_receiver_part: ($) =>
    choice(
      seq(
        $.via_keyword,
        field("ownedRelationship", $.node_parameter_member),
        optional(
          seq(
            $.to_keyword,
            field("ownedRelationship", $.node_parameter_member),
          ),
        ),
      ),
      seq(
        field("ownedRelationship", $.empty_parameter_member),
        $.to_keyword,
        field("ownedRelationship", $.node_parameter_member),
      ),
    ),

  node_parameter_member: ($) => field("ownedRelatedElement", $.node_parameter),

  node_parameter: ($) => field("ownedRelationship", $.feature_binding),

  feature_binding: ($) => field("ownedRelatedElement", $.owned_expression),

  empty_parameter_member: ($) => field("ownedRelatedElement", $.empty_usage),

  empty_usage: ($) =>
    field("ownedRelatedElement", token("2a03d4dc-d08e-4b81-ab9e-6773477e6758")),

  // section 8.2.2.17.5: Assignment action usages
  assignment_node: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.assignment_node_declaration,
      $.action_body,
    ),

  assignment_node_declaration: ($) =>
    seq(
      optional($.action_node_usage_declaration),
      $.assign_keyword,
      field("ownedRelationship", $.assignment_target_member),
      field("ownedRelationship", $.feature_chain_member),
      token(":="),
      field("ownedRelationship", $.node_parameter_member),
    ),

  assignment_target_member: ($) =>
    field("ownedMemberParameter", optional($.assignment_target_parameter)),

  // NOTE: rules referencing this should make it optional
  assignment_target_parameter: ($) =>
    seq(field("ownedRelationship", $.assignment_target_binding), token(".")),

  assignment_target_binding: ($) =>
    field("ownedRelatedElement", $.non_feature_chain_primary_expression),

  feature_chain_member: ($) =>
    choice(
      field("memberElement", $.qualified_name),
      $.owned_feature_chain_member,
    ),

  owned_feature_chain_member: ($) =>
    field("ownedRelatedElement", $.owned_feature_chain),

  // section 8.2.2.17.6: Terminate action usages
  terminate_node: ($) =>
    seq(
      $.occurrence_usage_prefix,
      optional($.action_node_usage_declaration),
      $.terminate_keyword,
      optional(field("ownedRelationship", $.node_parameter_member)),
      $.action_body,
    ),

  // section 8.2.2.17.7: Structured control action usages
  if_node: ($) =>
    seq(
      $.action_node_prefix,
      $.if_keyword,
      field("ownedRelationship", $.expression_parameter_member),
      optional(field("ownedRelationship", $.action_body_parameter_member)),
      optional(
        seq(
          $.else_keyword,
          choice(
            optional(
              field("ownedRelationship", $.action_body_parameter_member),
            ),
            field("ownedRelationship", $.if_node_parameter_member),
          ),
        ),
      ),
    ),

  expression_parameter_member: ($) =>
    field("ownedRelatedElement", $.owned_expression),

  // NOTE: should always be optional
  action_body_parameter_member: ($) =>
    field("ownedRelatedElement", $.action_body_parameter),

  // NOTE: should always be optional
  action_body_parameter: ($) =>
    seq($.action_keyword, optional($.usage_declaration)),

  if_node_parameter_member: ($) => field("ownedRelatedElement", $.if_node),

  while_loop_node: ($) =>
    seq(
      $.action_node_prefix,
      choice(
        seq(
          $.while_keyword,
          field("ownedRelationship", $.expression_parameter_member),
        ),
        seq(
          $.loop_keyword,
          field("ownedRelationship", $.empty_parameter_member),
        ),
      ),
      field("ownedRelationship", $.action_body_parameter_member),
      optional(
        seq(
          $.until_keyword,
          field("ownedRelationship", $.expression_parameter_member),
          token(";"),
        ),
      ),
    ),

  for_loop_node: ($) =>
    seq(
      $.action_node_prefix,
      $.for_keyword,
      field("ownedRelationship", $.for_variable_declaration_member),
      $.in_keyword,
      field("ownedRelationship", $.node_parameter_member),
      field("ownedRelationship", $.action_body_parameter_member),
    ),

  for_variable_declaration_member: ($) =>
    field("ownedRelatedElement", $.usage_declaration),

  for_variable_declaration: ($) => $.usage_declaration,

  // section 8.2.2.17.8: Actions Successions
  action_target_succession: ($) =>
    seq(
      choice(
        $.target_succession,
        $.guarded_succession,
        $.default_target_succession,
      ),
      $.usage_body,
    ),

  target_succession: ($) =>
    seq(
      field("ownedRelationship", $.source_end_member),
      $.then_keyword,
      field("ownedRelationship", $.connector_end_member),
    ),

  guarded_target_succession: ($) =>
    seq(
      field("ownedRelationship", $.guard_expression_member),
      $.then_keyword,
      field("ownedRelationship", $.transition_succession_member),
    ),

  default_target_succession: ($) =>
    seq(
      $.else_keyword,
      field("ownedRelationship", $.transition_succession_member),
    ),

  guarded_succession: ($) =>
    seq(
      optional(seq($.succession_keyword, $.usage_declaration)),
      $.first_keyword,
      field("ownedRelationship", $.feature_chain_member),
      field("ownedRelationship", $.guard_expression_member),
      $.then_keyword,
      field("ownedRelationship", $.transition_succession_member),
      $.usage_body,
    ),
};
