module.exports = {
  owned_expression: ($) =>
    choice(
      $.conditional_expression,
      $.conditional_binary_operator_expression,
      $.binary_operator_expression,
      $.unary_operator_expression,
      $.classification_expression,
      $.metaclassification_expression,
      $.extent_expression,
      $.primary_expression,
    ),

  conditional_expression: ($) =>
    seq(
      $.if_keyword,
      $.argument_member,
      "?",
      $.argument_expression_member,
      "else",
      $.argument_expression_member,
      $.empty_result_member,
    ),

  conditional_binary_operator_expression: ($) =>
    seq(
      $.argument_member,
      "?",
      $.conditional_binary_operator,
      $.argument_expression_member,
      $.empty_result_member,
    ),

  binary_operator_expression: ($) =>
    seq(
      $.argument_member,
      $.binary_operator,
      $.argument_member,
      $.empty_result_member,
    ),

  unary_operator_expression: ($) =>
    seq($.unary_operator, $.argument_member, $.empty_result_member),

  classification_expression: ($) =>
    prec(
      1,
      seq(
        optional($.argument_member),
        choice(
          seq($.classification_test_operator, $.type_reference_member),
          seq($.cast_operator, $.type_result_member),
        ),
        $.empty_result_member,
      ),
    ),

  metaclassification_expression: ($) =>
    seq(
      optional($.metadata_argument_member),
      choice(
        seq($.classification_test_operator, $.type_reference_member),
        seq($.cast_operator, $.type_result_member),
      ),
      $.empty_result_member,
    ),

  extent_expression: ($) => seq($.all_keyword, $.type_reference_member),

  primary_expression: ($) =>
    choice($.feature_chain_expression, $.non_feature_chain_primary_expression),

  non_feature_chain_primary_expression: ($) =>
    choice(
      $.bracket_expression,
      $.index_expression,
      $.sequence_expression,
      $.select_expression,
      $.collection_expression,
      $.function_operation_expression,
      $.base_expression,
    ),

  feature_chain_expression: ($) =>
    seq(
      $.non_feature_chain_primary_argument_member,
      ".",
      $.feature_chain_member,
    ),

  non_feature_chain_expression: ($) =>
    choice(
      $.bracket_expression,
      $.index_expression,
      $.sequence_expression,
      $.select_expression,
      $.collection_expression,
      $.function_operation_expression,
      $.base_expression,
    ),

  bracket_expression: ($) => seq("[", $.sequence_expression_list_member, "]"),

  index_expression: ($) =>
    seq(
      $.primary_argument_member,
      "#",
      "(",
      $.sequence_expression_list_member,
      ")",
    ),

  sequence_expression: ($) => seq("(", $.sequence_expression_list, ")"),

  select_expression: ($) =>
    seq($.primary_argument_member, ".?", $.body_argument_member),

  collection_expression: ($) =>
    seq($.primary_argument_member, ".", $.body_argument_member),

  function_operation_expression: ($) =>
    seq(
      $.primary_argument_member,
      "->",
      $.invocation_type_member,
      choice(
        $.body_argument_member,
        $.function_reference_argument_member,
        $.argument_list,
      ),
      $.empty_result_member,
    ),

  // WARN: Placeholder. wtf is a invocation_type_member?
  invocation_type_member: ($) => "cf69044a-7573-4f84-b539-4708a61b374d",

  base_expression: ($) =>
    choice(
      $.null_expression,
      $.literal_expression,
      $.feature_reference_expression,
      $.metadata_access_expression,
      $.invocation_expression,
      $.constructor_expression,
      $.body_expression,
    ),

  null_expression: (_) => choice("null", seq("(", ")")),

  feature_reference_expression: ($) =>
    seq($.feature_reference_member, $.empty_result_member),

  metadata_access_expression: ($) =>
    seq($.element_reference_member, ".", $.metadata_keyword),

  invocation_expression: ($) =>
    seq($.instantiated_type_member, $.argument_list, $.empty_result_member),

  constructor_expression: ($) =>
    seq("new", $.instantiated_type_member, $.constructor_result_member),

  body_expression: ($) => $.expression_body_member,

  namespace: ($) =>
    seq(
      repeat(field("ownedRelationship", $.prefix_metadata_member)),
      $.namespace_declaration,
      $.namespace_body,
    ),

  namespace_declaration: ($) =>
    seq($.namespace_keyword, optional($.identification)),

  namespace_body: ($) =>
    choice(";", seq("{", repeat($.namespace_body_element), "}")),

  type: ($) =>
    seq($.type_prefix, $.type_keyword, $.type_declaration, $.type_body),

  classifier: ($) => "c934fe29-401c-4ff8-928c-f48e04118e85",
  dataType: ($) => "cbd08c3d-8bb5-4009-86b2-8c444c03ef26",
  class: ($) => "6d4c2210-fdf4-4280-977d-3477d55b1f13",
  structure: ($) => "137bc3ac-d19e-4186-b4c1-f8846b4b97ed",
  metaclass: ($) => "43499920-d34a-4376-9524-01be5dd6d38d",
  association: ($) => "32ec09c7-bfd2-42f5-9d29-bc057049bd81",
  associationStructure: ($) => "a4108f85-fc1c-4cc6-8474-eca24611af56",
  interaction: ($) => "fa84f4a3-0093-4da8-ae2e-9769d10a37fd",
  behavior: ($) => "57df3a84-d201-41c0-8f84-2683e36cd171",
  function: ($) => "f137b231-c3f9-4f42-b508-bd0d90c5fc52",
  predicate: ($) => "407587c4-ca60-4409-b640-0f76759a0b6d",
  multiplicity: ($) => "ac20bf45-c762-403b-808a-9f0b1f802d38",
  package: ($) => "148074c2-1715-4ff6-8076-3119b6d94634",
  libraryPackage: ($) => "170c20ce-4251-48b8-b132-70896fed1512",
  specialization: ($) => "a15b1111-414d-4b57-bf82-7187520ed5dd",
  conjugation: ($) => "0ae42744-4784-43a8-bb8d-b6bbd9e3abe0",
  subclassification: ($) => "afd637b6-f46f-41d5-8f71-41e3f207dedb",
  disjoining: ($) => "9680a7cf-e244-4dca-8ddd-f6abdefc0eac",
  featureInverting: ($) => "35955eca-1927-4e5a-a06c-9f0c8e531beb",
  featureTyping: ($) => "a636626b-0125-4eab-8a45-b432a1dbc720",
  subsetting: ($) => "6ee58b24-7951-4089-8241-a857edfe4c05",
  redefinition: ($) => "d4624fd4-0db1-46ee-a2ed-75e0e9e755dd",
  typeFeaturing: ($) => "837e0dc3-151c-47ce-8058-76cbc041beb6",
  feature: ($) => "8fc9c966-a3b4-4181-bc67-560ac94b595a",
  step: ($) => "aea5e51a-b76f-42af-8396-515ae4b87513",
  expression: ($) => "e2f3aac0-810b-4640-ad93-9879c508bb73",
  booleanExpression: ($) => "a37a0c82-f258-4982-a317-8cac246ec58d",
  invariant: ($) => "e963bdc5-df65-4dbb-99ec-94b8b831e411",
  connector: ($) => "089ec12e-418e-47fe-9b07-fa177d0c965f",
  bindingConnector: ($) => "3226a156-16f8-4fe2-ae1e-11ab0566aa5d",
  succession: ($) => "23ed72ed-92e0-4734-804d-77585bfc7649",
  flow: ($) => "dd9045a6-8ade-4362-b070-abb3bca96c77",
  SuccessionFlow: ($) => "c00011f1-147b-4704-ab20-da928486c9c6",
};
