import {
  DSlashParserNode,
  DTimesParserNode,
  MinusParserNode,
  PlusParserNode,
  SlashParserNode,
  TimesParserNode,
} from './symbols/operators'
import {
  LBracketParserNode,
  LParenParserNode,
  RBracketParserNode,
  RParenParserNode,
} from './symbols/scope'

import { ParserNodeConstructor } from './ParserNode'

const nodeTypeList: ReadonlyArray<ParserNodeConstructor> = [
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
