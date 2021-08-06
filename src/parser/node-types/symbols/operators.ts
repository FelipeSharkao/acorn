import ParserNode from '../ParserNode'

export class OperatorParserNode extends ParserNode {}

export class PlusParserNode extends OperatorParserNode {
  static pattern = '+'
}

export class MinusParserNode extends OperatorParserNode {
  static pattern = '-'
}

export class TimesParserNode extends OperatorParserNode {
  static pattern = '*'
}

export class DTimesParserNode extends OperatorParserNode {
  static pattern = '**'
}

export class SlashParserNode extends OperatorParserNode {
  static pattern = '/'
}

export class DSlashParserNode extends OperatorParserNode {
  static pattern = '//'
}