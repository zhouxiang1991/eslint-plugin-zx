/**
 * @fileoverview enforce insert space line between two properties in components
 * @author zhouxiang1991
 */
'use strict'

const rule = require('../../../lib/rules/space-line-in-components')
// console.log(rule)
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module'
}

// const test = `
//   name: 'app',
//   // abc
//   // ddd
//   data () {
// `
// console.log(test.indexOf('//'))
// console.log(test.lastIndexOf('//'))
// console.log(test.slice(18, 20))
// console.log(test.slice(27, 29))
// const code = `
// `
// console.log(code.slice(35, 42))

ruleTester.run('space-line-in-components', rule, {
  valid: [
    // {
    //   parserOptions,
    //   options: ['always'],
    //   filename: 'test.vue',
    //   code: `
    //     export default {
    //       name: 'CForm',

    //       mixins: [
    //         layout,
    //         validator
    //       ],

    //       inheritAttrs: false,

    //       /**
    //        * @type {object}
    //        * @instance
    //        * @property {number} col=2 - 参考WecFrame/components/componentMixins.layout.col
    //        * @property {number} marginBottom=24 - 参考WecFrame/components/componentMixins.layout.marginBottom
    //        * @property {string} bgColor='var(--content-bg)' - 背景色
    //        * @property {*} ...otherProps - 其他props请参考WecFrame/components/componentMixins.layout和WecFrame/components/componentMixins.validator
    //        */
    //       props: {
    //         col: {
    //           type: Number,
    //           default: 2
    //         },

    //         marginBottom: {
    //           type: Number,
    //           default: 24
    //         },

    //         bgColor: {
    //           type: String,
    //           default: 'var(--content-bg)'
    //         }
    //       },

    //       computed: {
    //         a: 'abc',

    //         b() {
    //         },

    //         c: 'aaa',

    //         // abc
    //         dddd,

    //         f
    //       },

    //       methods: {
    //         a() {
    //         },

    //         b() {
    //         },
    //       }
    //     }
    //   `
    // },
    // {
    //   filename: 'test.vue',
    //   code: `
    //     export default {
    //       name: 'app',

    //       data () {
    //         return {
    //           msg: 'Welcome to Your Vue.js App'
    //         }
    //       },

    //       props: {
    //         propA: Number,
    //       },
    //     }
    //   `,
    //   parserOptions
    // }
    {
      parserOptions,
      filename: '1.js',
      code: `
        export default {
          name: 'a',

          methods: {
          }
        }
      `
    }
  ],
  invalid: [
    // {
    //   options: ['always'],
    //   filename: 'test.vue',
    //   code: `
    //     export default {
    //       props: {
    //         title: {
    //           type: String,
    //           default: '导入'
    //         },
    //         downLoadUrl: {
    //           type: String,
    //           default: ''
    //         }
    //       },
    //     }
    //   `,
    //   parserOptions,
    //   output: `
    //     export default {
    //       props: {
    //         title: {
    //           type: String,
    //           default: '导入'
    //         },

    //         downLoadUrl: {
    //           type: String,
    //           default: ''
    //         }
    //       },
    //     }
    //   `,
    //   errors: [{
    //     message: 'Between the two property of component in vue must have a line of blank in 7.'
    //   }]
    // }
    // {
    //   options: ['always'],
    //   filename: 'test.vue',
    //   code: `
    //     export default {
    //       name: 'app',
    //       data () {
    //         return {
    //           msg: 'Welcome to Your Vue.js Ap'
    //         }
    //       },

    //       props: {
    //         naturalIndex: Number, // aaaaaaaaaa
    //         index: Number, // bbbbbbbbb
    //         checked: Boolean,
    //       },

    //       methods: {
    //         getDict, // ccccccc
    //         selectTab (name) {
    //           this.tabs.activeKey = name
    //         },
    //       }
    //     }
    //   `,
    //   parserOptions,
    //   output: `
    //     export default {
    //       name: 'app',

    //       data () {
    //         return {
    //           msg: 'Welcome to Your Vue.js Ap'
    //         }
    //       },

    //       props: {
    //         naturalIndex: Number, // aaaaaaaaaa

    //         index: Number, // bbbbbbbbb

    //         checked: Boolean,
    //       },

    //       methods: {
    //         getDict, // ccccccc

    //         selectTab (name) {
    //           this.tabs.activeKey = name
    //         },
    //       }
    //     }
    //   `,
    //   errors: [{
    //     message: 'Between the two property of component in vue must have a line of blank in 3.'
    //   }, {
    //     message: 'Between the two property of component in vue must have a line of blank in 11.'
    //   }, {
    //     message: 'Between the two property of component in vue must have a line of blank in 12.'
    //   }, {
    //     message: 'Between the two property of component in vue must have a line of blank in 17.'
    //   }]
    // },
    // {
    //   options: ['always'],
    //   filename: 'test.vue',
    //   code: `
    //     export default {
    //       name: 'app',
    //       // abc
    //       data () {
    //         return {
    //           msg: 'Welcome to Your Vue.js A'
    //         }
    //       },

    //       props: {
    //         propA: Number,
    //       },
    //     }
    //   `,
    //   parserOptions,
    //   output: `
    //     export default {
    //       name: 'app',

    //       // abc
    //       data () {
    //         return {
    //           msg: 'Welcome to Your Vue.js A'
    //         }
    //       },

    //       props: {
    //         propA: Number,
    //       },
    //     }
    //   `,
    //   errors: [{
    //     message: 'Between the two property of component in vue must have a line of blank in 3.'
    //   }]
    // },
    // {
    //   options: ['always'],
    //   filename: 'test.vue',
    //   code: `
    //     export default {
    //       name: 'app',
    //       /**
    //        * @type {object}
    //        * @instance
    //        * @property {boolean} resize=true - 用于type=textarea时，控制是否可以改变编辑区域大小
    //        * @property {(string/number)} value - 用于数据双向绑定
    //        * @property {*} ...otherProps - 其他props会传递给iview input组件，CInput组件支持所有iview input组件的props。
    //        * @see [iview_input_props]{@link https://www.iviewui.com/components/input#Input_props}
    //        */
    //       data () {
    //         return {
    //           msg: 'Welcome to Your Vue.js '
    //         }
    //       },

    //       props: {
    //         propA: Number,
    //       },
    //     }
    //   `,
    //   parserOptions,
    //   output: `
    //     export default {
    //       name: 'app',

    //       /**
    //        * @type {object}
    //        * @instance
    //        * @property {boolean} resize=true - 用于type=textarea时，控制是否可以改变编辑区域大小
    //        * @property {(string/number)} value - 用于数据双向绑定
    //        * @property {*} ...otherProps - 其他props会传递给iview input组件，CInput组件支持所有iview input组件的props。
    //        * @see [iview_input_props]{@link https://www.iviewui.com/components/input#Input_props}
    //        */
    //       data () {
    //         return {
    //           msg: 'Welcome to Your Vue.js '
    //         }
    //       },

    //       props: {
    //         propA: Number,
    //       },
    //     }
    //   `,
    //   errors: [{
    //     message: `Between the two property of component in vue must have a line of blank in 3.`
    //   }]
    // },
    // {
    //   options: ['never'],
    //   filename: 'test.vue',
    //   code: `
    //     export default {
    //       name: 'app',

    //       async data () {
    //         return {
    //           msg: 'Welcome to Your Vue.js '
    //         }
    //       },
    //       props: {
    //         propA: Number,
    //       },
    //     }
    //   `,
    //   parserOptions,
    //   output: `
    //     export default {
    //       name: 'app',
    //       async data () {
    //         return {
    //           msg: 'Welcome to Your Vue.js '
    //         }
    //       },
    //       props: {
    //         propA: Number,
    //       },
    //     }
    //   `,
    //   errors: [{
    //     // message: `Between the two property of component in vue can't have a line of blank in 3.`
    //     message: `Between the two property of component in vue can't have a line of blank in 3.`
    //   }]
    // },
    // {
    //   options: ['never'],
    //   filename: 'test.vue',
    //   code: `
    //     export default {
    //       name: 'app',
    //       async data () {
    //         return {
    //           msg: 'Welcome to Your Vue.js '
    //         }
    //       },
    //       props: {
    //         propA: Number, // ab

    //         propB: Number, // abc
    //       },
    //     }
    //   `,
    //   parserOptions,
    //   output: `
    //     export default {
    //       name: 'app',
    //       async data () {
    //         return {
    //           msg: 'Welcome to Your Vue.js '
    //         }
    //       },
    //       props: {
    //         propA: Number, // ab
    //         propB: Number, // abc
    //       },
    //     }
    //   `,
    //   errors: [{
    //     // message: `Between the two property of component in vue can't have a line of blank in 3.`
    //     message: `Between the two property of component in vue can't have a line of blank in 10.`
    //   }]
    // }
  ]
})

