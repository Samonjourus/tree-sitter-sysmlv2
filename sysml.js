/**
 * @file TreeSitter parser for Systems Modelling Language Version 2
 * @author Benjamin Standfield <benjaminstandfield@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = {
  source_file: ($) => repeat($.statement),

  // --- SysML ---

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

  // tokens
  // NOTE: probably should split this into components
  locale_code: ($) => seq('"', /[A-Za-z0-9_@]*/, '"'),

  language_name: ($) => seq('"', /[A-Za-z0-9_@]*/, '"'),

  // handy ---
  name_and_or_short_name: ($) =>
    choice(seq($.short_name, $.name), $.name, $.short_name),

  // keywords ---
  about_keyword: (_) => token("about"),
  abstract_keyword: (_) => token("abstract"),
  accept_keyword: (_) => token("accept"),
  action_keyword: (_) => token("action"),
  actor_keyword: (_) => token("actor"),
  after_keyword: (_) => token("after"),
  alias_keyword: (_) => token("alias"),
  all_keyword: (_) => token("all"),
  allocate_keyword: (_) => token("allocate"),
  allocation_keyword: (_) => token("allocation"),
  analysis_keyword: (_) => token("analysis"),
  and_keyword: (_) => token("and"),
  as_keyword: (_) => token("as"),
  assert_keyword: (_) => token("assert"),
  assign_keyword: (_) => token("assign"),
  assume_keyword: (_) => token("assume"),
  at_keyword: (_) => token("at"),
  attribute_keyword: (_) => token("attribute"),
  bind_keyword: (_) => token("bind"),
  binding_keyword: (_) => token("binding"),
  by_keyword: (_) => token("by"),
  calc_keyword: (_) => token("calc"),
  case_keyword: (_) => token("case"),
  comment_keyword: (_) => token("comment"),
  concern_keyword: (_) => token("concern"),
  connect_keyword: (_) => token("connect"),
  connection_keyword: (_) => token("connection"),
  constant_keyword: (_) => token("constant"),
  constraint_keyword: (_) => token("constraint"),
  crosses_keyword: (_) => choice(token("crosses"), token("=>")),
  decide_keyword: (_) => token("decide"),
  def_keyword: (_) => token("def"),
  default_keyword: (_) => token("default"),
  defined_keyword: (_) => token("defined"),
  dependency_keyword: (_) => token("dependency"),
  derived_keyword: (_) => token("derived"),
  do_keyword: (_) => token("do"),
  doc_keyword: (_) => token("doc"),
  else_keyword: (_) => token("else"),
  end_keyword: (_) => token("end"),
  entry_keyword: (_) => token("entry"),
  enum_keyword: (_) => token("enum"),
  event_keyword: (_) => token("event"),
  exhibit_keyword: (_) => token("exhibit"),
  exit_keyword: (_) => token("exit"),
  expose_keyword: (_) => token("expose"),
  false_keyword: (_) => token("false"),
  filter_keyword: (_) => token("filter"),
  first_keyword: (_) => token("first"),
  flow_keyword: (_) => token("flow"),
  for_keyword: (_) => token("for"),
  fork_keyword: (_) => token("fork"),
  frame_keyword: (_) => token("frame"),
  from_keyword: (_) => token("from"),
  hastype_keyword: (_) => token("hastype"),
  if_keyword: (_) => token("if"),
  implies_keyword: (_) => token("implies"),
  import_keyword: (_) => token("import"),
  in_keyword: (_) => token("in"),
  include_keyword: (_) => token("include"),
  individual_keyword: (_) => token("individual"),
  inout_keyword: (_) => token("inout"),
  interface_keyword: (_) => token("interface"),
  istype_keyword: (_) => token("istype"),
  item_keyword: (_) => token("item"),
  join_keyword: (_) => token("join"),
  language_keyword: (_) => token("language"),
  library_keyword: (_) => token("library"),
  locale_keyword: (_) => token("locale"),
  loop_keyword: (_) => token("loop"),
  merge_keyword: (_) => token("merge"),
  message_keyword: (_) => token("message"),
  meta_keyword: (_) => token("meta"),
  metadata_keyword: (_) => token("metadata"),
  nonunique_keyword: (_) => token("nonunique"),
  not_keyword: (_) => token("not"),
  null_keyword: (_) => token("null"),
  objective_keyword: (_) => token("objective"),
  occurrence_keyword: (_) => token("occurrence"),
  of_keyword: (_) => token("of"),
  or_keyword: (_) => token("or"),
  ordered_keyword: (_) => token("ordered"),
  out_keyword: (_) => token("out"),
  package_keyword: (_) => token("package"),
  parallel_keyword: (_) => token("parallel"),
  part_keyword: (_) => token("part"),
  perform_keyword: (_) => token("perform"),
  port_keyword: (_) => token("port"),
  private_keyword: (_) => token("private"),
  protected_keyword: (_) => token("protected"),
  public_keyword: (_) => token("public"),
  redefines_keyword: (_) => choice(token("redefines"), token(":>>")),
  ref_keyword: (_) => token("ref"),
  references_keyword: (_) => choice(token("references"), token("::>")),
  render_keyword: (_) => token("render"),
  rendering_keyword: (_) => token("rendering"),
  rep_keyword: (_) => token("rep"),
  require_keyword: (_) => token("require"),
  requirement_keyword: (_) => token("requirement"),
  return_keyword: (_) => token("return"),
  satisfy_keyword: (_) => token("satisfy"),
  send_keyword: (_) => token("send"),
  snapshot_keyword: (_) => token("snapshot"),
  specializes_keyword: (_) => choice(token("specializes"), token(":>")),
  stakeholder_keyword: (_) => token("stakeholder"),
  standard_keyword: (_) => token("standard"),
  state_keyword: (_) => token("state"),
  subject_keyword: (_) => token("subject"),
  subsets_keyword: (_) => choice(token("subsets"), token(":>")),
  succession_keyword: (_) => token("succession"),
  terminate_keyword: (_) => token("terminate"),
  then_keyword: (_) => token("the"),
  timeslice_keyword: (_) => token("timeslice"),
  to_keyword: (_) => token("to"),
  transition_keyword: (_) => token("transition"),
  true_keyword: (_) => token("true"),
  until_keyword: (_) => token("until"),
  use_keyword: (_) => token("use"),
  variant_keyword: (_) => token("variant"),
  variation_keyword: (_) => token("variation"),
  verification_keyword: (_) => token("verification"),
  verify_keyword: (_) => token("verify"),
  via_keyword: (_) => token("via"),
  view_keyword: (_) => token("view"),
  viewpoint_keyword: (_) => token("viewpoint"),
  when_keyword: (_) => token("when"),
  while_keyword: (_) => token("while"),
  xor_keyword: (_) => token("xor"),

  // special matching terminal for defined_by
  defined_by: ($) => choice(token(":"), seq($.defined_keyword, $.by_keyword)),

  // statements ---
  statement: ($) =>
    seq(
      choice(
        $.feature_statement,
        $.classifier_statement,
        $.dependency_statement,
        $.comment,
        $.comment_statement,
        $.documentation_statement,
        $.representation_statement,
      ),
    ),

  classifier_statement: ($) =>
    seq($.classifier_keyword, optional($.name_and_or_short_name), ";"),

  documentation_statement: ($) =>
    seq(
      $.doc_keyword,
      optional($.name_and_or_short_name),
      optional(seq($.locale_keyword, $.locale_code)),
      optional(seq($.about_keyword, $.qualified_name)),
      $.comment,
    ),

  comment_statement: ($) =>
    seq(
      $.comment_keyword,
      optional($.name_and_or_short_name),
      optional(seq($.about_keyword, $.qualified_name)),
      $.comment,
    ),

  representation_statement: ($) =>
    seq(
      optional($.rep_keyword),
      $.language_keyword,
      $.language_name,
      $.comment,
    ),

  feature_statement: ($) =>
    seq($.feature_keyword, optional($.name_and_or_short_name), ";"),

  dependency_statement: ($) =>
    seq(
      $.dependency_keyword,
      optional(
        // you can specify a name and use 'from' or just use 'from'
        seq(optional($.name_and_or_short_name), $.from_keyword),
      ),
      $.qualified_name_sequence,
      $.to_keyword,
      $.qualified_name_sequence,
      choice(seq("{", repeat($.statement), "}"), ";"),
    ),

  // typical C-style comments
  comment: (_) =>
    choice(
      token(seq("//", /.*/)), // single line
      seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"), // multi-line
    ),
};
