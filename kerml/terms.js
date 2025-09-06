module.exports = {
  // comments ---
  single_line_note: ($) => seq("//", /[^\r\n]*/),

  multiline_note: ($) => seq("//*", /(?:.|\r|\n)*?(?=\*\/)/, "*/"),

  regular_comment: ($) => seq("/*", /(?:.|\r|\n)*?(?=\*\/)/, "*/"),

  comment_content: (_) => token(/(?:.|\r|\n)*?(?=\*\/)/),

  // names ---
  // There are two types of names. Basic names are traditional identifiers.
  // unrestricted_names are single quoted strings that can contain any
  // character (not really but kinda...).
  name: ($) => choice($.basic_name, $.unrestricted_name),

  basic_name: ($) => /[A-Za-z_][A-Za-z0-9_]*/,

  // WARN: I don't think this allowed escaped '
  unrestricted_name: ($) => token(/'(?:[^'\\]|\\[\\nyt"'bf])*'/),

  // Literals
  decimal_value: ($) => /[0-9]+/,

  exponential_value: ($) => /[0-9]+[eE][+-]?[0-9]+/,

  // WARN: I don't think this allowed escaped "
  string_value: ($) => token(/"(?:[^"\\]|\\[\\nyt"'bf])*"/),

  string_character: (_) => /[^\p{C}\\"]/u,

  // shortcut for "typed by"
  typed_by: ($) => choice(seq($.typed_keyword, $.by_keyword), token(":")),

  // section 8.2.3.4 - Namespaces
  // NOTE: Incomplete

  qualified_name: ($) =>
    seq(
      optional(choice(token("$"), token("::"))),
      repeat(seq($.name, token("::"))),
      $.name,
    ),

  // other (temp name)
  // NOTE: probably should split this into components
  locale_code: ($) => seq('"', /[A-Za-z0-9_@]*/, '"'),

  language_name: ($) => seq('"', /[A-Za-z0-9_@]*/, '"'),
};
