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
      url: 'https://eslint.vuejs.org/rules/space-line-after-brace.html'
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
      // console.log('type', type)
      context.report({
        node: node,
        message: type === 1 ? `expect space line.` : `unexpect space line.`,
        fix (fixer) {
          const text = sourceCode.getText(node)
          if (type === 1) {
            return fixer.replaceTextRange(node.range, text + '\n')
          }

          return fixer.replaceTextRange([node.range[1], node.range[1] + 1], '')
        }
      })
    }

    function shouldInsertSpaceLine (node) {
      const token = sourceCode.getTokenAfter(node)
      // console.log(token)
      // console.log(sourceCode.getText(node), sourceCode.getText(token), token.type)
      if (!token || ['Punctuator'].includes(token.type) || ['else', 'catch', 'finally', 'while'].includes(token.value)) return false
      const text = allText.slice(node.range[1], node.range[1] + 2)
      // console.log(text, text.length)
      if (!text.match(/^\n\n/g)) return true
    }

    function noSpaceLine (node) {
      const token = sourceCode.getTokenAfter(node)
      if (!token || ['Punctuator', 'Keyword'].includes(token.type)) return false
      const text = allText.slice(node.range[1], node.range[1] + 2)
      // console.log(text, text.length)
      // console.log(text[0] === '\n')
      // console.log(text[1] === '\n')
      // console.log(text.match(/^\n\n/g))
      if (text.match(/^\n\n/g)) return true
    }

    function handler (node) {
      if (needInsertSpaceLine) {
        if (shouldInsertSpaceLine(node)) {
          report(node, 1)
        }
      } else {
        if (noSpaceLine(node)) {
          report(node, 2)
        }
      }
    }

    return {
      'CallExpression' (node) {
        for (let index = 0; index < node.arguments.length; index++) {
          const argument = node.arguments[index]
          if (argument.loc && argument.loc.start.line !== argument.loc.end.line) {
            handler(node)
            break
          }
        }
      },
      'BlockStatement' (node) {
        handler(node)
      }
    }
  }
}
