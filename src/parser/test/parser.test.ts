import {
  LParenParserNode,
  RParenParserNode,
} from '../node-types/symbols/scope'

import Code from '../../Code'
import Parser from '../Parser'
import { PlusParserNode } from '../node-types/symbols/operators'
import { WordParserNode } from '../node-types/word'

function newParser(code: Code) {
  return new Parser(code, [
    LParenParserNode,
    RParenParserNode,
    PlusParserNode,
    WordParserNode,
  ])
}

test('word list', () => {
  const code = new Code('foo bar\n\nqux nux\n')
  const parsedList = Array.from(newParser(code))

  expect(parsedList).toEqual([
    new WordParserNode('foo', { code, line: 1, col: 1 }),
    new WordParserNode('bar', { code, line: 1, col: 5 }),
    new WordParserNode('qux', { code, line: 3, col: 1 }),
    new WordParserNode('nux', { code, line: 3, col: 5 }),
  ])
})

test('operators', () => {
  const code = new Code('(foo bar)\n( qux (bar \n\n      +nux) )')
  const parsedList = Array.from(newParser(code))

  expect(parsedList).toEqual([
    new LParenParserNode('(', { code, line: 1, col: 1 }),
    new WordParserNode('foo', { code, line: 1, col: 2 }),
    new WordParserNode('bar', { code, line: 1, col: 6 }),
    new RParenParserNode(')', { code, line: 1, col: 9 }),
    new LParenParserNode('(', { code, line: 2, col: 1 }),
    new WordParserNode('qux', { code, line: 2, col: 3 }),
    new LParenParserNode('(', { code, line: 2, col: 7 }),
    new WordParserNode('bar', { code, line: 2, col: 8 }),
    new PlusParserNode('+', { code, line: 4, col: 7 }),
    new WordParserNode('nux', { code, line: 4, col: 8 }),
    new RParenParserNode(')', { code, line: 4, col: 11 }),
    new RParenParserNode(')', { code, line: 4, col: 13 }),
  ])
})
