import { NodeType } from '../../../Node';
import PatternNodeType from '../lib/PatternNodeType';

export const scopeNodeType = new NodeType('scope')

export const lParenNodeType = new PatternNodeType('l-paren', '(').inherit(
  scopeNodeType
)

export const rParenNodeType = new PatternNodeType('r-paren', ')').inherit(
  scopeNodeType
)

export const lBracketNodeType = new PatternNodeType('l-bracket', '[').inherit(
  scopeNodeType
)

export const rBracketNodeType = new PatternNodeType('r-bracket', ']').inherit(
  scopeNodeType
)
