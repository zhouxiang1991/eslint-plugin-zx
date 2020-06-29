/**
 * @fileoverview Enforces that a return statement is present in computed property (return-in-computed-property)
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
      description: 'enforce that a return statement is present in computed property',
      category: 'essential',
      url: 'https://eslint.vuejs.org/rules/return-in-computed-property.html'
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      {
        type: 'object',
        properties: {
          treatUndefinedAsUnspecified: {
            type: 'boolean'
          }
        },
        additionalProperties: false
      }
    ]
  },

  create (context) {
    // const sourceCode = context.getSourceCode()
    const options = context.options[0] || {}
    const treatUndefinedAsUnspecified = !(options.treatUndefinedAsUnspecified === false)

    const forbiddenNodes = []

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return Object.assign({},
      utils.executeOnFunctionsWithoutReturn(treatUndefinedAsUnspecified, node => {
        forbiddenNodes.push(node)
      }),
      {
        'ObjectExpression' (node) {
          // console.log(node)
          if (utils.isVueDeclaration(node)) {
            const computedProperties = utils.getComputedProperties(node)

            // console.log(forbiddenNodes)
            computedProperties.forEach(cp => {
              const properties = (cp.value && cp.value.body) || []
              const hasReturn = properties.some(({ type }) => type === 'ReturnStatement')
              // console.log(sourceCode.getText(cp.value), hasReturn)
              // console.log('hlasReturn', hasReturn)
              if (!hasReturn) {
                // console.log(sourceCode.getText(cp.value))
                context.report({
                  node: cp.value,
                  message: 'Expected to return a value in "{{name}}" computed property.',
                  data: {
                    name: cp.key
                  }
                })
              }
              // console.log(cp.value.body)
              // console.log(computedProperties.length)
              // console.log(forbiddenNodes)
              // forbiddenNodes.forEach(el => {
              // console.log(el)
              // console.log(sourceCode.getText(cp.value))
              // if (cp.value && cp.value.parent === el) {
              //   // console.log(el)
              //   context.report({
              //     node: el,
              //     message: 'Expected to return a value in "{{name}}" computed property.',
              //     data: {
              //       name: cp.key
              //     }
              //   })
              // }
              // })
            })
          }
        }
      },
    )
  }
}
