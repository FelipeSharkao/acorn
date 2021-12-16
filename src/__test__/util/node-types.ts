import Code from '../../Code';
import Node from '../../Node';
import ParserNodeType from '../../parser/node-types/lib/ParserNodeType';

export function expectNode(
  type: ParserNodeType,
  input: string,
  at: number,
  length: number
): void {
  const code = new Code(input)
  const line = code.lineAt(at)
  if (line == null)
    throw new Error(`line not found at ${at} for "${input}"`)
  expect(type.apply(code, at)).toEqual(
    new Node(
      type,
      { code, line: line[0], col: at - line[1].start + 1 },
      length
    )
  )
}
export function expectNoNode(
  type: ParserNodeType,
  input: string,
  at: number
): void {
  const code = new Code(input)
  expect(type.apply(code, at)).toBeUndefined()
}
