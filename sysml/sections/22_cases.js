// section 8.2.2.22: Cases textual notation
module.exports = {
  case_definition: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.case_keyword,
      $.def_keyword,
      $.definition_declaration,
      $.case_body,
    ),

  case_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.case_keyword,
      $.constraint_usage_declaration,
      $.case_body,
    ),

  case_body: ($) =>
    choice(
      token(";"),
      seq(
        token("{"),
        repeat($.case_body_item),
        optional(field("ownedRelationship", $.result_expression_member)),
        token("}"),
      ),
    ),

  case_body_item: ($) =>
    choice(
      $.action_body_item,
      $.subject_member,
      $.actor_member,
      $.objective_member,
    ),

  objective_member: ($) =>
    seq(
      $.member_prefix,
      $.objective_keyword,
      field("ownedRelatedElement", $.objective_requirement_usage),
    ),

  objective_requirement_usage: ($) =>
    seq(
      repeat($.usage_extension_keyword),
      $.constraint_usage_declaration,
      $.requirement_body,
    ),
};
