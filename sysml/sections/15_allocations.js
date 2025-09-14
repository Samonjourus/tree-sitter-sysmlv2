// section 8.2.2.15: Allocations textual notation
module.exports = {
  allocation_definition: ($) =>
    seq(
      $.occurrence_definition_prefix,
      $.allocation_keyword,
      $.def_keyword,
      $.definition,
    ),

  allocation_usage: ($) =>
    seq(
      $.occurrence_usage_prefix,
      $.allocation_usage_declaration,
      $.usage_body,
    ),

  allocation_usage_declaration: ($) =>
    choice(
      seq(
        $.allocation_keyword,
        $.usage_declaration,
        optional(seq($.allocate_keyword, $.connector_part)),
      ),
      seq($.allocate_keyword, $.connector_part),
    ),
};
