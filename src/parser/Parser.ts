import Code from '../Code';
import Node from '../Node';
import CodePosition from '../utils/CodePosition';
import RuntimeError from '../utils/RuntimeError';
import nodeTypeList, { ignoreCharacters } from './node-ref';

export default class Parser implements Iterable<Node> {
  constructor(readonly code: Code, protected typeList = nodeTypeList) {}

  [Symbol.iterator](): IterableIterator<Node> {
    return new ParserIterator(this)
  }

  iter(): IterableIterator<Node> {
    return this[Symbol.iterator]()
  }

  toString(): string {
    return `${this.constructor.name}(${this.code})`
  }
}

export class ParserIterator implements IterableIterator<Node> {
  protected cursor = 0
  protected position: CodePosition

  constructor(readonly ref: Parser) {
    this.ref = ref
    this.position = { code: this.ref.code, line: 1, col: 1 }
  }

  [Symbol.iterator](): IterableIterator<Node> {
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
        this.cursor - (this.ref.code.lineAt(this.cursor)?.[1].start ?? 0) + 1
  }

  next(): IteratorResult<Node, undefined> {
    let str: string, skipChar: number | undefined
    do {
      str = this.ref.code.str.slice(this.cursor)
      skipChar = str ? ignoreCharacters(str) : 0
      if (skipChar) this.moveCursor(skipChar)
    } while (skipChar)

    if (this.cursor >= this.ref.code.str.length)
      return { done: true, value: undefined }

    for (const type of nodeTypeList) {
      const match = type.apply(this.ref.code, this.cursor)

      if (match != null) {
        this.moveCursor(match.length)

        return {
          done: false,
          value: match,
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
        line[1].str,
        this.position
      )
    } else {
      throw new Error(
        `Line of character ${this.cursor} not found in ${this.ref.code}`
      )
    }
  }

  toString(): string {
    return `${this.ref}:${this.position.line}:${this.position.col}`
  }
}
