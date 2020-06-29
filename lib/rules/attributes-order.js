/**
 * @fileoverview enforce ordering of attributes
 * @author Erin Depew
 */
'use strict'
const utils = require('../utils')

const EXPRESSIONS_ORDER = {
  LITERAL: [
    'Literal'
  ],
  VARIABLE: [
    'ArrayExpression',
    'ObjectExpression',
    'Identifier',
    'MemberExpression',
    'TemplateLiteral'
  ],
  COMPUTE: [
    'BinaryExpression',
    'UpdateExpression',
    'UnaryExpression'
  ],
  COMPARE: [
    'LogicalExpression',
    'ConditionalExpression'
  ],
  ASSIGNMENT: [
    'AssignmentExpression'
  ],
  FUNCTION_CALL: [
    'CallExpression',
    'VFilterSequenceExpression'
  ],
  FUNCTION_DECLARATION: [
    'ArrowFunctionExpression',
    'FunctionExpression'
  ]
}

const ATTRS = {
  STYLE: [
    'CLASS_ATTRS_PROPS',
    'STYLE_ATTRS_PROPS'
  ],
  UNIQUE: [
    'ref',
    'key',
    'slot',
    'slot-scope'
  ].map(v => v + '_ATTRS_UNIQUE'),
  OTHER_PROPS: ['ATTRS_OTHER_PROPS'],
  GLOBAL: [
    'id'
  ].map(v => v + '_ATTRS_GLOBAL'),
  DEFINITION: [
    'is'
  ].map(v => v + '_ATTRS_DEFINITION')
}

