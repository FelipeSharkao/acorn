import {
  lBracketNodeType, lParenNodeType, rBracketNodeType, rParenNodeType,
} from '../parser/node-types/symbols/scope';
import { expectNode, expectNoNode } from './util/node-types';

test('left paren', () => {
  expectNode(lParenNodeType, '(', 0, 1)
  expectNode(lParenNodeType, '(word', 0, 1)
  expectNoNode(lParenNodeType, ')', 0)
})

test('right paren', () => {
  expectNoNode(rParenNodeType, '(', 0)
  expectNode(rParenNodeType, ')', 0, 1)
  expectNode(rParenNodeType, ')word', 0, 1)
})

test('left bracket', () => {
  expectNode(lBracketNodeType, '[', 0, 1)
  expectNode(lBracketNodeType, '[word', 0, 1)
  expectNoNode(lBracketNodeType, ']', 0)
})

test('right bracket', () => {
  expectNoNode(rBracketNodeType, '[', 0)
  expectNode(rBracketNodeType, ']', 0, 1)
  expectNode(rBracketNodeType, ']word', 0, 1)
})
