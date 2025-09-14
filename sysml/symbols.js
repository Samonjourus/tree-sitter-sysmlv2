module.exports = {
  // section 5: Namespaces and packages textual notation
  // 5.1: packages

  recurse: (_) => token("**"),
  wildcard: (_) => token.immediate("*"),
  scope: (_) => token("::"),
  square_close: (_) => token("]"),
  square_open: (_) => token("["),
};
