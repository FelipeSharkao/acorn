import ParserNode from '../lib/ParserNode'

export class ScopeParserNode extends ParserNode {}

export class LParenParserNode extends ScopeParserNode {
  static pattern = '('
}

export class RParenParserNode extends ScopeParserNode {
  static pattern = ')'
}

export class LBracketParserNode extends ScopeParserNode {
  static pattern = '['
}

export class RBracketParserNode extends ScopeParserNode {
  static pattern = ']'
}
