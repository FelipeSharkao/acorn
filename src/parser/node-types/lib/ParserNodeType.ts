import Code from '../../../Code';
import Node, { NodeType } from '../../../Node';

export default abstract class ParserNodeType extends NodeType {
  constructor(name: string) {
    super(name)
  }

  abstract apply(code: Code, at: number): Node | undefined
}
