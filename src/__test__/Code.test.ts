import Code, { Line } from '../Code';

const str = 'First line\n\nThird line'
const lines: Line[] = [
  { str: 'First line', start: 0, end: 11 },
  { str: '', start: 11, end: 12 },
  { str: 'Third line', start: 12, end: 22 },
]

const code = new Code(str)

test('Code line parsing', () => {
  expect(code.str).toBe(str)
  expect(code.lines).toEqual(lines)
})

test('Code line navigation', () => {
  expect(code.lineAt(0)).toEqual([1, lines[0]])
  expect(code.lineAt(5)).toEqual([1, lines[0]])
  expect(code.lineAt(10)).toEqual([1, lines[0]])

  expect(code.lineAt(11)).toEqual([2, lines[1]])

  expect(code.lineAt(12)).toEqual([3, lines[2]])
  expect(code.lineAt(17)).toEqual([3, lines[2]])
  expect(code.lineAt(21)).toEqual([3, lines[2]])
  expect(code.lineAt(22)).toBeUndefined()

  expect(code.lineAt(str.length)).toBeUndefined()
})
