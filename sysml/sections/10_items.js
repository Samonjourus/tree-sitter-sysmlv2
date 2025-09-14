module.exports = {
  // section 8.2.2.10: Items textual notation
  item_definition: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.item_keyword,
      $.def_keyword,
      $.definition,
    ),

  item_usage: ($) => seq($.occurrence_usage_prefix, $.item_keyword, $.usage),
};
