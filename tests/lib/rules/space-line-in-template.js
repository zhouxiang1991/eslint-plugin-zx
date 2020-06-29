/**
 * @fileoverview enforce insert space line between two element in element
 * @author zhouxiang1991
 */
'use strict'

const rule = require('../../../lib/rules/space-line-in-template')
// console.log(rule)
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  }
})

// const parserOptions = {
//   ecmaVersion: 2018,
//   sourceType: 'module'
// }

ruleTester.run('space-line-in-template', rule, {
  valid: [
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `
        <template>
          <div>
            <div />
            <div></div><a></a>
            <div></div>
          </div>
        </template>
        <script>
          export default {
          }
        </script>
      `,
      output: `
        <template>
          <div>
            <div />

            <div></div>

<a></a>

            <div></div>
          </div>
        </template>
        <script>
          export default {
          }
        </script>
      `,
      errors: [{
        message: `Between the two element of template in vue must have a line of blank in 4.`
      }, {
        message: `Between the two element of template in vue must have a line of blank in 5.`
      }, {
        message: `Between the two element of template in vue must have a line of blank in 5.`
      }]
    }
    // {
    //   options: ['never'],
    //   filename: 'test.vue',
    //   code: `
    //     <template>
    //       <div>
    //         <div />

    //         <div></div>
    //       </div>
    //     </template>
    //     <script>
    //       export default {
    //       }
    //     </script>
    //   `,
    //   output: `
    //     <template>
    //       <div>
    //         <div />
    //         <div></div>
    //       </div>
    //     </template>
    //     <script>
    //       export default {
    //       }
    //     </script>
    //   `,
    //   errors: [{
    //     message: `Between the two element of template in vue can't have a line of blank in 4.`
    //   }]
    // }
  ]
})

