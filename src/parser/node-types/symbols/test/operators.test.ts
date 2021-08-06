import {
  DSlashParserNode,
  DTimesParserNode,
  MinusParserNode,
  PlusParserNode,
  SlashParserNode,
  TimesParserNode,
} from '../operators'

test('plus', () => {
  expect(PlusParserNode.test('+')).toBe(1)
  expect(PlusParserNode.test('+word')).toBe(1)
  expect(PlusParserNode.test('-')).toBeUndefined()
  expect(PlusParserNode.test('*')).toBeUndefined()
  expect(PlusParserNode.test('/')).toBeUndefined()
})

test('minus', () => {
  expect(MinusParserNode.test('+')).toBeUndefined()
  expect(MinusParserNode.test('-')).toBe(1)
  expect(MinusParserNode.test('-word')).toBe(1)
  expect(MinusParserNode.test('*')).toBeUndefined()
  expect(MinusParserNode.test('/')).toBeUndefined()
})

test('times', () => {
  expect(TimesParserNode.test('+')).toBeUndefined()
  expect(TimesParserNode.test('-')).toBeUndefined()
  expect(TimesParserNode.test('*')).toBe(1)
  expect(TimesParserNode.test('*word')).toBe(1)
  expect(TimesParserNode.test('**')).toBe(1)
  expect(TimesParserNode.test('**word')).toBe(1)
  expect(TimesParserNode.test('/')).toBeUndefined()
})

test('double times', () => {
  expect(DTimesParserNode.test('+')).toBeUndefined()
  expect(DTimesParserNode.test('-')).toBeUndefined()
  expect(DTimesParserNode.test('*')).toBeUndefined()
  expect(DTimesParserNode.test('**')).toBe(2)
  expect(DTimesParserNode.test('**word')).toBe(2)
  expect(DTimesParserNode.test('/')).toBeUndefined()
})

test('slash', () => {
  expect(SlashParserNode.test('+')).toBeUndefined()
  expect(SlashParserNode.test('-')).toBeUndefined()
  expect(SlashParserNode.test('*')).toBeUndefined()
  expect(SlashParserNode.test('/')).toBe(1)
  expect(SlashParserNode.test('/word')).toBe(1)
  expect(SlashParserNode.test('//')).toBe(1)
  expect(SlashParserNode.test('//word')).toBe(1)
})

test('double slash', () => {
  expect(DSlashParserNode.test('+')).toBeUndefined()
  expect(DSlashParserNode.test('-')).toBeUndefined()
  expect(DSlashParserNode.test('*')).toBeUndefined()
  expect(DSlashParserNode.test('/')).toBeUndefined()
  expect(DSlashParserNode.test('//')).toBe(2)
  expect(DSlashParserNode.test('//word')).toBe(2)
})
