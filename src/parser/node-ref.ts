import ParserNodeType from './node-types/lib/ParserNodeType';
import {
  dSlashNodeType, dTimesNodeType, minusNodeType, plusNodeType, slashNodeType, timesNodeType,
} from './node-types/symbols/operators';
import {
  lBracketNodeType, lParenNodeType, rBracketNodeType, rParenNodeType,
} from './node-types/symbols/scope';
import { decimalNodeType, intNodeType, wordNodeType } from './node-types/word';

export function ignoreCharacters(input: string): number | undefined {
  const match = /^(\s+|;;((?!;;)(\n|.))*(;;|$)|;[^\n]+)/.exec(input)
  if (match?.length) return match[0].length
}

const nodeTypeList: readonly ParserNodeType[] = [
  decimalNodeType,
  intNodeType,
  lParenNodeType,
  rParenNodeType,
  lBracketNodeType,
  rBracketNodeType,
  plusNodeType,
  minusNodeType,
  dTimesNodeType,
  timesNodeType,
  dSlashNodeType,
  slashNodeType,
  wordNodeType,
]

export default nodeTypeList
