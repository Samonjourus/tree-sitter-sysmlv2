module.exports = {
  // names ---
  // There are two types of names. Basic names are traditional identifiers.
  // unrestricted_names are single quoted strings that can contain any
  // character (not really but kinda...).
  name: ($) => choice($.basic_name, $.unrestricted_name),

  basic_name: ($) =>
    seq($.basic_initial_character, repeat($.basic_name_character)),

  unrestricted_name: ($) =>
    seq("'", repeat(choice($.name_character, $.escape_sequence)), "'"),

  basic_initial_character: ($) => choice($.alphabetic_character, "_"),

  basic_name_character: ($) =>
    choice($.basic_initial_character, $.decimal_digit),

  decimal_digit: (_) => /[0-9]/,

  alphabetic_character: (_) => /[A-Za-z]/,

  name_character: (_) => /[^\p{C}\\']/u,

  escape_sequence: (_) =>
    choice("\\\\", "\\n", "\\t", "\\'", '\\"', "\\b", "\\f"),


  name_and_or_short_name: ($) =>
    choice(seq($.short_name, $.name), $.name, $.short_name),

  // other (temp name)
  // NOTE: probably should split this into components
  locale_code: ($) => seq('"', /[A-Za-z0-9_@]*/, '"'),

  language_name: ($) => seq('"', /[A-Za-z0-9_@]*/, '"'),
};
