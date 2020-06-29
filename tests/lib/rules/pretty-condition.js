
const rule = require('../../../lib/rules/pretty-condition')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module'
}

ruleTester.run('pretty-condition', rule, {
  valid: [
  // {
    //   code: 'abc && abc'
    // }
  ],
  invalid: [
    // {
    //   parserOptions,
    //   code: `
    //     const a = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' && 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
    //   `,
    //   output: `
    //     const a = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' && \n'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
    //   `,
    //   errors: [
    //     {
    //       message: 'expect space line'
    //     }
    //   ]
    // },
    {
      parserOptions,
      code: `
if (
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' && 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
) {
}
      `,
      output: `
if (
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' && \n'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
) {
}
      `,
      errors: [
        {
          message: 'expect space line'
        }
      ]
    }
  ]
})
