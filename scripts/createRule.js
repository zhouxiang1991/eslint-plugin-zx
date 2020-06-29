const fs = require('fs')
// const path = require('path')
const readline = require('readline')

function placeholder (obj = {}, placeholder = '') {
  return String(placeholder).replace(/{[a-zA-Z]+}/g, (key) => obj[key.replace(/[{}]/g, '')] || '')
}

const ruleTemplate = `
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'recommend',
      description: '{desc}',
      url: 'https://eslint.vuejs.org/rules/{ruleName}.html'
    },
    fixable: 'code',
    schema: [
      {
        enum: ['always', 'never']
      },
    ]
  },

  create (context) {
    const options = context.options[0]
    const needInsertSpaceLine = !options || options === 'always'

    return {
    }
  }
}
`

const testTemplate = `
const rule = require('../../../lib/rules/{ruleName}')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module'
}

ruleTester.run('{ruleName}', rule, {
  valid: [
  ],
  invalid: [
  ],
})
`

const value = {}
function writeRule () {
  fs.writeFileSync(`./lib/rules/${value.ruleName}.js`, placeholder(value, ruleTemplate))
  fs.writeFileSync(`./tests/lib/rules/${value.ruleName}.js`, placeholder(value, testTemplate))
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('请输入规则名称\n', (answer) => {
  if (!answer) {
    console.log('规则名不能为空')
    return
  }
  value.ruleName = answer
  rl.question('请输入规则说明\n', (answer) => {
    value.desc = answer
    writeRule()
    console.log(`规则名称：${value.ruleName}\n规则说明：${value.desc}`)
    rl.close()
  })
})
