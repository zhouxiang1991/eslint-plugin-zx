/**
 * @fileoverview Enforce multiple-line-import-export.
 * @author zhouxiang1991
 */
'use strict'
// const vueEslintParser = require('vue-eslint-parser')
// console.log(vueEslintParser.parse(`
// export function isEvent (key, value) {
//   return key.startsWith('_') && isFunction(value)
// }
// `, {
//   ecmaVersion: 2015,
//   sourceType: 'module'
// }))

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/multiple-line-import-export')

const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
  parserOptions: { ecmaVersion: 2015, sourceType: 'module' }
})
ruleTester.run('multiple-line-import-export', rule, {

  valid: [
    // {
    //   code: `
    //     import {
    //       a,
    //       b
    //     } from 'a'
    //   `,
    //   options: ['always']
    // },
    // {
    //   code: `
    //     import { a } from 'a'`,
    //   options: ['always']
    // },
    // {
    //   code: `
    //     import { a, b } from 'a'
    //   `,
    //   options: ['never']
    // },
    // {
    //   code: `
    //     import { a } from 'a'
    //   `,
    //   options: ['never']
    // }
  ],

  invalid: [
    {
      code: `
        export { a, b, c } from 'a'
      `,
      output: `
        export {
a,
b,
c
} from 'a'
      `,
      options: ['always'],
      errors: [{
        message: 'expect multiple line import/export.'
      }, {
        message: 'expect multiple line import/export.'
      }, {
        message: 'expect multiple line import/export.'
      }, {
        message: 'expect multiple line import/export.'
      }]
    }
    // {
    //   code: `
    //     import {
    //       a,
    //       b,
    //       c
    //     } from 'a'
    //   `,
    //   output: `
    //     import { a, b, c } from 'a'
    //   `,
    //   options: ['never'],
    //   errors: [{
    //     message: 'expect single line import/export.'
    //   }, {
    //     message: 'expect single line import/export.'
    //   }, {
    //     message: 'expect single line import/export.'
    //   }, {
    //     message: 'expect single line import/export.'
    //   }]
    // }
  ]
})
