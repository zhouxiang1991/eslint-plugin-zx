/**
 * @fileoverview enforce insert space line between two properties in components
 * @author zhouxiang1991
 */
'use strict'

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce insert space line between two properties in components',
      category: 'recommended',
      url: 'https://eslint.vuejs.org/rules/no-unnecessary-await.html'
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
    const sourceCode = context.getSourceCode()
    function handler (node) {
      // console.log(node)
      let body = node.body
      if (body && body.body) {
        body = body.body
        // console.log(body)
        const last = body[body.length - 1]
        if (last && last.type === 'ExpressionStatement' && last.expression && last.expression.type === 'AwaitExpression') {
          // console.log('222222')
          context.report({
            node: last,
            message: 'unnecessary await.',
            fix (fixer) {
              const text = sourceCode.getText(last)
              return fixer.replaceTextRange(last.range, text.replace(/^await\s/g, ''))
            }
          })
        }
      }
    }

    return {
      'ArrowFunctionExpression': handler,
      'FunctionExpression': handler,
      'FunctionDeclaration': handler,
      'ArrowFunctionDeclaration': handler
    }
  }
}
