// section 8.2.2.27: Metadata textual notation
module.exports = {
  metadata_definition: ($) =>
    seq(
      optional(field("isAbstract", $.abstract_keyword)),
      repeat($.definition_extension_keyword),
      $.metadata_keyword,
      $.def_keyword,
      $.definition,
    ),

  prefix_metadata_annotation: ($) => seq("#", $.prefix_metadata_usage),

  prefix_metadata_member: ($) => prec(1, seq("#", $.prefix_metadata_usage)),

  prefix_metadata_usage: ($) => $.owned_feature_typing,

  metadata_usage: ($) =>
    seq(
      repeat($.usage_extension_keyword),
      choice(token("@"), $.metadata_keyword),
      optional(
        seq(
          $.about_keyword,
          field("ownedRelationship", $.annotation),
          repeat(seq(token(","), field("ownedRelationship", $.annotation))),
        ),
      ),
      $.metadata_body,
    ),

  metadata_usage_declaration: ($) =>
    seq(
      $.identification,
      choice(token(":"), seq($.typed_by)),
      field("ownedRelationship", $.owned_feature_typing),
    ),

  metadata_body: ($) =>
    choice(
      token(";"),
      seq(
        token("{"),
        repeat(
          choice(
            $.definition_member,
            $.metadata_body_usage_member,
            $.alias_member,
            $.import,
          ),
        ),
        token("}"),
      ),
    ),

  metadata_body_usage_member: ($) =>
    field("ownedMemberFeature", $.metadata_body_usage),

  metadata_body_usage: ($) =>
    seq(
      optional($.ref_keyword),
      optional(choice($.redefines_keyword)),
      field("ownedRelationship", $.owned_redefinition),
      optional($.feature_specialization_part),
      optional($.value_part),
      $.metadata_body,
    ),

  extended_definition: ($) =>
    seq(
      optional($.basic_definition_prefix),
      repeat1($.definition_extension_keyword),
      $.def_keyword,
      $.definition,
    ),

  extended_usage: ($) =>
    seq($.unextended_usage_prefix, repeat1($.unextended_usage_prefix), $.usage),
};
