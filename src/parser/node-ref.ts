import {
  DSlashParserNode,
  DTimesParserNode,
  MinusParserNode,
  PlusParserNode,
  SlashParserNode,
  TimesParserNode,
} from './node-types/symbols/operators'
import {
  DecimalParserNode,
  IntParserNode,
  WordParserNode,
} from './node-types/word'
import {
  LBracketParserNode,
  LParenParserNode,
  RBracketParserNode,
  RParenParserNode,
} from './node-types/symbols/scope'

import { ParserNodeConstructor } from './node-types/lib/ParserNode'

const nodeTypeList: readonly ParserNodeConstructor[] = [
  WordParserNode,
  DecimalParserNode,
  IntParserNode,
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
