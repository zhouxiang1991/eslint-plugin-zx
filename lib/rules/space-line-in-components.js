/**
 * @fileoverview enforce insert space line between two properties in components
 * @author zhouxiang1991
 */
'use strict'

const utils = require('../utils')
const PROPERTY_MAP = [
  'props',
  'computed',
  'methods',
  'watch'
]

// function removeLineComment (text) {
//   const start = text.indexOf('//')
//   const end = text.lastIndexOf('//')
//   if (start !== -1 && end !== -1) {
//     // console.log('start', start, 'end', end)
//     const lastCommentEnterIndex = text.slice(end).indexOf('\n')
//     // console.log('lastCommentEnterIndex', lastCommentEnterIndex)
//     if (lastCommentEnterIndex !== -1) {
//       text = text.slice(0, start) + text.slice(lastCommentEnterIndex + end)
//       return text
//     }
//   }

//   return text
// }

// function removeBlockComment (text) {
//   const start = text.indexOf('/**')
//   const end = text.lastIndexOf('*/')
//   if (start !== -1 && end !== -1) {
//     text = text.slice(0, start) + text.slice(end + 2)
//     return text
//   }

//   return text
// }
// const t = `, // bbbbbbbbb\n`
// t.replace(/(,)(.{0,})(\n+)/, (a1, a2, a3, a4, a5, a6) => {
//   console.log('a1', a1)
//   console.log('a2', a2)
//   console.log('a3', a3)
//   console.log('a4', a4)
//   console.log('a5', a5)
//   console.log('a6', a6)
// })

function isTwoSpaceLine (text = '') {
  const result = text.match(/^,.*\n{2}.+/g)
  return result
}

// const code = `,

//   /**
//    * @type {object}
//    * @instance
//    * @property {number} col=2 - 参考WecFrame/components/componentMixins.layout.col
//    * @property {number} marginBottom=24 - 参考WecFrame/components/componentMixins.layout.marginBottom
//    * @property {string} bgColor='var(--content-bg)' - 背景色
//    * @property {*} ...otherProps - 其他props请参考WecFrame/components/componentMixins.layout和WecFrame/components/componentMixins.validator
// `
// console.log(isTwoSpaceLine(code))
// console.log(code.charCodeAt(0))
// console.log(code.charCodeAt(1))
// console.log(code.charCodeAt(2))
// console.log(code.charCodeAt(3))
// console.log(code.match(/,\n\n.+/g))

function isOneSpaceLine (text = '') {
  // console.log(text)
  const result = text.match(/^,.*\n.+/g)
  // console.log(result)
  return result
}

// function hasAsyncFunction (value) {
//   const hasAsyncFunction = value.match(/async $/)
//   return hasAsyncFunction
// }

// const inlineCommentRE = /(,\s+\/\/.+\n)/
function convertTwoSpaceLine (text = '') {
  // let result = text.match(inlineCommentRE)
  // if (result) {
  //   result = text.replace(inlineCommentRE, '$1\n')
  // } else {
  // console.log('23333333333', text)
  // const result = text.replace(/(,)(.{0,})(\n+)/, '$1$2\n\n')
  // console.log('-----------', text)
  const result = text.replace(/^,(.*)(\r?\n)+/, ',$1\n\n')
  // console.log('==========', result)
  // console.log(text)
  // console.log('23333333333', result)
  // }

  return result
}

function convertOneSpaceLine (text = '') {
  const result = text.replace(/^,(.*)(\r?\n)+/, ',$1\n')
  return result
}

// function canNotFix (sourceCode, node, value) {
//   const hasComment = sourceCode.getCommentsAfter(node).length
//   return hasComment
// }

// function hasComment (sourceCode, node, value) {
//   const hasComment = sourceCode.getCommentsAfter(node).length
//   return hasComment
// }

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce insert space line between two properties in components',
      category: 'recommended',
      url: 'https://eslint.vuejs.org/rules/space-line-in-components.html'
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
    // console.log(context)
    const options = context.options[0]
    const needInsertSpaceLine = !options || options === 'always'
    // const extendedOrder = order.map(property => groups[property] || property)
    const sourceCode = context.getSourceCode()

    function insertSpaceLine (node) {
      // const tokens = sourceCode.getTokens(node)
      // console.log(tokens)

      const text = sourceCode.text
      // console.log(text)
      const properties = node.properties.filter(property => property.type === 'Property')
      // console.log(properties, '000000', properties.length)
      const intervalList = []
      for (let index = 0; index < properties.length; index++) {
        const currentItem = properties[index]
        // console.log(currentItem.value)
        const afterItem = properties[index + 1]
        if (afterItem) {
          // if (sourceCode.getText(currentItem).indexOf('dddd') !== -1) {
          //   console.log(currentItem)
          // }
          const start = currentItem.value.range[1]
          const end = afterItem.key.range[0]
          const node = sourceCode.getTokenAfter(currentItem.value)
          const value = text.slice(start, end)
          // console.log(currentItem, 'current')
          // console.log(afterItem, 'after')
          // console.log('start', start)
          // console.log('end', end)
          // console.log('node', node)
          // console.log(value)
          // if (hasComment(sourceCode, node, value)) {
          //   console.log('before', '"', value, '"')
          //   value = removeBlockComment(value)
          //   value = removeLineComment(value)
          //   console.log('afterr', '"', value, '"')
          // }
          intervalList.push({
            node,
            start,
            end,
            value
          })
        }
      }

      intervalList.forEach(({ start, end, value, node }) => {
        if (needInsertSpaceLine) {
          const fix = function fix (fixer) {
            value = convertTwoSpaceLine(value)
            // console.log('after two', value)
            return fixer.replaceTextRange([start, end], value)
          }
          if (!isTwoSpaceLine(value)) {
            // console.log('before two', value)
            context.report({
              node,
              message: `Between the two property of component in vue must have a line of blank in {{line}}.`,
              data: {
                line: node.loc.start.line
              },
              fix
            })
          }
        } else {
          const fix = function fix (fixer) {
            value = convertOneSpaceLine(value)
            // console.log('after one', value)
            return fixer.replaceTextRange([start, end], convertOneSpaceLine(value))
          }
          // console.log(value)
          if (!isOneSpaceLine(value)) {
            // console.log('before one', value)
            context.report({
              node,
              message: `Between the two property of component in vue can't have a line of blank in {{line}}.`,
              data: {
                line: node.loc.start.line
              },
              fix
            })
          }
        }
      })

      // console.log(properties[0])

      // properties.slice(1).forEach(node => {
      //   const before = sourceCode.getTokenBefore(node)
      //   // console.log(before)
      // })

      // console.log(sourceCode.getText(properties[0].parent.parent))
      // console.log(sourceCode.getTokens(properties[0].parent.parent))
      // console.log(sourceCode.isSpaceBetweenTokens(properties[0].parent, properties[1].parent))
      // console.log(properties)
    }
    function handler (node) {
      // console.log('33333')
      insertSpaceLine(node)
      const properties = node.properties.filter(({ key: { name }}) => {
        // console.log(name)
        return PROPERTY_MAP.includes(name)
      })
      properties.forEach(({ value }) => {
        // console.log(sourceCode.getText(value))
        if (value.type === 'ObjectExpression') {
          // console.log(value)
          insertSpaceLine(value)
        }
      })
      // properties
    }

    // console.log(js)

    return {
      // ...result,
      'ObjectExpression' (node) {
        if (utils.isVueDeclaration(node)) {
          handler(node)
        }
      }
    }
  }
}
