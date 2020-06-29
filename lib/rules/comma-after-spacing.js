/**
 * @author zhouxiang1991
 */
'use strict'

const utils = require('../utils')
var Linter = require('eslint').Linter
var linter = new Linter()
let parserOptions = {}

function format (text, insertSpacing = true) {
  text = `(${text})`
  const result = linter.verifyAndFix(text, {
    rules: {
      'comma-spacing': [2, { before: false, after: insertSpacing }]
    },
    parserOptions
  })
  return result
}

function verify (text, insertSpacing = true) {
  // console.log(text)
  text = `(${text})`
  const result = linter.verify(text, {
    rules: {
      'comma-spacing': [2, { before: false, after: insertSpacing }]
    },

    parserOptions
  })
  // console.log(parserOptions)
  // console.log(result)
  return result.length
}

function removeParentheses (text) {
  return text.replace(/^\(/, '').replace(/\)$/, '')
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce insert spacing after comma',
      category: 'strongly-recommended',
      url: 'https://eslint.vuejs.org/rules/comma-after-spacing.html'
    },
    fixable: 'code',
    schema: [
      {
        enum: ['always', 'never']
      }
    ]
  },

  create (context) {
    // console.log(context.parserOptions)
    // console.log(context.settings)
    // console.log(context.options)
    // console.log(context.parserPath)
    parserOptions = context.parserOptions
    // console.log(parserOptions)

    const sourceCode = context.getSourceCode()
    const option = context.options[0]
    const insertSpacing = !option || option === 'always'

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return utils.defineTemplateBodyVisitor(context, {
      VAttribute (node) {
        let expression
        if (node.value && node.value.expression) {
          expression = node.value.expression
        }
        if (!expression) return
        // console.log(expression.properties, '1')
        expression = sourceCode.getText(expression)
        // console.log(expression, '2')
        // console.log(expression)
        const needFix = verify(expression, insertSpacing)
        if (!needFix) return
        const message = insertSpacing ? `A space is required after.` : `There should be no space after ','.`
        context.report({
          node: node.value.expression,
          message,
          fix (fixer) {
            const result = format(expression, insertSpacing)
            return fixer.replaceText(node.value.expression, removeParentheses(result.output))
          }
        })
        // console.log(sourceCode.getText(value.expression))
        // console.log(sourceCode.getTokenByRangeStart(22))
        // console.log(value)
      }
    })
  }
}
