import Code from '../../../Code';
import Node from '../../../Node';
import CodePosition from '../../../utils/CodePosition';
import ParserNodeType from './ParserNodeType';

export default class PatternNodeType extends ParserNodeType {
  constructor(name: string, readonly pattern: string | RegExp) {
    super(name)
  }

  apply(code: Code, at: number): Node | undefined {
    const str = code.str.slice(at)
    const lineResult = code.lineAt(at)
    if (lineResult == null) return undefined

    const position: CodePosition = {
      code,
      line: lineResult[0],
      col: at - lineResult[1].start + 1,
    }

    if (typeof this.pattern == 'string') {
      if (str.startsWith(this.pattern))
        return new Node(this, position, this.pattern.length)
    } else {
      const matchList = new RegExp(
        this.pattern.source,
        this.pattern.flags.replace('g', '')
      ).exec(str)
      if (matchList && matchList.length)
        return new Node(this, position, matchList[0].length)
    }
  }
}
