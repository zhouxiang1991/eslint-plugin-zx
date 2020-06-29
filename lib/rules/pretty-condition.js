
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'recommend',
      description: 'enforce a long conditional expression to wrap',
      url: 'https://eslint.vuejs.org/rules/pretty-condition.html'
    },
    fixable: 'code',
    schema: [
    ]
  },

  create (context) {
    const sourceCode = context.getSourceCode()
    const { text } = sourceCode
    function hasParentheses (node) {
      const t = text.slice(node.start - 1, node.end)
      return t.startsWith('(')
    }
    function needInsertSpaceLine (node) {
      if (node.type === 'LogicalExpression') {
        const { left, right } = node
        const leftText = sourceCode.getText(left)
        const rightText = sourceCode.getText(right)
        return leftText.length >= 30 || rightText.length >= 30
      }
    }

    return {
      'LogicalExpression' (node) {
        // console.log(node.range, sourceCode.getText(node))
        const { right } = node
        if (needInsertSpaceLine(node)) {
          const parentheses = hasParentheses(right)
          const t = text.slice(right.range[0] - (parentheses ? 2 : 1), right.range[1])
          // console.log(t)
          if (!t.match(/^\n/)) {
            context.report({
              node: right,
              message: 'expect space line',
              fix (fixer) {
                let range
                let text
                const rightText = sourceCode.getText(right)
                if (parentheses) {
                // console.log(9999)
                  range = [right.start - 1, right.end]
                  text = `\n(${rightText}`
                } else {
                // console.log(888)
                  range = right.range
                  text = `\n${rightText}`
                }
                // console.log(range, text)
                return fixer.replaceTextRange(range, text)
              }
            })
          }
        }
      }
    }
  }
}
