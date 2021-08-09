import {
  DSlashParserNode,
  DTimesParserNode,
  MinusParserNode,
  PlusParserNode,
  SlashParserNode,
  TimesParserNode,
} from './node-types/symbols/operators'
import {
  LBracketParserNode,
  LParenParserNode,
  RBracketParserNode,
  RParenParserNode,
} from './node-types/symbols/scope'

import { ParserNodeConstructor } from './node-types/lib/ParserNode'

const nodeTypeList: readonly ParserNodeConstructor[] = [
  LParenParserNode,
  RParenParserNode,
  LBracketParserNode,
  RBracketParserNode,
  PlusParserNode,
  MinusParserNode,
  DTimesParserNode,
  TimesParserNode,
  DSlashParserNode,
  SlashParserNode,
]

export default nodeTypeList
