/*
 * @fileoverview Define a style for the component name casing in templates.
 * @author zhouxiang1991
 */
'use strict'

const utils = require('../utils')
const casing = require('../utils/casing')

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce component naming style on custom components in template',
      category: 'strongly-recommended',
      url: 'https://eslint.vuejs.org/rules/component-name-hyphenation.html'
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
    const option = context.options[0]
    const useHyphenated = !option || option === 'always'

    const caseConverter = casing.getConverter(useHyphenated ? 'kebab-case' : 'PascalCase')

    function reportIssue (node) {
      const text = sourceCode.getText(node)

      context.report({
        node: node,
        loc: node.loc,
        message: useHyphenated ? "component name '{{rawName}}' must be hyphenated." : "component name '{{rawName}}' must be PascalCase.",
        data: {
          text,
          rawName: node.rawName
        },
        fix: fixer => fixer.replaceText(node, text.replace(new RegExp(`(<${node.rawName}|</${node.rawName}>)`, 'g'), value => {
          // console.log(value)
          value = value.replace(node.rawName, caseConverter(node.rawName))
          // console.log(value)
          return value
        }))
      })
    }

    function isIgnoredComponentName (value) {
      return useHyphenated ? value.toLowerCase() === value : !/-/.test(value)
    }

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return utils.defineTemplateBodyVisitor(context, {
      VElement (node) {
        if (isIgnoredComponentName(node.rawName)) return
        reportIssue(node)
      }
    })
  }
}
