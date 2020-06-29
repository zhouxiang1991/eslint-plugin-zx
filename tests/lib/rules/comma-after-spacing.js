/**
 * @author zhouxiang1991
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/comma-after-spacing')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('comma-after-spacing', rule, {
  valid: [
    {
      code: `<template> <button :a="[1, 2]"></button> </template>`
    },
    {
      code: `<template> <button abc></button> </template>`
    },
    {
      filename: 'text.vue',
      code: `<template> <button :class="{ height: '1px', width: '2px' }"></button> </template>`
    }

  ],
  invalid: [
    {
      code: `<template> <button :a="[3,4]"></button> </template>`,
      output: `<template> <button :a="[3, 4]"></button> </template>`,
      errors: [
        {
          message: 'A space is required after.'
        }
      ]
    },
    {
      code: `<template> <button :a="[5, 6]"></button> </template>`,
      output: `<template> <button :a="[5,6]"></button> </template>`,
      options: ['never'],
      errors: [
        {
          message: `There should be no space after ','.`
        }
      ]
    }
  ]
})
