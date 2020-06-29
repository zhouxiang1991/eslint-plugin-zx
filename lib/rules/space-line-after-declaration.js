/**
 * @fileoverview enforce insert space line between two properties in components
 * @author zhouxiang1991
 */
'use strict'
// const utils = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce insert space line between two properties in components',
      category: 'recommended',
      url: 'https://eslint.vuejs.org/rules/space-line-after-declaration.html'
    },
    fixable: 'code', // null or "code" or "whitespace"
    schema: [
      {
        enum: ['always', 'never']
      },
      {
        type: 'object',
        properties: {
          'ignore': {
            type: 'array',
            items: {
              allOf: [
                { type: 'string' },
                { not: { type: 'string', pattern: ':exit$' }},
                { not: { type: 'string', pattern: '^\\s*$' }}
              ]
            },
            uniqueItems: true,
            additionalItems: false
          }
        },
        additionalProperties: false
      }
    ]
  },

  create (context) {
    const options = context.options[0]
    const needInsertSpaceLine = !options || options === 'always'
    const sourceCode = context.getSourceCode()
    const allText = sourceCode.text

    function report (node, type) {
      context.report({
        node,
        message: type === 1 ? `expect space line.` : `unexpect space line.`,
        fix (fixer) {
          const text = sourceCode.getText(node)
          if (type === 1) {
            return fixer.replaceTextRange(node.range, '\n' + text)
          }

          return fixer.replaceTextRange([node.range[0] - 1], node.range[0], '')
        }
      })
    }

    function shouldInsertSpaceLine (node, after) {
      const text = allText.slice(node.range[1], after.range[0])
      // text = utils.removeComment(text)
      // console.log(text, text.length)
      // console.log(text.match(/^\n\n/g))
      const enterCount = (text.match(/\n/g) || []).length
      if (enterCount === 1) return true
    }

    function noSpaceLine (node) {
      const text = allText.slice(node.range[1], after.range[0])
      const enterCount = (text.match(/\n/g) || []).length
      if (enterCount >= 2) return true
    }

    function handler (node) {
      const parent = node.parent
      if (parent && parent.body) {
        let list = parent.body
        if (!Array.isArray(parent.body)) {
          list = [parent.body]
        }
        const index = list.findIndex(n => n === node)
        if (index !== -1) {
          const after = list[index + 1]
          if (
            after && after.type && (after.type === 'ExpressionStatement'
              ? after.expression ? after.expression.type !== 'AssignmentExpression' : false
              : after.type !== 'VariableDeclaration')
          ) {
            if (needInsertSpaceLine) {
              if (shouldInsertSpaceLine(node, list[index + 1])) {
                report(list[index + 1], 1)
              }
            } else {
              if (noSpaceLine(node, list[index + 1])) {
                report(node, 2)
              }
            }
          }
        }
      }
    }

    return {
      'VariableDeclaration' (node) {
        handler(node)
      },

      'ExpressionStatement' (node) {
        if (node.expression && node.expression.type === 'AssignmentExpression') {
          handler(node)
        }
      }
    }
  }
}
