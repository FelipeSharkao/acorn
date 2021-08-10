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

export function ignoreCharacters(input: string): number | undefined {
  const match = /^(\s+|;;((?!;;)(\n|.))*(;;|$)|;[^\n]+)/.exec(input)
  if (match?.length) return match[0].length
}

const nodeTypeList: readonly ParserNodeConstructor[] = [
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
  WordParserNode,
]

export default nodeTypeList
