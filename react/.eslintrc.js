module.exports = {
  root: true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    "standard-react"
  ],
  plugins: [
    'react'
  ],
  env: {
    browser: true,
    node: true,
    mocha: true,
    jest: true,
    es6: true
  },
  globals: {
    'React': true,
    'ReactDOM': true
  },
  parser: 'babel-eslint',
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
    'comma-dangle': 0,
    'func-names': 0,
    'prefer-const': 0,
    'arrow-body-style': 0,
    'react/sort-comp': 0,
    'react/prop-types': 0,
    'react/jsx-closing-bracket-location': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    'max-len': 0,
    'consistent-return': 0,
    "no-unused-vars": 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'semi': [2, 'always'],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
