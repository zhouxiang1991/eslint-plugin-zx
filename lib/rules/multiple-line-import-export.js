/*
 * @fileoverview Enforce multiple-line-import-export.
 * @author zhouxiang1991
 */
'use strict'

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce multiple-line-import-export',
      category: 'strongly-recommended',
      url: 'https://eslint.vuejs.org/rules/multiple-line-import-export.html'
    },
    fixable: 'code',
    schema: [
      {
        enum: ['always', 'never']
      }
    ]
  },

  create (context) {
    const sourceCode = context.getSourceCode()
    const text = sourceCode.text
    const options = context.options[0]

    function handler (node) {
      let { specifiers } = node
      specifiers = specifiers.filter(({ type }) => ['ImportSpecifier', 'ExportSpecifier'].includes(type))
      if (!specifiers.length) return
      const needInsertEnter = (!options || options === 'always') && specifiers.length > 1
      const list = []
      for (let index = 0; index < specifiers.length; index++) {
        const currentItem = specifiers[index]
        const afterItem = specifiers[index + 1]
        if (afterItem) {
          // console.log(currentItem, currentItem.range, index)
          const start = currentItem.range[1]
          const end = afterItem.range[0]
          const node = sourceCode.getTokenAfter(currentItem)
          const value = text.slice(start, end)
          list.push({
            node,
            start,
            end,
            value
          })
        }
      }

      let braces = []
      const tokens = sourceCode.getTokens(node)
      const leftBraces = tokens.find(({ type, value }) => type === 'Punctuator' && value === '{')
      if (leftBraces) braces.push(leftBraces)
      const rightBraces = tokens.find(({ type, value }) => type === 'Punctuator' && value === '}')
      if (rightBraces) braces.push(rightBraces)

      braces = braces.map(item => {
        let node
        let start
        let end
        if (item.value === '{') {
          node = sourceCode.getTokenAfter(item)
        } else {
          node = sourceCode.getTokenBefore(item)
        }
        if (item.value === '{') {
          start = item.range[1]
          end = node.range[0]
        } else {
          start = node.range[1]
          end = item.range[0]
        }
        return {
          node,
          start,
          end,
          value: text.slice(start, end)
        }
      })
      // console.log(braces)

      braces.forEach(({ value, end, start, node }) => {
        if (needInsertEnter) {
          if (!value.includes('\n')) {
            context.report({
              node,
              message: `expect multiple line import/export.`,
              fix (fixer) {
                return fixer.replaceTextRange([start, end], '\n')
              }
            })
          }
        } else {
          // console.log(value.includes('\n'))
          if (value.includes('\n')) {
            // console.log(value)
            context.report({
              node,
              message: `expect single line import/export.`,
              fix (fixer) {
                return fixer.replaceTextRange([start, end], ' ')
              }
            })
          }
        }
      })

      list.forEach(({ start, end, value, node }) => {
        if (needInsertEnter) {
          if (!value.includes('\n')) {
            context.report({
              node,
              message: `expect multiple line import/export.`,
              fix (fixer) {
                return fixer.replaceTextRange([start, end], ',\n')
              }
            })
          }
        } else {
          if (value.includes('\n')) {
            context.report({
              node,
              message: `expect single line import/export.`,
              fix (fixer) {
                return fixer.replaceTextRange([start, end], ', ')
              }
            })
          }
        }
      })
    }

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return {
      ImportDeclaration: handler,
      ExportNamedDeclaration: handler
    }
  }
}
