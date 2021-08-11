import {
  LBracketParserNode,
  LParenParserNode,
  RBracketParserNode,
  RParenParserNode,
} from '../parser/node-types/symbols/scope'

test('left paren', () => {
  expect(LParenParserNode.test('(')).toBe(1)
  expect(LParenParserNode.test('(word')).toBe(1)
  expect(LParenParserNode.test(')')).toBeUndefined()
})

test('right paren', () => {
  expect(RParenParserNode.test('(')).toBeUndefined()
  expect(RParenParserNode.test(')')).toBe(1)
  expect(RParenParserNode.test(')word')).toBe(1)
})

test('left bracket', () => {
  expect(LBracketParserNode.test('[')).toBe(1)
  expect(LBracketParserNode.test('[word')).toBe(1)
  expect(LBracketParserNode.test(']')).toBeUndefined()
})

test('right bracket', () => {
  expect(RBracketParserNode.test('[')).toBeUndefined()
  expect(RBracketParserNode.test(']')).toBe(1)
  expect(RBracketParserNode.test(']word')).toBe(1)
})
