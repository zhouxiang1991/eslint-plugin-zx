module.exports = {
  extends: [
    require.resolve('./recommended')
  ],
  rules: {
    'zx/html-self-closing': 0,
    'zx/require-component-is': 0,
    'zx/no-template-shadow': 0,
    'zx/require-default-prop': 0,
    'zx/no-v-html': 0,

    // no layout rules
    'zx/object-curly-spacing': [2, 'always'],
    'zx/script-indent': 0,
    'zx/brace-style': 0,
    'zx/array-bracket-spacing': 1,
    'zx/arrow-spacing': 1,
    'zx/block-spacing': 1,
    'zx/comma-dangle': 1,
    'zx/dot-location': 1,
    'zx/html-closing-bracket-newline': 1,
    'zx/html-closing-bracket-spacing': 1,
    'zx/html-indent': 1,
    'zx/html-quotes': 1,
    'zx/key-spacing': 1,
    'zx/keyword-spacing': 1,
    'zx/max-attributes-per-line': 1,
    'zx/multiline-html-element-content-newline': 1,
    'zx/mustache-interpolation-spacing': 1,
    'zx/no-multi-spaces': 1,
    'zx/no-spaces-around-equal-signs-in-attribute': 1,
    'zx/singleline-html-element-content-newline': 1,
    'zx/space-infix-ops': 1,
    'zx/space-unary-ops': 1,
    'zx/eqeqeq': 2,
    'zx/no-side-effects-in-computed-properties': 0,
    'zx/require-render-return': 0,
    'zx/return-in-computed-property': 0,
    'zx/no-shared-component-data': 0,
    'zx/require-prop-type-constructor': 0,

    // custom
    'zx/component-name-hyphenation': [1, 'always'],
    'zx/space-line-in-components': [1, 'always'],
    'zx/space-line-in-template': [1, 'always'],
    'zx/comma-after-spacing': [1, 'always'],
    'zx/multiple-line-import-export': [1, 'always'],
    'zx/if-statement-style': [1, 'always'],
    'zx/space-line-after-brace': [1, 'always'],
    'zx/space-line-in-object': [0, 'always'], // 实际效果不好, 关闭
    'zx/no-unnecessary-await': [0, 'always'], // 去除
    'zx/space-line-after-declaration': [1, 'always'],
    'zx/pretty-condition': [0], // 在if表达式中回车不能自动调整缩进, 所以关闭

    // eslint for vue
    'zx/object-shorthand': [2, 'always'],
    'zx/prefer-template': 1,
    'zx/comma-spacing': [1, { 'before': false, 'after': true }],
    'zx/template-curly-spacing': 1,

    // eslint
    'array-bracket-spacing': 1,
    'object-shorthand': [2, 'always'],
    'prefer-const': 1,
    'no-useless-computed-key': 1,
    'template-curly-spacing': 1,
    'prefer-arrow-callback': 1,
    'no-var': 1,
    'comma-spacing': [2, { 'before': false, 'after': true }],
    'prefer-template': 1,
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }],
    'linebreak-style': [1, 'unix'],
    'lines-around-comment': [1, {
      'beforeBlockComment': true,
      'beforeLineComment': true,
      'allowBlockStart': true,
      'allowObjectStart': true,
      'allowArrayStart': true,
      'allowClassStart': true
    }],
    'jsx-quotes': 1,
    'keyword-spacing': 2,
    'new-cap': [2, { 'newIsCap': true, 'capIsNew': false }],
    'newline-before-return': 2,
    'no-mixed-spaces-and-tabs': 2,
    'operator-assignment': 1,
    'operator-linebreak': [1, 'after', { 'overrides': { '?': 'before', ':': 'before' }}],
    'array-bracket-newline': [
      1,
      {
        multiline: true,
        minItems: 2
      }
    ],
    'array-element-newline': [
      1,
      {
        multiline: true,
        minItems: 2
      }
    ],
    'object-curly-newline': [
      1,
      {
        ObjectExpression: {
          multiline: true,
          minProperties: 2
        }
      }
    ],
    'object-property-newline': [
      1,
      {
        allowAllPropertiesOnSameLine: false
      }
    ],
    'no-new': 0,
    'sort-imports': [
      1,
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        ignoreDeclarationSort: true
      }
    ],
    'comma-dangle': [1, {
      objects: 'always-multiline',
      arrays: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline'
    }],
    'brace-style': [
      1,
      '1tbs',
      {
        allowSingleLine: false
      }
    ],
    'arrow-parens': [
      1,
      'always'
    ],
    'newline-per-chained-call': [1],

    // import
    'import/newline-after-import': 1,
    'import/order': 1
  }
}
