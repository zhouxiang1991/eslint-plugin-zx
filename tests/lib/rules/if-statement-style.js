/**
 * @fileoverview enforce insert space line between two properties in components
 * @author zhouxiang1991
 */
'use strict'

const rule = require('../../../lib/rules/if-statement-style')
// console.log(rule)
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module'
}

ruleTester.run('if-statement-style', rule, {
  valid: [
    {
      parserOptions,
      code: `
if (
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' && 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
) {
}
      `
    }
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
  ],
  invalid: [
    // {
    //   options: ['always'],
    //   filename: 'test.vue',
    //   code: `
    //     if (a) console.log(1)
    //   `,
    //   parserOptions,
    //   output: `
    //     if (a) { console.log(1) }
    //   `,
    //   errors: [{
    //     message: 'expect brace.'
    //   }]
    // },
    // {
    //   options: ['always'],
    //   filename: 'test.vue',
    //   code: `
    //     if (a) console.log(1)
    //     else console.log(2)
    //   `,
    //   parserOptions,
    //   output: `
    //     if (a) { console.log(1) }
    //     else { console.log(2) }
    //   `,
    //   errors: [{
    //     message: 'expect brace.'
    //   }, {
    //     message: 'expect brace.'
    //   }]
    // },
    // {
    //   options: ['always'],
    //   filename: 'test.vue',
    //   code: `
    //     if (a) console.log(1)
    //     else { console.log(2) }
    //   `,
    //   parserOptions,
    //   output: `
    //     if (a) { console.log(1) }
    //     else { console.log(2) }
    //   `,
    //   errors: [{
    //     message: 'expect brace.'
    //   }]
    // },
    // {
    //   options: ['always'],
    //   filename: 'test.vue',
    //   code: `
    //   if ('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' && 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb') {}
    //   `,
    //   parserOptions,
    //   output: `
    //   if (\n'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' && 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'\n) {}
    //   `,
    //   errors: [{
    //     message: 'expect space line.'
    //   }]
    // }
    // {
    //   options: ['always'],
    //   filename: 'test.vue',
    //   code: `
    //     if (a) console.log(1)
    //     else if (b) console.log(2)
    //     else console.log(3)
    //   `,
    //   parserOptions,
    //   output: `
    //     if (a) { console.log(1) }
    //     else if (b) { console.log(2) }
    //     else { console.log(3) }
    //   `,
    //   errors: [{
    //     message: 'expect brace.'
    //   }, {
    //     message: 'expect brace.'
    //   }, {
    //     message: 'expect brace.'
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

