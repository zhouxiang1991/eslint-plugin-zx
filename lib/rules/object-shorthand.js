/**
 * @author zhouxiang1991
 */
'use strict'

const { wrapCoreRule } = require('../utils')

// eslint-disable-next-line no-invalid-meta
module.exports = wrapCoreRule(
  require('eslint/lib/rules/object-shorthand'),
  { skipDynamicArguments: true }
)
