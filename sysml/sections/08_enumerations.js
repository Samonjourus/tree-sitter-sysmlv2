module.exports = {
  enumeration_definition: ($) =>
    seq(
      repeat($.definition_extension_keyword),
      $.enum_keyword,
      $.def_keyword,
      $.definition_declaration,
      $.enumeration_body,
    ),

  enumeration_body: ($) =>
    choice(
      token(";"),
      seq(
        token("{"),
        repeat(
          choice(
            field("ownedRelationship", $.enumeration_usage_member),
            field("ownedRelationship", $.annotating_member),
          ),
        ),
        token("}"),
      ),
    ),

  enumeration_usage_member: ($) =>
    seq(
      optional($.member_prefix),
      field("ownedRelatedElement", $.enumerated_value),
    ),

  enumerated_value: ($) => seq(optional($.enum_keyword), $.usage),

  enumeration_usage: ($) => seq($.usage_prefix, $.enum_keyword, $.usage),
};
