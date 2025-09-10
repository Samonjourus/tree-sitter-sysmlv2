module.exports = {
  // comments ---
  single_line_note: ($) => seq("//", /[^\r\n]*/),

  multiline_note: ($) => seq("//*", /(?:.|\r|\n)*?(?=\*\/)/, "*/"),

  regular_comment: ($) =>
    token(
      seq(
        "/*",
        /[^*]*\*+([^/*][^*]*\*+)*/, // any run of chars that isn't the closing */
        "/",
      ),
    ),

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

  // section 8.2.3.4 - Namespaces concrete syntax
  // section 8.2.3.4.1 - Namespaces

  namespace_body_element: ($) =>
    choice(
      field("ownedRelationship", $.namespace_member),
      field("ownedRelationship", $.alias_member),
      field("ownedRelationship", $.import),
    ),

  namespace_member: ($) =>
    choice($.non_feature_member, $.namespace_feature_member),

  namespace_feature_member: ($) =>
    seq($.member_prefix, field("ownedRelatedElement", $.feature_element)),

  qualified_name: ($) =>
    prec.right(
      2,
      seq(
        optional(seq(token("$"), $.scope)),
        $.name,
        repeat(seq($.scope, $.name)),
      ),
    ),

  qualified_path: ($) =>
    prec.right(
      2,
      seq(
        optional(seq(token("$"), $.scope)),
        $.name,
        repeat(seq($.scope, $.name)),
        optional(seq($.scope, field("isNamespace", $.wildcard))),
        optional(seq($.scope, field("isRecursive", $.recurse))),
      ),
    ),

  // other (temp name)
  // NOTE: probably should split this into components
  locale_code: ($) => seq('"', /[A-Za-z0-9_@]*/, '"'),

  language_name: ($) => seq('"', /[A-Za-z0-9_@]*/, '"'),

  non_feature_member: ($) =>
    seq($.member_prefix, field("ownedRelatedElement", $.member_element)),

  //#region section 8.2.3.4.3 namespace elements
  member_element: ($) => choice($.annotating_element, $.non_feature_element),

  non_feature_element: ($) =>
    choice(
      $.dependency,
      $.namespace,
      $.type,
      $.classifier,
      $.dataType,
      $.class,
      $.structure,
      $.metaclass,
      $.association,
      $.associationStructure,
      $.interaction,
      $.behavior,
      $.function,
      $.predicate,
      $.multiplicity,
      $.package,
      $.libraryPackage,
      $.specialization,
      $.conjugation,
      $.subclassification,
      $.disjoining,
      $.featureInverting,
      $.featureTyping,
      $.subsetting,
      $.redefinition,
      $.typeFeaturing,
    ),

  feature_element: ($) =>
    choice(
      $.feature,
      $.step,
      $.expression,
      $.booleanExpression,
      $.invariant,
      $.connector,
      $.bindingConnector,
      $.succession,
      $.flow,
      $.SuccessionFlow,
    ),

  // section 8.2.4.1 - types concrete syntax
  // section 8.2.4.1.1 - types
  conjugation_part: ($) =>
    seq(
      $.conjugates_keyword,
      field("ownedRelationship", $.owned_specialization),
    ),

  differencing_part: ($) =>
    seq(
      $.differences_keyword,
      field("ownedRelationship", $.differencing),
      repeat(seq(",", field("ownedRelationship", $.differencing))),
    ),

  disjoining_part: ($) =>
    seq(
      $.disjoint_keyword,
      $.from_keyword,
      field("ownedRelationship", $.owned_disjoining),
      repeat(seq(",", field("ownedRelationship", $.owned_specialization))),
    ),

  intersecting_part: ($) =>
    seq(
      $.intersects_keyword,
      field("ownedRelationship", $.intersecting),
      repeat(seq(",", field("ownedRelationship", $.intersecting))),
    ),

  specialization_part: ($) =>
    seq(
      $.specialization_keyword,
      field("ownedRelationship", $.owned_specialization),
      repeat(seq(",", field("ownedRelationship", $.owned_specialization))),
    ),

  type_body: ($) => choice(";", seq("{", repeat($.type_body_element), "}")),

  type_body_element: ($) =>
    choice(
      field("ownedRelationship", $.non_feature_member),
      field("ownedRelationship", $.feature_member),
      field("ownedRelationship", $.alias_member),
      field("ownedRelationship", $.import),
    ),

  type_declaration: ($) =>
    seq(
      optional(field("isSufficient", $.all_keyword)),
      optional($.identification),
      repeat1(choice($.specialization_part, $.conjugation_part)),
      repeat($.type_relationship_part),
    ),

  // revised due to original definition matching empty string.
  // references must assume optional.
  type_prefix: ($) =>
    choice(
      repeat1(field("ownedRelationship", $.prefix_metadata_member)),
      field("isAbstract", $.abstract_keyword),
      seq(
        field("isAbstract", $.abstract_keyword),
        repeat1(field("ownedRelationship", $.prefix_metadata_member)),
      ),
    ),

  type_relationship_part: ($) =>
    choice(
      $.disjoining_part,
      $.unioning_part,
      $.intersecting_part,
      $.differencing_part,
    ),

  unioning_part: ($) =>
    seq(
      $.unions_keyword,
      field("ownedRelationship", $.unioning),
      repeat(seq(",", field("ownedRelationship", $.unioning))),
    ),

  // section 8.2.4.1.2 - specialization
  specialization: ($) =>
    seq(
      optional(seq($.specialization_keyword, optional($.identification))),
      $.subtype_keyword,
      $.specific_type,
      $.specialization_keyword,
      $.general_type,
      $.relationship_body,
    ),

  owned_specialization: ($) => $.general_type,

  specific_type: ($) =>
    choice(
      field("specific", $.qualified_name),
      field("specific", $.owned_feature_chain),
    ),

  general_type: ($) =>
    choice(
      field("general", $.qualified_name),
      field("general", $.owned_feature_chain),
    ),

  // #region section 8.2.4.1.4 - disjoining
  disjoining: ($) =>
    seq(
      optional(seq($.disjoining_keyword, $.identification)),
      $.disjoint_keyword,
      choice(
        field("typeDisjoined", $.qualified_name),
        field("typeDisjoined", $.feature_chain),
      ),
      $.from_keyword,
      choice(
        field("disjoiningType", $.qualified_name),
        field("disjoiningType", $.feature_chain),
      ),
      $.relationship_body,
    ),

  owned_disjoining: ($) =>
    choice(
      field("disjoiningType", $.qualified_name),
      field("disjoiningType", $.feature_chain),
    ),

  // #region section 8.2.4.1.5 - unioning, intersecting, and differencing
  unioning: ($) =>
    choice(
      field("unioningType", $.qualified_name),
      field("ownedRelatedElement", $.owned_feature_chain),
    ),

  intersecting: ($) =>
    choice(
      field("intersectingType", $.qualified_name),
      field("ownedRelatedElement", $.owned_feature_chain),
    ),

  differencing: ($) =>
    choice(
      field("differencingType", $.qualified_name),
      field("ownedRelatedElement", $.owned_feature_chain),
    ),

  // #region section 8.2.4.1.6 - feature membership
  feature_member: ($) => choice($.type_feature_member, $.owned_feature_member),

  type_feature_member: ($) =>
    seq(
      $.member_prefix,
      $.member_keyword,
      field("ownedRelatedElement", $.feature_element),
    ),

  owned_feature_member: ($) =>
    seq($.member_prefix, field("ownedRelatedElement", $.feature_element)),

  // section 8.2.4.2 - classifiers concrete syntax
  // section 8.2.4.2.1 - classifiers
  classifier: ($) =>
    seq(
      optional($.type_prefix),
      $.classifier_keyword,
      $.classifier_declaration,
      $.type_body,
    ),

  classifier_declaration: ($) =>
    seq(
      optional(field("isSufficient", $.all_keyword)),
      $.identification,
      optional(field("ownedRelationship", $.classifier_declaration)),
      optional(choice($.superclassing_part, $.conjugation_part)),
      repeat($.type_relationship_part),
    ),

  superclassing_part: ($) =>
    seq(
      $.specializes_keyword,
      field("ownedRelationship", $.owned_subclassification),
      repeat(seq(",", field("ownedRelationship", $.owned_subclassification))),
    ),

  // section 8.2.4.2.1 - classifiers
  owned_subclassification: ($) => field("superclassifier", $.qualified_name),

  // section 8.2.4.3.2 - feature typing
  feature_typing: ($) =>
    seq(
      optional(seq($.specialization_keyword, optional($.identification))),
      $.typing_keyword,
      field("typedFeature", $.qualified_name),
      $.typed_by,
      $.general_type,
      $.relationship_body,
    ),

  owned_feature_typing: ($) => $.general_type,

  // section 8.2.5.7.1 - Functions
  function: ($) =>
    seq(
      optional($.type_prefix),
      $.function_keyword,
      $.classifier_declaration,
      $.function_body,
    ),

  function_body: ($) => choice(";", seq("{", $.function_body_part, "}")),

  // revised due to original definition matching empty string.
  // references must assume optional.
  function_body_part: ($) =>
    choice(
      repeat1(
        choice(
          $.type_body_element,
          field("ownedRelationship", $.return_feature_member),
        ),
      ),
      field("ownedRelationship", $.result_expression_member),
      seq(
        repeat1(
          choice(
            $.type_body_element,
            field("ownedRelationship", $.return_feature_member),
          ),
        ),
        field("ownedRelationship", $.result_expression_member),
      ),
    ),

  return_feature_member: ($) =>
    seq(
      $.member_prefix,
      $.return_keyword,
      field("ownedRelatedElement", $.owned_expression),
    ),

  result_expression_member: ($) =>
    seq($.member_prefix, field("ownedRelatedElement", $.owned_expression)),

  // section 8.2.5.8: expressions
  // section 8.2.5.8.1: operator expressions
  argument: ($) => field("ownedRelationship", $.argument_value),

  argument_expression: ($) =>
    field("ownedRelationship", $.argument_expression_value),

  argument_expression_member: ($) =>
    field("ownedRelatedElement", $.argument_expression),

  argument_expression_value: ($) =>
    field("value", $.owned_expression_reference),

  argument_member: ($) => field("ownedMemberParameter", $.argument),

  argument_value: ($) => field("value", $.owned_expression),

  binary_operator: ($) =>
    choice(
      "|",
      "&",
      $.xor_keyword,
      "..",
      "==",
      "!=",
      "===",
      "!==",
      "<",
      ">",
      "<==",
      ">==",
      "+",
      "-",
      "*",
      "/",
      "%",
      "^",
      "**",
    ),

  cast_operator: ($) => $.as_keyword,

  classification_test_operator: ($) =>
    choice($.istype_keyword, $.hastype_keyword, "@"),

  conditional_binary_operator: ($) =>
    choice("??", $.or_keyword, $.and_keyword, $.implies_keyword),

  empty_feature: (_) => seq("{", "}"),

  empty_result_member: ($) => field("ownedRelatedElement", $.empty_feature),

  metadata_argument_member: ($) =>
    field("ownedRelatedElement", $.metadata_argument),

  metadata_argument: ($) => field("ownedRelationship", $.metadata_value),

  metadata_reference: ($) =>
    field("ownedRelationship", $.element_reference_member),

  metadata_value: ($) => field("value", $.metadata_reference),

  owned_expression_reference: ($) =>
    field("ownedRelationship", $.owned_expression_member),

  owned_expression_member: ($) =>
    field("ownedFeatureMember", $.owned_expression),

  type_reference: ($) => field("ownedRelationship", $.reference_typing),

  type_reference_member: ($) => field("ownedMemberFeature", $.type_reference),

  type_result_member: ($) => field("ownedMemberFeature", $.type_reference),

  reference_typing: ($) => field("type", $.qualified_name),

  unary_operator: ($) => choice("-", "+", "~", $.not_keyword),

  //#region section 8.2.5.8.2: primary expressions
  body_argument: ($) => field("ownedRelationship", $.body_argument_value),

  body_argument_member: ($) => field("ownedMemberParameter", $.body_argument),

  body_argument_value: ($) => field("value", $.body_expression),

  feature_chain_member: ($) =>
    choice($.feature_reference_member, $.owned_feature_chain_member),

  feature_reference_member: ($) => field("memberElement", $.feature_reference),

  feature_reference: ($) => $.qualified_name,

  function_reference: ($) => field("ownedRelationship", $.reference_typing),

  function_reference_argument: ($) =>
    field("ownedRelationship", $.function_reference_argument_value),

  function_reference_argument_member: ($) =>
    field("ownedMemberParameter", $.function_reference_argument),

  function_reference_expression: ($) =>
    field("ownedRelationship", $.function_reference_member),

  function_reference_member: ($) =>
    field("ownedMemberFeature", $.function_reference),

  function_reference_argument_value: ($) =>
    field("value", $.function_reference_expression),

  non_feature_chain_primary_argument_member: ($) =>
    field("ownedMemberParameter", $.primary_argument),

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

  owned_feature_chain_member: ($) =>
    field("ownedMemberElement", $.feature_chain),

  primary_argument: ($) => field("ownedRelationship", $.primary_argument_value),

  primary_argument_value: ($) => field("value", $.primary_expression),

  primary_argument_member: ($) =>
    prec(1, field("ownedMemberParameter", $.primary_argument)),

  primary_expression: ($) =>
    choice($.feature_chain_expression, $.non_feature_chain_primary_expression),

  sequence_expression_list_member: ($) =>
    field("ownedMemberFeature", $.sequence_expression_list),

  sequence_expression_list: ($) =>
    prec(
      1,
      choice(seq($.owned_expression, ","), $.sequence_operator_expression),
    ),

  sequence_operator_expression: ($) =>
    seq(
      field("ownedRelationship", $.owned_expression_member),
      field("operator", ","),
      field("ownedRelationship", $.sequence_expression_list_member),
    ),

  //#region section 8.2.5.8.3: base expressions
  argument_list: ($) =>
    seq(
      "(",
      optional(choice($.positional_argument_list, $.named_argument_list)),
      ")",
    ),

  body_expression: ($) => field("ownedRelationship", $.expression_body_member),

  constructor_result_member: ($) =>
    field("ownedRelatedElement", $.constructor_result),

  constructor_result: ($) => $.argument_list,

  expression_body_member: ($) => field("ownedMemberFeature", $.expression_body),

  expression_body: ($) => seq("{", $.function_body_part, "}"),

  instantiated_type_member: ($) =>
    choice(
      field("memberElement", $.instantiated_type_reference),
      $.owned_feature_chain_member,
    ),

  instantiated_type_reference: ($) => $.qualified_name,

  named_argument_list: ($) =>
    seq(
      field("ownedRelationship", $.named_argument_member),
      repeat(seq(",", field("ownedRelationship", $.named_argument_member))),
    ),

  named_argument: ($) =>
    seq(
      field("ownedRelationship", $.parameter_redefinition),
      "=",
      field("ownedRelationship", $.argument_value),
    ),

  named_argument_member: ($) =>
    seq(field("ownedMemberFeature", $.named_argument)),

  parameter_redefinition: ($) => field("redefinedFeature", $.qualified_name),

  // WARN: what does e.x mean?
  positional_argument_list: ($) =>
    seq(
      field("ownedRelationship", $.argument_member),
      repeat(seq(",", field("ownedRelationship", $.argument_member))),
    ),

  //#region section 8.2.5.8.4: literal expression
  boolean_value: (_) => choice("true", "false"),

  literal_boolean: ($) => field("value", $.boolean_value),

  literal_infinity: (_) => "*",

  literal_integer: ($) => prec(1, field("value", $.decimal_value)),

  literal_real: ($) => field("value", $.real_value),

  literal_string: ($) => field("value", $.string_value),

  literal_expression: ($) =>
    choice(
      $.literal_boolean,
      $.literal_string,
      $.literal_integer,
      $.literal_real,
      $.literal_infinity,
    ),

  real_value: ($) =>
    choice(
      seq(
        optional($.decimal_value),
        ".",
        choice($.decimal_value, $.exponential_value),
      ),
      $.exponential_value,
    ),

  //#region section 8.2.5.8.1: operator expressions
  element_reference_member: ($) => field("memberElement", $.qualified_name),

  // section 8.2.5.12 - metadata concete syntax
  prefix_metadata_feature: ($) =>
    field("ownedRelationship", $.owned_feature_typing),

  prefix_metadata_member: ($) =>
    seq("#", field("ownedRelatedElement", $.prefix_metadata_feature)),
};
