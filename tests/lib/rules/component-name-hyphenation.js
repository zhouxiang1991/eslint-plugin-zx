/**
 * @fileoverview Define a style for the component name casing in templates.
 * @author zhouxiang1991
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/component-name-hyphenation')

const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

ruleTester.run('component-name-hyphenation', rule, {

  valid: [
    {
      filename: 'test.vue',
      code: '<template><CustomComponentB></CustomComponentB></template>',
      options: ['never']
    },
    {
      filename: 'test.vue',
      code: '<template><custom-component-t></custom-component-t></template>',
      options: ['always']
    }
  ],

  invalid: [
    {
      filename: 'test.vue',
      code: '<template><CustomComponentA>CustomComponentA</CustomComponentA></template>',
      output: '<template><custom-component-a>CustomComponentA</custom-component-a></template>',
      options: ['always'],
      errors: [{
        message: "component name 'CustomComponentA' must be hyphenated.",
        type: 'VElement',
        line: 1
      }]
    },
    {
      filename: 'test.vue',
      code: '<template><custom-component-d></custom-component-d></template>',
      output: '<template><CustomComponentD></CustomComponentD></template>',
      options: ['never'],
      errors: [{
        message: "component name 'custom-component-d' must be PascalCase.",
        type: 'VElement',
        line: 1
      }]
    }
  ]
})