const DIRECTIVES = {
  CONDITIONALS: [
    'if',
    'else-if',
    'else',
    'show',
    'cloak'
  ].map(v => v + '_DIRECTIVES_CONDITIONALS'),
  STYLE: [
    'CLASS_DIRECTIVES_PROPS',
    'STYLE_DIRECTIVES_PROPS'
  ],
  UNIQUE_PROPS: [
    'ref',
    'key',
    'slot',
    'slot-scope'
  ].map(v => v + '_DIRECTIVES_UNIQUE_PROPS'),
  OTHER_PROPS: Object.keys(EXPRESSIONS_ORDER).map(v => v + '_DIRECTIVES_OTHER_PORPS'),
  GLOBAL_PROPS: [
    'id'
  ].map(v => v + '_DIRECTIVES_GLOBAL_PROPS'),
  DEFINITION_PROPS: [
    'is'
  ].map(v => v + '_DIRECTIVES_DEFINITION_PROPS'),
  RENDER_MODIFIERS: [
    'pre',
    'once'
  ].map(v => v + '_DIRECTIVES_RENDER_MODIFIERS'),
  LIST_RENDERING: [
    'for'
  ].map(v => v + '_DIRECTIVES_LIST_RENDERING'),
  TWO_WAY_BINDING: [
    'model'
  ].map(v => v + '_DIRECTIVES_TWO_WAY_BINDING'),
  EVENTS: [
    'on'
  ].map(v => v + '_DIRECTIVES_EVENTS'),
  CONTENT: [
    'html',
    'text'
  ].map(v => v + '_DIRECTIVES_CONTENT'),
  BIND: [
    'DIRECTIVES_BIND'
  ],
  ON: [
    'DIRECTIVES_ON'
  ],
  OTHER: [
    'DIRECTIVES_OTHER'
  ]
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
function getValueType (attribute, suffix) {
  const type = attribute && attribute.value && attribute.value.expression && attribute.value.expression.type
  // console.log(type)
  if (type) {
    for (const key in EXPRESSIONS_ORDER) {
      if (EXPRESSIONS_ORDER.hasOwnProperty(key)) {
        const array = EXPRESSIONS_ORDER[key]
        if (array.includes(type)) {
          return key + suffix
        }
      }
    }
  }
}

function getType (name, type) {
  const types = type === 'ATTRS' ? ATTRS : DIRECTIVES
  for (const key in types) {
    if (types.hasOwnProperty(key)) {
      const item = types[key]
      const _name = name + '_' + type + '_' + key
      if (item.includes(_name)) {
        // console.log(item, _name, '333333333333333333')
        return _name
      }
    }
  }

  return ''
}

function getAttributeType (attribute, sourceCode) {
  const isDirective = attribute.directive
  const directiveName = attribute.key.name.name
  const directiveArgument = attribute.key.argument && attribute.key.argument.name
  const attrsName = attribute.key.name
  // console.log('isDirective', isDirective)
  // if (!isDirective) {
  //   console.log('attrsName', attrsName)
  // } else {
  //   console.log('directiveArgument', directiveArgument)
  //   console.log('directiveName', directiveName)
  // }

  if (isDirective) {
    const isBind = directiveName === 'bind'
    const isOn = directiveName === 'on'

    // v-bind和v-on当作普通指令
    if (!directiveArgument) {
      if (isOn) return 'DIRECTIVES_ON'
      if (isBind) return 'DIRECTIVES_BIND'
    }

    const type = getType(directiveName, 'DIRECTIVES')
    if (type) {
      return type
    }

    if (isBind) {
      if (directiveArgument === 'style') {
        return 'STYLE_DIRECTIVES_PROPS'
      }

      if (directiveArgument === 'class') {
        return 'CLASS_DIRECTIVES_PROPS'
      }

      let name = directiveArgument + '_DIRECTIVES_UNIQUE_PROPS'
      if (DIRECTIVES.UNIQUE_PROPS.includes(name)) {
        return name
      }

      name = directiveArgument + '_DIRECTIVES_GLOBAL_PROPS'
      if (DIRECTIVES.GLOBAL_PROPS.includes(name)) {
        return name
      }

      name = directiveArgument + '_DIRECTIVES_DEFINITION_PROPS'
      if (DIRECTIVES.DEFINITION_PROPS.includes(name)) {
        return name
      }

      if (directiveName === 'slot') {
        return 'slot_DIRECTIVES_UNIQUE_PROPS'
      }

      const type = getValueType(attribute, '_DIRECTIVES_OTHER_PORPS')
      if (type) {
        return type
      }
    }

    return 'DIRECTIVES_OTHER'

    // console.log(directiveName, '111111')

    // if (directiveName === 'for') {
    //   return directiveName + '_LIST_RENDERING'
    // } else if (directiveName === 'if' || directiveName === 'else-if' || directiveName === 'else' || directiveName === 'show' || directiveName === 'cloak') {
    //   return directiveName + '_CONDITIONALS'
    // } else if (directiveName === 'pre' || directiveName === 'once') {
    //   return directiveName + '_RENDER_MODIFIERS'
    // } else if (directiveName === 'model') {
    //   return directiveName + '_TWO_WAY_BINDING'
    // } else if (directiveName === 'on') {
    //   return directiveName + '_EVENTS'
    // } else if (directiveName === 'html' || directiveName === 'text') {
    //   return directiveName + '_CONDITIONALS'
    // } else if (directiveName === 'slot') {
    //   return directiveName + '_UNIQUE'
    // } else {
    //   return 'DIRECTIVES_OTHER'
    // }
  } else {
    const type = getType(attrsName, 'ATTRS')
    if (type) {
      return type
    }

    if (attrsName === 'style') {
      return 'STYLE_ATTRS_PROPS'
    } else if (attrsName === 'class') {
      return 'CLASS_ATTRS_PROPS'
    }

    return 'ATTRS_OTHER_PROPS'
  }

  // if (attribute.directive && !isBind) {
  //   if (name === 'for') {
  //     return name + '_LIST_RENDERING'
  //   } else if (name === 'if' || name === 'else-if' || name === 'else' || name === 'show' || name === 'cloak') {
  //     return name + '_CONDITIONALS'
  //   } else if (name === 'pre' || name === 'once') {
  //     return name + '_RENDER_MODIFIERS'
  //   } else if (name === 'model') {
  //     return name + '_TWO_WAY_BINDING'
  //   } else if (name === 'on') {
  //     return name + '_EVENTS'
  //   } else if (name === 'html' || name === 'text') {
  //     return name + '_CONDITIONALS'
  //   } else if (name === 'slot') {
  //     return name + '_UNIQUE'
  //   } else {
  //     return 'DIRECTIVES_OTHER'
  //   }
  // } else {
  // if (name === 'is') {
  //   return name + '_DEFINITION'
  // } else if (name === 'id') {
  //   return name + '_GLOBAL'
  // } else if (name === 'ref' || name === 'key' || name === 'slot' || name === 'slot-scope') {
  //   return name + '_UNIQUE'
  // } else if (name === 'style') {
  //   return 'STYLE'
  // } else if (name === 'class') {
  //   return 'CLASS'
  // } else if (isBind) {
  //   const type = getValueType(attribute, '_PROPS')
  //   return type
  // } else {
  //   const type = getValueType(attribute, '_ATTRS')
  //   return type
  // }
  // }
}

function getStringLevel (str = '') {
  let level = 0
  for (let index = 0; index < str.length; index++) {
    const char = str[index]
    // console.log(char)
    const ascCode = char.charCodeAt(0)
    level += ascCode
  }
  return level / 1000
}

function getPosition (attribute, attributePosition, sourceCode) {
  // console.log(attribute)
  const attributeType = getAttributeType(attribute, sourceCode)
  const attributeText = (sourceCode.getText(attribute) || '')
  // console.log('text', attributeText)
  // console.log(attributeType, '222222222222222')
  let position = attributePosition.hasOwnProperty(attributeType) ? attributePosition[attributeType] : -1
  // console.log('position', position)
  // position += attributeText.length * 100
  // console.log('length', attributeText.length)
  const level = getStringLevel(attributeText)
  // console.log('level', level)
  position += level
  // console.log(attributeText, '=====>', position, attributeType)
  return position
}

function create (context) {
  const sourceCode = context.getSourceCode()
  let attributeOrder = [
    ...ATTRS.DEFINITION,
    ...DIRECTIVES.DEFINITION_PROPS,
    ...DIRECTIVES.LIST_RENDERING,
    ...DIRECTIVES.CONDITIONALS,
    ...DIRECTIVES.RENDER_MODIFIERS,
    ATTRS.UNIQUE[0],
    DIRECTIVES.UNIQUE_PROPS[0],
    ATTRS.UNIQUE[1],
    DIRECTIVES.UNIQUE_PROPS[1],
    ATTRS.UNIQUE[2],
    DIRECTIVES.UNIQUE_PROPS[2],
    ATTRS.UNIQUE[3],
    DIRECTIVES.UNIQUE_PROPS[3],
    ...ATTRS.GLOBAL,
    ...DIRECTIVES.GLOBAL_PROPS,
    ATTRS.STYLE[0],
    DIRECTIVES.STYLE[0],
    ATTRS.STYLE[1],
    DIRECTIVES.STYLE[1],
    ...DIRECTIVES.TWO_WAY_BINDING,
    ...DIRECTIVES.BIND,
    ...DIRECTIVES.ON,
    ...DIRECTIVES.OTHER,
    ...ATTRS.OTHER_PROPS,
    ...DIRECTIVES.OTHER_PROPS,
    ...DIRECTIVES.EVENTS,
    ...DIRECTIVES.CONTENT
  ]
  // console.log(attributeOrder)
  if (context.options[0] && context.options[0].order) {
    attributeOrder = context.options[0].order
  }
  const attributePosition = {}
  attributeOrder.forEach((item, i) => {
    if (item instanceof Array) {
      item.forEach((attr) => {
        attributePosition[attr] = i * 5000
      })
    } else attributePosition[item] = i * 5000
  })
  let currentPosition
  let previousNode

  function reportIssue (node, previousNode) {
    const currentNode = sourceCode.getText(node.key)
    const prevNode = sourceCode.getText(previousNode.key)
    context.report({
      node: node.key,
      loc: node.loc,
      message: `Attribute "${currentNode}" should go before "${prevNode}".`,
      data: {
        currentNode
      },

      fix (fixer) {
        const attributes = node.parent.attributes
        const shiftAttrs = attributes.slice(attributes.indexOf(previousNode), attributes.indexOf(node) + 1)

        return shiftAttrs.map((attr, i) => {
          const text = attr === previousNode ? sourceCode.getText(node) : sourceCode.getText(shiftAttrs[i - 1])
          return fixer.replaceText(attr, text)
        })
      }
    })
  }

  return utils.defineTemplateBodyVisitor(context, {
    'VStartTag' (node) {
      currentPosition = -1
      previousNode = null
    },
    'VAttribute' (node) {
      if ((currentPosition === -1) || (currentPosition <= getPosition(node, attributePosition, sourceCode))) {
        currentPosition = getPosition(node, attributePosition, sourceCode)
        previousNode = node
      } else {
        reportIssue(node, previousNode)
      }
    }
  })
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce order of attributes',
      category: 'recommended',
      url: 'https://eslint.vuejs.org/rules/attributes-order.html'
    },
    fixable: 'code',
    schema: {
      type: 'array',
      properties: {
        order: {
          items: {
            type: 'string'
          },
          maxItems: 10,
          minItems: 10
        }
      }
    }
  },
  create
}
