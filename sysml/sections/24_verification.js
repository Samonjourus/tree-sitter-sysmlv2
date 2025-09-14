// section 8.2.2.24: Verification textual notation
module.exports = {
  verification_case_definition: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.verification_keyword,
      $.def_keyword,
      $.definition_declaration,
      $.case_body,
    ),

  verification_case_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.verification_keyword,
      $.constraint_usage_declaration,
      $.case_body,
    ),

  requirement_verification_member: ($) =>
    seq(
      $.member_prefix,
      $.verify_keyword,
      field("ownedRelatedElement", $.requirement_verification_usage),
    ),

  requirement_verification_usage: ($) =>
    choice(
      seq(
        field("ownedRelationship", $.owned_reference_subsetting),
        repeat($.feature_specialization_part),
        $.requirement_body,
      ),
      seq(
        choice(
          seq(repeat($.usage_extension_keyword), $.requirement_keyword),
          repeat1($.usage_extension_keyword),
        ),
        $.constraint_usage_declaration,
        $.requirement_body,
      ),
    ),
};
