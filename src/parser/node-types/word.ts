import { CodePosition } from '../../utils/CodePosition'
import ParserNode from './lib/ParserNode'

export class WordParserNode extends ParserNode {
  static pattern = /^[a-zA-Z_$](-?[a-zA-Z0-9_$])*/
}

export class NumberParserNode extends ParserNode {
  value: number

  constructor(text: string, position: CodePosition) {
    super(text, position)
    this.value = +this.text.replace(/_/g, '')
  }
}

export class IntParserNode extends NumberParserNode {
  static pattern = /^-?\d(_?\d)*/
}

export class DecimalParserNode extends NumberParserNode {
  static pattern = /^-?(\d(_?\d)*)?\.\d+/
}
