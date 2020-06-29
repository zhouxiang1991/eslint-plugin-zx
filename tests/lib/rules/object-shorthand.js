/**
 * @author zhouxiang1991
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/object-shorthand')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('object-shorthand', rule, {
  valid: [
    '<template><div :attr="{ width }" /></template>'
    // {
    //   code: '<template><div :attr="[a]" /></template>',
    //   options: ['never']
    // },
    // {
    //   code: '<template><div :attr="[ a ]" /></template>',
    //   options: ['always']
    // },
    // '<template><div :[attr]="a" /></template>',
    // {
    //   code: '<template><div :[attr]="a" /></template>',
    //   options: ['always']
    // },
    // '<template><div :[[attr]]="a" /></template>',
    // {
    //   code: '<template><div :[[attr]]="a" /></template>',
    //   options: ['always']
    // }
  ],
  invalid: [
    {
      code: '<template><div :attr="{ width: width }" /></template>',
      output: '<template><div :attr="{ width }" /></template>',
      errors: ['Expected property shorthand.']
    }
    // {
    //   code: '<template><div :attr="[a ]" /></template>',
    //   output: '<template><div :attr="[a]" /></template>',
    //   errors: ["There should be no space before ']'."]
    // },
    // {
    //   code: '<template><div :attr="[ a ]" /></template>',
    //   output: '<template><div :attr="[a]" /></template>',
    //   errors: [
    //     "There should be no space after '['.",
    //     "There should be no space before ']'."
    //   ]
    // },
    // {
    //   code: '<template><div :attr="[ a]" /></template>',
    //   options: ['never'],
    //   output: '<template><div :attr="[a]" /></template>',
    //   errors: ["There should be no space after '['."]
    // },
    // {
    //   code: '<template><div :attr="[a ]" /></template>',
    //   options: ['never'],
    //   output: '<template><div :attr="[a]" /></template>',
    //   errors: ["There should be no space before ']'."]
    // },
    // {
    //   code: '<template><div :attr="[ a ]" /></template>',
    //   options: ['never'],
    //   output: '<template><div :attr="[a]" /></template>',
    //   errors: [
    //     "There should be no space after '['.",
    //     "There should be no space before ']'."
    //   ]
    // },
    // {
    //   code: '<template><div :attr="[ a]" /></template>',
    //   options: ['always'],
    //   output: '<template><div :attr="[ a ]" /></template>',
    //   errors: ["A space is required before ']'."]
    // },
    // {
    //   code: '<template><div :attr="[a ]" /></template>',
    //   options: ['always'],
    //   output: '<template><div :attr="[ a ]" /></template>',
    //   errors: ["A space is required after '['."]
    // },
    // {
    //   code: '<template><div :attr="[a]" /></template>',
    //   options: ['always'],
    //   output: '<template><div :attr="[ a ]" /></template>',
    //   errors: [
    //     "A space is required after '['.",
    //     "A space is required before ']'."
    //   ]
    // },
    // {
    //   code: '<template><div :[[attr]]="[a]" /></template>',
    //   options: ['always'],
    //   output: '<template><div :[[attr]]="[ a ]" /></template>',
    //   errors: [
    //     "A space is required after '['.",
    //     "A space is required before ']'."
    //   ]
    // }
  ]
})
