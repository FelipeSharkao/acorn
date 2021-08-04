export interface CodePosition {
  line: number
  col: number
}
export type CodePositionTuple = [number, number]
export type GenericCodePosition = CodePosition | CodePositionTuple

export function normalizeCodePosition(
  input: GenericCodePosition
): CodePosition {
  if (input instanceof Array) {
    const [line, col] = input
    return { line, col }
  }
  return { ...input }
}
