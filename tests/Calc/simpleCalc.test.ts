//@ts-nocheck
import {ParseError, parseExpr} from "./gen/CalcParser";
import {generateListString, generateListStringWithBrackets} from "../testGenerator";

function t(s: string): number {
  let {val} = parseExpr(s)
  return +val
}

const e = (s: string | number) => +eval(s + '')

function log(x: number, y: number): number {
  return Math.log(y) / Math.log(x);
}

const test = (s) =>    it(s, () => expect(t(s)).toEqual(e(s)));

let s: string = ''

describe('simple calc tests', () => {
  describe('unar tests', () => {
    test('1')
    test('1000')
    test('1001230')
  });
  describe('whitespaces tests', () => {
    test('1  ')
    test('1+1')
    test('1      +1\n\n')
    test('1      /1\n\n')
    test('1*     \n1')
    test('       1   \n +1')
    test('1      +1  +2\n ')
  });
  describe('associative tests', () => {
    test("1-2-3")
    test("1-2-3-4-5")
    test("6/3/2")
    test("6/3/2*2")
  });
  describe('small brackets tests', () => {
    test("(1)")
    test("(1+1)")
    test("1+1+(2)")
    test("3*(1+1)")
    test("0*0*(1)")
    test("6/3/2*2")
  });
  describe('small unary sub tests', () => {
    it(s, () => expect(t("-1")).toEqual(e(-1)));
    it(s, () => expect(t("--1")).toEqual(1));
    it(s, () => expect(t("-1/0")).toEqual(-Infinity));
    it(s, () => expect(t("-1- -1")).toEqual(0));
    it(s, () => expect(t("-1/-0")).toEqual(Infinity));
    it(s, () => expect(t("-1+1--1")).toEqual(1));
  });
  describe('small random tests', () => {
    test("1+23/4*5")
    test("1/0")
    test("0/1")
    test("1*0")
    test("0*0*(1)")
    test("6/3/2*2")
  });
  describe('small random generated tests', () => {
    const l = generateListString(5, 3, 2)
    l.forEach(s => test(s))
  });
  describe('medium random generated tests', () => {
    const l = generateListString(100, 5, 5)
    l.forEach(s => test(s))
  });
  describe('large random generated tests', () => {
    const l = generateListString(100, 10, 5)
    l.forEach(s => test(s))
  });
  describe('small random generated with Brackets tests', () => {
    const l = generateListStringWithBrackets(5, 3, 2)
    l.forEach(s => test(s))
  });
  describe('medium random generated with Brackets  tests', () => {
    const l = generateListStringWithBrackets(100, 5, 5)
    l.forEach(s => test(s))
  });
  describe('large random generated with Brackets  tests', () => {
    const l = generateListStringWithBrackets(100, 10, 5)
    l.forEach(s => test(s))
  });
  describe("parse exception tests", () => {
    const l = [
      "1()",
      "1+",
      "000000-1/",
      "1(2",
      ""
    ];
    l.forEach(s => it(s ? s : "''",
      () => expect(() => t(s)).toThrow(ParseError)))
  });
  describe("lex exception tests", () => {
    const l = [
      ";",
      "{}",
    ];
    l.forEach(s => it(s,
      () => expect(() => t(s)).toThrow(Error)))
  });
});
