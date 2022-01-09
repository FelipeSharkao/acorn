import CodePosition from '@/utils/CodePosition'

export class NodeType {
  protected _inherits?: NodeType

  constructor(readonly name: string) {}

  inherit(inheritsNode: NodeType): this {
    this._inherits = inheritsNode
    return this
  }

  get inherits(): NodeType | undefined {
    return this._inherits
  }
}

export default class Node {
  constructor(
    readonly type: NodeType,
    readonly position: CodePosition,
    readonly length: number
  ) {}

  is(type: NodeType): boolean {
    let ref = this.type as NodeType | undefined
    while (ref) {
      if (ref === type) return true
      ref = ref.inherits
    }
    return false
  }

  toString(): string {
    return `${this.type.name}(${JSON.stringify(this.position.code.str)})`
  }
}
