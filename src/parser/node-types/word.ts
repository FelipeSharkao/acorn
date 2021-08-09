import ParserNode from './lib/ParserNode'

export class WordParserNode extends ParserNode {
  static pattern = /^[a-zA-Z_$](-?[a-zA-Z0-9_$])*/
}

export class IntParserNode extends ParserNode {
  static pattern = /^\d(_?\d)*/
}

export class DecimalParserNode extends ParserNode {
  static pattern = /^(\d(_?\d)*)?\.\d+/
}
