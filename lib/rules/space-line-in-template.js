/**
 * @fileoverview enforce insert space line between two element in template
 * @author zhouxiang1991
 */
'use strict'

const utils = require('../utils')

function getElements (elements) {
  return elements.filter(({ type }) => type === 'VElement')
}
function isTwoSpaceLine (text = '') {
  const result = text.match(/^.*\n{2}.+/g)
  return result
}

function isOneSpaceLine (text = '') {
  const result = text.match(/^.*\n.+/g)
  return result
}
function convertTwoSpaceLine (text = '') {
  const result = text.replace(/^(.*)(\r?\n)+/, '$1\n\n')
  return result
}
function convertOneSpaceLine (text = '') {
  const result = text.replace(/^(.*)(\r?\n)+/, '$1\n')
  return result
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce insert space line between two element in template',
      category: 'recommended',
      url: 'https://eslint.vuejs.org/rules/space-line-in-template.html'
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
    const { text } = sourceCode
    const options = context.options[0]
    const needInsertSpaceLine = !options || options === 'always'
    function handler (elements) {
      const list = []
      for (let index = 0; index < elements.length; index++) {
        const currentItem = elements[index]
        const afterItem = elements[index + 1]
        if (afterItem) {
          // console.log(currentItem)
          const start = (currentItem.endTag || currentItem.startTag).range[1]
          const end = afterItem.startTag.range[0]
          const node = currentItem.endTag || currentItem.startTag
          const value = text.slice(start, end)
          // console.log(currentItem, 'current')
          // console.log(afterItem, 'after')
          // console.log('start', start)
          // console.log('end', end)
          // console.log('node', node)
          // console.log(value)
          list.push({
            node,
            start,
            end,
            value
          })
        }
      }
      // console.log(list)

      list.forEach(({ start, end, node, value }) => {
        if (needInsertSpaceLine) {
          if (!value) {
            context.report({
              node,
              message: `Between the two element of template in vue must have a line of blank in {{line}}.`,
              data: {
                line: node.loc.start.line
              },
              fix (fixer) {
                return fixer.replaceTextRange([start, end], '\n\n')
              }
            })
          } else {
            if (!isTwoSpaceLine(value)) {
              // console.log('before two', value)
              context.report({
                node,
                message: `Between the two element of template in vue must have a line of blank in {{line}}.`,
                data: {
                  line: node.loc.start.line
                },
                fix (fixer) {
                  value = convertTwoSpaceLine(value)
                  // console.log('after two', value)
                  return fixer.replaceTextRange([start, end], value)
                }
              })
            }
          }
        } else {
          if (!value) {
            context.report({
              node,
              message: `Between the two element of template in vue must have a line of blank in {{line}}.`,
              data: {
                line: node.loc.start.line
              },
              fix (fixer) {
                return fixer.replaceTextRange([start, end], '\n')
              }
            })
          } else {
            if (!isOneSpaceLine(value)) {
              // console.log('before one', value)
              context.report({
                node,
                message: `Between the two element of template in vue can't have a line of blank in {{line}}.`,
                data: {
                  line: node.loc.start.line
                },
                fix (fixer) {
                  value = convertOneSpaceLine(value)
                  // console.log('after one', value)
                  return fixer.replaceTextRange([start, end], convertOneSpaceLine(value))
                }
              })
            }
          }
        }
      })
    }

    function traverse (elements) {
      elements = getElements(elements)
      if (elements.length > 1) {
        handler(elements)
      }
      for (let index = 0; index < elements.length; index++) {
        const element = elements[index]
        if (element && element.children) {
          traverse(element.children)
        }
        // const children = getElements(element.children)
      }
    }

    return utils.defineTemplateBodyVisitor(context, {
      'VElement' (node) {
        if (node.parent.type !== 'VDocumentFragment') return
        if (node.parent && node.parent.children) {
          const template = node.parent.children.find(({ type, name }) => type === 'VElement' && name === 'template')
          if (template && template.children) {
            const rootElement = template.children.find(({ type }) => type === 'VElement')
            if (rootElement && rootElement.children) {
              traverse(rootElement.children)
            }
          }
        }
        // console.log(node.parent.children)
      }
    })
  }
}

