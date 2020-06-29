/**
 * @fileoverview Enforces render function to always return value.
 * @author Armano
 */
'use strict'

const utils = require('../utils')

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce render function to always return value',
      category: 'essential',
      url: 'https://eslint.vuejs.org/rules/require-render-return.html'
    },
    fixable: null, // or "code" or "whitespace"
    schema: []
  },

  create (context) {
    // const forbiddenNodes = []

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------
    return {
      'ObjectExpression' (node) {
        if (utils.isVueDeclaration(node)) {
          node = node.properties.find(item => item.type === 'Property' &&
          utils.getStaticPropertyName(item) === 'render' &&
          (item.value.type === 'ArrowFunctionExpression' || item.value.type === 'FunctionExpression'))
          if (!node) return
          const properties = node.body || []
          const hasReturn = properties.some(({ type }) => type === 'ReturnStatement')
          if (!hasReturn) {
            context.report({
              node: node.key,
              message: 'Expected to return a value in render function.'
            })
          }
        }
      }
    }
  }
}
