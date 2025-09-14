module.exports = {
  attribute_definition: ($) =>
    seq(
      optional($.definition_prefix),
      $.attribute_keyword,
      $.def_keyword,
      $.definition,
    ),

  attribute_usage: ($) => seq($.usage_prefix, $.attribute_keyword, $.usage),
};
