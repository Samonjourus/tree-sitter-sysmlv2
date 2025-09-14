// section 8.2.2.11: Parts textual notation
module.exports = {
  part_definition: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.part_keyword,
      $.def_keyword,
      $.definition,
    ),

  part_usage: ($) => seq($.occurrence_usage_prefix, $.part_keyword, $.usage),
};
