import ParserNode, { ParserNodeConstructor } from './node-types/lib/ParserNode'
import nodeTypeList, { ignoreCharacters } from './node-ref'

import Code from '../Code'
import { CodePosition } from '../utils/CodePosition'
import RuntimeError from '../utils/RuntimeError'

export default class Parser implements Iterable<ParserNode> {
  readonly code: Code
  protected typeList: readonly ParserNodeConstructor[]

  constructor(code: Code, typeList = nodeTypeList) {
    this.code = code
    this.typeList = typeList
  }

  [Symbol.iterator](): IterableIterator<ParserNode> {
    return new ParserIterator(this)
  }

  iter(): IterableIterator<ParserNode> {
    return this[Symbol.iterator]()
  }
}

export class ParserIterator implements IterableIterator<ParserNode> {
  protected cursor = 0
  protected position: CodePosition
  readonly ref: Parser

  constructor(ref: Parser) {
    this.ref = ref
    this.position = { line: 1, col: 1, code: this.ref.code }
  }

  [Symbol.iterator](): IterableIterator<ParserNode> {
    return this
  }

  protected moveCursor(characters: number): void {
    const prevCursor = this.cursor
    this.cursor += characters
    const lnCount = this.ref.code.str
      .slice(prevCursor, this.cursor)
      .split('\n').length

    this.position.line += lnCount - 1
    if (lnCount == 1) this.position.col += characters
    else
      this.position.col =
        this.cursor - (this.ref.code.lineAt(this.cursor)?.start ?? 0) + 1
  }

  next(): IteratorResult<ParserNode, undefined> {
    let str: string, skipChar: number | undefined
    do {
      str = this.ref.code.str.slice(this.cursor)
      skipChar = str ? ignoreCharacters(str) : 0
      if (skipChar) this.moveCursor(skipChar)
    } while (skipChar)

    if (this.cursor >= this.ref.code.str.length)
      return { done: true, value: undefined }

    for (const NodeType of nodeTypeList) {
      const matchLen = NodeType.test(str)

      if (matchLen != null) {
        const matchStr = str.slice(0, matchLen)
        const position = { ...this.position }

        this.moveCursor(matchLen)

        return {
          done: false,
          value: new NodeType(matchStr, position),
        }
      }
    }
    const char = this.ref.code.str[this.cursor]
    const line = this.ref.code.lineAt(this.cursor)

    if (line) {
      // FIXME: Adicionar filename
      throw new RuntimeError(
        `Unexpected character: '${char}' (U+${char
          .charCodeAt(0)
          .toString(16)})`,
        'inline',
        line.str,
        this.position
      )
    } else {
      throw new Error(
        `Line of character ${this.cursor} not found in ${this.ref.code}`
      )
    }
  }
}
