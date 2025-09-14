module.exports = {
  // section 8.2.2.2: Elements and relationships textual notation
  identification: ($) =>
    choice(
      seq("<", field("declaredShortName", $.name), ">"),
      field("declaredName", $.name),
      seq(
        "<",
        field("declaredShortName", $.name),
        ">",
        field("declaredName", $.name),
      ),
    ),

  relationship_body: ($) =>
    choice(token(";"), seq("{", repeat($.owned_annotation), "}")),
};
