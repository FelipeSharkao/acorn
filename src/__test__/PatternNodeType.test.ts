import Code from '@/Code'
import Node, { NodeType } from '@/Node'
import PatternNodeType from '@/parser/node-types/lib/PatternNodeType'

test('simple string', () => {
  const foo = new PatternNodeType('foo', 'foo')

  const barBaz = new NodeType('bar-baz')
  const bar = new PatternNodeType('bar', 'bar').inherit(barBaz)
  const baz = new PatternNodeType('baz', 'baz').inherit(barBaz)

  const code = new Code('foo bar\nbaz')

  const fooNode = foo.apply(code, 0)
  const wrongFooNode = foo.apply(code, 4)
  expect(fooNode).toEqual(new Node(foo, { code, line: 1, col: 1 }, 3))
  expect(fooNode?.is(foo)).toBe(true)
  expect(wrongFooNode).toBeUndefined()

  const barNode = bar.apply(code, 4)
  const wrongBarNode = bar.apply(code, 0)
  expect(barNode).toEqual(new Node(bar, { code, line: 1, col: 5 }, 3))
  expect(barNode?.is(bar)).toBe(true)
  expect(barNode?.is(barBaz)).toBe(true)
  expect(wrongBarNode).toBeUndefined()

  const bazNode = baz.apply(code, 7)
  const wrongBazNode = baz.apply(code, 0)
  expect(bazNode).toEqual(new Node(baz, { code, line: 2, col: 1 }, 3))
  expect(bazNode?.is(baz)).toBe(true)
  expect(bazNode?.is(barBaz)).toBe(true)
  expect(wrongBazNode).toBeUndefined()
})

test('regex', () => {
  const word = new PatternNodeType('word', /(?!\d)\w+\b/)
  const number = new PatternNodeType('number', /\d+\b/)

  const code = new Code('foo bar\n123')

  const fooNode = word.apply(code, 0)
  const barNode = word.apply(code, 4)
  const wrongWordNode = word.apply(code, 9)
  expect(fooNode).toEqual(new Node(word, { code, line: 1, col: 1 }, 3))
  expect(barNode).toEqual(new Node(word, { code, line: 1, col: 5 }, 3))
  expect(fooNode?.is(word)).toBe(true)
  expect(barNode?.is(word)).toBe(true)
  expect(wrongWordNode).toBeUndefined()

  const numberNode = number.apply(code, 9)
  const wrongNumberNode = number.apply(code, 0)
  expect(numberNode).toEqual(new Node(number, { code, line: 2, col: 1 }, 3))
  expect(numberNode?.is(number)).toBe(true)
  expect(wrongNumberNode).toBeUndefined()
})

