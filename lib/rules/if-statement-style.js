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
      url: 'https://eslint.vuejs.org/rules/if-statement-style.html'
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
    const needBrace = !options || options === 'always'
    const sourceCode = context.getSourceCode()
    function report (node) {
      // console.log('xxxxxxxxxxx', sourceCode.getText(node))
      if (needBrace) {
        if (node.type !== 'BlockStatement') {
          context.report({
            node: node,
            message: 'expect brace.',
            fix (fixer) {
              const text = sourceCode.getText(node)
              return fixer.replaceTextRange(node.range, `{ ${text} }`)
            }
          })
        }
      } else {
        if (node.type === 'BlockStatement') {
          context.report({
            node: node,
            message: `unexpect brace.`,
            fix (fixer) {
              const text = sourceCode.getText(node)
              return fixer.replaceTextRange(node.range, text.replace(/(^{\s*|\s*}$)/, ''))
            }
          })
        }
      }
    }

    function handler (node) {
      if (node.consequent) {
        report(node.consequent)
      }

      if (node.alternate && node.alternate.type !== 'IfStatement') {
        report(node.alternate)
      }
    }
    // function needInsertSpaceLine (node) {
    //   if (node.type === 'LogicalExpression') {
    //     const { left, right } = node
    //     const leftText = sourceCode.getText(left)
    //     const rightText = sourceCode.getText(right)
    //     return leftText.length >= 30 || rightText.length >= 30
    //   }
    // }

    return {
      'IfStatement' (node) {
        // console.log(node)
        handler(node)
        // const { test } = node
        // if (needInsertSpaceLine(test)) {
        //   const text = sourceCode.text.slice(...node.range)
        //   // console.log(text)
        //   if (!text.match(/if\s\(\n[\s\S]*\n\)/)) {
        //     context.report({
        //       node,
        //       message: 'expect space line.',
        //       fix (fixer) {
        //         const t = sourceCode.text.slice(...test.range)
        //         return fixer.replaceTextRange(test.range, `\n${t}\n`)
        //       }
        //     })
        //   }
        // }
      }
    }
  }
}
