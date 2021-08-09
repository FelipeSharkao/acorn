import { CodePosition } from '../../../utils/CodePosition'

export type ParserNodeConstructor = {
  new (text: string, position: CodePosition): ParserNode
  test(this: ParserNodeConstructor, input: string): number | undefined
  pattern?: string | RegExp
}

export default abstract class ParserNode {
  text: string
  position: CodePosition

  constructor(text: string, position: CodePosition) {
    this.text = text
    this.position = position
  }

  static test(this: ParserNodeConstructor, input: string): number | undefined {
    if (this.pattern == null)
      throw Error(
        `${this.name}.pattern in undefined, either define it or overwrite ${this.name}.test.`
      )

    if (typeof this.pattern == 'string') {
      if (input.startsWith(this.pattern)) return this.pattern.length
    } else {
      const matchList = new RegExp(
        this.pattern.source,
        this.pattern.flags.replace('g', '')
      ).exec(input)
      if (matchList && matchList.length) return matchList[0].length
    }
  }

  pattern?: string | RegExp
}
