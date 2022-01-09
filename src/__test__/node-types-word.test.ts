import {
  decimalNodeType, intNodeType, wordNodeType,
} from '@/parser/node-types/word'

import { expectNode, expectNoNode } from './util/node-types'

test('word', () => {
  expectNode(wordNodeType, 'word +', 0, 4)
  expectNode(wordNodeType, 'word_word', 0, 9)
  expectNode(wordNodeType, 'word_', 0, 5)
  expectNode(wordNodeType, '_word', 0, 5)
  expectNode(wordNodeType, 'word-word', 0, 9)
  expectNode(wordNodeType, 'word-', 0, 4)
  expectNoNode(wordNodeType, '-word', 0)
  expectNoNode(wordNodeType, '576 word', 0)
})

test('int', () => {
  expectNoNode(intNodeType, '357.25', 0)
  expectNode(intNodeType, '32596721', 0, 8)
  expectNode(intNodeType, '32_596_721', 0, 10)
  expectNoNode(intNodeType, 'word', 0)
})

test('decimal', () => {
  expectNoNode(decimalNodeType, '357', 0)
  expectNode(decimalNodeType, '357.25', 0, 6)
  expectNode(decimalNodeType, '32_596.721', 0, 10)
  expectNoNode(decimalNodeType, 'word', 0)
})
