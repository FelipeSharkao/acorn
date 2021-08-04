import {
  CodePosition,
  GenericCodePosition,
  normalizeCodePosition,
} from '../../utils/CodePosition'

export interface ParserNodeConstructor {
  new (text: string, position: GenericCodePosition): ParserNode
  test(input: string): string | undefined
}

export default abstract class ParserNode {
  text: string
  position: CodePosition

  constructor(text: string, position: GenericCodePosition) {
    this.text = text
    this.position = normalizeCodePosition(position)
  }
}
