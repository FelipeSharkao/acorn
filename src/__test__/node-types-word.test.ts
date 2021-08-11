import {
  DecimalParserNode,
  IntParserNode,
  WordParserNode,
} from '../parser/node-types/word'

import Code from '../Code'

test('word', () => {
  expect(WordParserNode.test('word +')).toBe(4)
  expect(WordParserNode.test('word_word')).toBe(9)
  expect(WordParserNode.test('word_')).toBe(5)
  expect(WordParserNode.test('_word')).toBe(5)
  expect(WordParserNode.test('word-word')).toBe(9)
  expect(WordParserNode.test('word-')).toBe(4)
  expect(WordParserNode.test('-word')).toBeUndefined()
  expect(WordParserNode.test('576 word')).toBeUndefined()
})

function mock(text: string) {
  return [text, { line: 1, col: 1, code: new Code(text) }] as const
}

test('int', () => {
  expect(IntParserNode.test('357.25')).toBe(3)
  expect(new IntParserNode(...mock('357')).value).toBe(357)
  expect(IntParserNode.test('32596721')).toBe(8)
  expect(new IntParserNode(...mock('32596721')).value).toBe(32596721)
  expect(IntParserNode.test('32_596_721')).toBe(10)
  expect(new IntParserNode(...mock('32_596_721')).value).toBe(32596721)
  expect(new IntParserNode(...mock('-357')).value).toBe(-357)
  expect(IntParserNode.test('word')).toBeUndefined()
})

test('decimal', () => {
  expect(DecimalParserNode.test('357')).toBeUndefined()
  expect(DecimalParserNode.test('357.25')).toBe(6)
  expect(new DecimalParserNode(...mock('357.25')).value).toBe(357.25)
  expect(DecimalParserNode.test('32_596.721')).toBe(10)
  expect(new DecimalParserNode(...mock('32_596.721')).value).toBe(32596.721)
  expect(new DecimalParserNode(...mock('-357')).value).toBe(-357)
  expect(new DecimalParserNode(...mock('.25')).value).toBe(0.25)
  expect(new DecimalParserNode(...mock('-.25')).value).toBe(-0.25)
  expect(DecimalParserNode.test('word')).toBeUndefined()
})
