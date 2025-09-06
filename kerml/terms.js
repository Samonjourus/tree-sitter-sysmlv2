module.exports = {
  // names ---
  // There are two types of names. Basic names are traditional identifiers.
  // unrestricted_names are single quoted strings that can contain any
  // character (not really but kinda...).
  basic_name: (_) => /[A-Za-z_][A-Za-z0-9_]*/,
  unrestricted_name: (_) => /'([^'\\]|\\.)*'/,

  // names or short names will appear in Sysmlv2 text
  short_name: ($) => seq("<", choice($.basic_name, $.unrestricted_name), ">"),
  name: ($) => choice($.basic_name, $.unrestricted_name),
  qualified_name: ($) => seq($.name, repeat(seq("::", $.name))),

  qualified_name_sequence: ($) =>
    seq($.qualified_name, repeat(seq(", ", $.qualified_name))),

  name_and_or_short_name: ($) =>
    choice(seq($.short_name, $.name), $.name, $.short_name),

  // other (temp name)
  // NOTE: probably should split this into components
  locale_code: ($) => seq('"', /[A-Za-z0-9_@]*/, '"'),

  language_name: ($) => seq('"', /[A-Za-z0-9_@]*/, '"'),
};
