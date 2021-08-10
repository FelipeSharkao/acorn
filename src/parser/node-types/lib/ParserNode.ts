import { CodePosition } from '../../../utils/CodePosition'

export default class ParserNode {
  text: string
  position: CodePosition

  constructor(text: string, position: CodePosition) {
    this.text = text
    this.position = position
  }

  static test(input: string): number | undefined {
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

  static pattern?: string | RegExp

  toString(): string {
    return `${this.constructor.name}(${JSON.stringify(this.text)})`
  }
}
