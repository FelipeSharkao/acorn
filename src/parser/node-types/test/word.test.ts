import { DecimalParserNode, IntParserNode, WordParserNode } from '../word'

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

test('int', () => {
  expect(IntParserNode.test('357.25')).toBe(3)
  expect(IntParserNode.test('32596721')).toBe(8)
  expect(IntParserNode.test('32_596_721')).toBe(10)
  expect(IntParserNode.test('word')).toBeUndefined()
})

test('decimal', () => {
  expect(DecimalParserNode.test('357')).toBeUndefined()
  expect(DecimalParserNode.test('357.25')).toBe(6)
  expect(DecimalParserNode.test('32_596.721')).toBe(10)
  expect(DecimalParserNode.test('word')).toBeUndefined()
})
