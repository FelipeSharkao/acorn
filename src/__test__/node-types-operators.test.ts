import {
  dSlashNodeType, dTimesNodeType, minusNodeType, plusNodeType, slashNodeType, timesNodeType,
} from '../parser/node-types/symbols/operators';
import { expectNode, expectNoNode } from './util/node-types';

test('plus', () => {
  expectNode(plusNodeType, '+', 0, 1)
  expectNode(plusNodeType, '+word', 0, 1)
  expectNoNode(plusNodeType, '-', 0)
  expectNoNode(plusNodeType, '*', 0)
  expectNoNode(plusNodeType, '/', 0)
})

test('minus', () => {
  expectNoNode(minusNodeType, '+', 0)
  expectNode(minusNodeType, '-', 0, 1)
  expectNode(minusNodeType, '-word', 0, 1)
  expectNoNode(minusNodeType, '*', 0)
  expectNoNode(minusNodeType, '/', 0)
})

test('times', () => {
  expectNoNode(timesNodeType, '+', 0)
  expectNoNode(timesNodeType, '-', 0)
  expectNode(timesNodeType, '*', 0, 1)
  expectNode(timesNodeType, '*word', 0, 1)
  expectNode(timesNodeType, '**', 0, 1)
  expectNode(timesNodeType, '**word', 0, 1)
  expectNoNode(timesNodeType, '/', 0)
})

test('double times', () => {
  expectNoNode(dTimesNodeType, '+', 0)
  expectNoNode(dTimesNodeType, '-', 0)
  expectNoNode(dTimesNodeType, '*', 0)
  expectNode(dTimesNodeType, '**', 0, 2)
  expectNode(dTimesNodeType, '**word', 0, 2)
  expectNoNode(dTimesNodeType, '/', 0)
})

test('slash', () => {
  expectNoNode(slashNodeType, '+', 0)
  expectNoNode(slashNodeType, '-', 0)
  expectNoNode(slashNodeType, '*', 0)
  expectNode(slashNodeType, '/', 0, 1)
  expectNode(slashNodeType, '/word', 0, 1)
  expectNode(slashNodeType, '//', 0, 1)
  expectNode(slashNodeType, '//word', 0, 1)
})

test('double slash', () => {
  expectNoNode(dSlashNodeType, '+', 0)
  expectNoNode(dSlashNodeType, '-', 0)
  expectNoNode(dSlashNodeType, '*', 0)
  expectNoNode(dSlashNodeType, '/', 0)
  expectNode(dSlashNodeType, '//', 0, 2)
  expectNode(dSlashNodeType, '//word', 0, 2)
})
