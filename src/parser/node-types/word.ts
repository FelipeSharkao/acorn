import { NodeType } from '@/Node'

import PatternNodeType from './lib/PatternNodeType'

export const wordNodeType = new PatternNodeType(
  'word',
  /^[a-zA-Z_$](-?[a-zA-Z0-9_$])*/
)

export const numberNodeType = new NodeType('number')

export const intNodeType = new PatternNodeType(
  'int',
  /^\d(_?\d)*(?!.)\b/
).inherit(numberNodeType)

export const decimalNodeType = new PatternNodeType(
  'decimal',
  /^(\d(_?\d)*)?\.\d+\b/
).inherit(numberNodeType)
