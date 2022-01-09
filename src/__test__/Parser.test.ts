import Code from '@/Code'
import Node from '@/Node'
import { plusNodeType } from '@/parser/node-types/symbols/operators'
import {
  lParenNodeType, rParenNodeType,
} from '@/parser/node-types/symbols/scope'
import { wordNodeType } from '@/parser/node-types/word'
import Parser from '@/parser/Parser'

function newParser(code: Code) {
  return new Parser(code, [
    lParenNodeType,
    rParenNodeType,
    plusNodeType,
    wordNodeType,
  ])
}

test('word list', () => {
  const code = new Code('foo bar\n\nqux nux\n')
  const parsedList = Array.from(newParser(code))

  expect(parsedList).toEqual([
    new Node(wordNodeType, { code, line: 1, col: 1 }, 3),
    new Node(wordNodeType, { code, line: 1, col: 5 }, 3),
    new Node(wordNodeType, { code, line: 3, col: 1 }, 3),
    new Node(wordNodeType, { code, line: 3, col: 5 }, 3),
  ])
})

test('operators', () => {
  const code = new Code('(foo bar)\n( qux (bar \n\n      +nux) )')
  const parsedList = Array.from(newParser(code))

  expect(parsedList).toEqual([
    new Node(lParenNodeType, { code, line: 1, col: 1 }, 1),
    new Node(wordNodeType, { code, line: 1, col: 2 }, 3),
    new Node(wordNodeType, { code, line: 1, col: 6 }, 3),
    new Node(rParenNodeType, { code, line: 1, col: 9 }, 1),
    new Node(lParenNodeType, { code, line: 2, col: 1 }, 1),
    new Node(wordNodeType, { code, line: 2, col: 3 }, 3),
    new Node(lParenNodeType, { code, line: 2, col: 7 }, 1),
    new Node(wordNodeType, { code, line: 2, col: 8 }, 3),
    new Node(plusNodeType, { code, line: 4, col: 7 }, 1),
    new Node(wordNodeType, { code, line: 4, col: 8 }, 3),
    new Node(rParenNodeType, { code, line: 4, col: 11 }, 1),
    new Node(rParenNodeType, { code, line: 4, col: 13 }, 1),
  ])
})
