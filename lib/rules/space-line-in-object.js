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
      url: 'https://eslint.vuejs.org/rules/space-line-in-object.html'
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
      const token = sourceCode.getTokenAfter(node)
      // console.log('type', type)
      context.report({
        node: token,
        message: type === 1 ? `expect space line.` : `unexpect space line.`,
        fix (fixer) {
          const text = sourceCode.getText(token)
          if (type === 1) {
            return fixer.replaceTextRange(token.range, text + '\n')
          }

          return fixer.replaceTextRange([token.range[1], token.range[1] + 1], '')
        }
      })
    }

    function shouldInsertSpaceLine (node, after) {
      const { loc } = node
      if (loc.start.line === loc.end.line) return false
      const text = allText.slice(node.range[1], after.range[0])
      // console.log(text, text.length)
      if (!text.match(/^,\n\n/g)) return true
    }

    function noSpaceLine (node, after) {
      const { loc } = node
      if (loc.start.line === loc.end.line) return false
      const text = allText.slice(node.range[1], after.range[0])
      // console.log(text, 'aaaaaa')
      // console.log(text.match(/^\n\n/g)
      if (text.match(/^,\n\n/g)) return true
    }
    const types = [
      'ArrowFunctionExpression',
      'ObjectExpression',
      'ArrayExpression',
      'FunctionExpression'
    ]

    function handler (node) {
      const { properties } = node
      // console.log(properties)
      if (properties.length < 2) return

      const keys = properties.filter(({ value }) => types.includes(value && value.type))
      // console.log(keys.length)

      for (let index = 0; index < properties.length; index++) {
        const property = properties[index]
        if (index !== properties.length - 1) {
          // console.log(property.value.type)
          if (property.value && types.includes(property.value.type)) {
            if (needInsertSpaceLine && keys.length >= 2) {
              if (shouldInsertSpaceLine(property, properties[index + 1])) {
                report(property, 1)
              }
            } else {
              if (noSpaceLine(property, properties[index + 1])) {
                report(property, 2)
              }
            }
          }
        }
      }
    }

    return {
      'ObjectExpression': handler
    }
  }
}
