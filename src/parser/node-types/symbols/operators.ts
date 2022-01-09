import { NodeType } from '@/Node'

import PatternNodeType from '../lib/PatternNodeType'

export const operatorNodeType = new NodeType('operator')

export const plusNodeType = new PatternNodeType('plus', '+').inherit(
  operatorNodeType
)

export const minusNodeType = new PatternNodeType('minus', '-').inherit(
  operatorNodeType
)

export const timesNodeType = new PatternNodeType('times', '*').inherit(
  operatorNodeType
)

export const dTimesNodeType = new PatternNodeType(
  'double-times',
  '**'
).inherit(operatorNodeType)

export const slashNodeType = new PatternNodeType('slash', '/').inherit(
  operatorNodeType
)

export const dSlashNodeType = new PatternNodeType(
  'double-slash',
  '//'
).inherit(operatorNodeType)
