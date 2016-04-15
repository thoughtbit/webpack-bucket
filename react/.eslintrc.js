module.exports = {
  root: true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'react'
  ],
  env: {
    'browser': true,
    'node': true
  },
  globals: {
    'React': true
  },
  parserOptions: {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
      'arrowFunctions': true,
      'destructuring': true,
      'classes': true,
      'defaultParams': true,
      'blockBindings': true,
      'modules': true,
      'objectLiteralComputedProperties': true,
      'objectLiteralShorthandMethods': true,
      'objectLiteralShorthandProperties': true,
      'restParams': true,
      'spread': true,
      'forOf': false,
      'generators': false,
      'templateStrings': true,
      'superInFunctions': true,
      'experimentalObjectRestSpread': true
    }
  },
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'semi': [2, 'always'],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
