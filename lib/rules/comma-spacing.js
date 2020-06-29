/**
 * @author zhouxiang1991
 */
'use strict'

const { wrapCoreRule } = require('../utils')

// eslint-disable-next-line
module.exports = wrapCoreRule(require('eslint/lib/rules/comma-spacing'),   { skipDynamicArguments: true })
