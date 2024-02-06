//@ts-nocheck
import {RuleName, TokenName} from "../generator/Gramm.ts";
import {sout} from "./utils.ts";

export type TreeCalc = {
  state: RuleName,
  terms: (RuleName | TokenName | undefined | TreeCalc)[]
}
export type Token = {
  name: TokenName,
  value?: number
}

export type TreeEl = (RuleName | TokenName | undefined | TreeCalc)

const State = {
  null : 'null'
}
function TreeCalc(state, terms) {return {state, terms}}
export function evaluateExpression(node: TreeCalc): number | undefined {
  // @ts-ignore
  function subEval(t: TreeCalc): [number | undefined, (a: number | undefined, b: number | undefined) => number | undefined] {
    const children = t.terms;
    if (children.length == 0) {
      return [0, (a, _) => a]
    }
    // right
    if (children.length == 2) {
      if ((children[0] as Token).name != 'LOG') throw new Error("smt go wrong 2 args but not log:" + t)

      const foo = (children[0] as Token).value
      const v = evaluateExpression(children[1] as TreeCalc)
      return [v, (a, b) => {
        return foo(a, b)
      }]
    }
    if (children.length == 3) {
      const a = evaluateExpression(children[0] as TreeCalc)
      const [b, foo] = subEval(children[2] as TreeCalc)
      return [a, (x, y) => {
        if (x === undefined || y === undefined) return undefined
        const r1 = (t.terms[1] as operation).value(x, y)
        return foo(r1, b)
      }]
    }
    if (children.length < 3 || (children[0] as Token).name) {
      throw new Error("smt go wrong not 3 args in subEval " + t)
    }
  }

  const children = node.terms
  switch (children.length) {
    case 0: {
      // eps
      return undefined
    }
    case 1: {
      // n
      return (children[0] as Token).value
    }
    case 2: {
      // E | T | K
      if ((children[0] as Token).name == 'SUB') {
        let value = evaluateExpression(children[1] as Tree)
        return value == undefined ? undefined : -value
      }

      if ((children[0] as Token).name)
        return (children[0] as Token).value(evaluateExpression(children[1] as Tree))

      const a = evaluateExpression(children[0] as Tree)
      const [b, foo] = subEval(children[1] as Tree)
      return foo(a, b)
    }
    case 3: {
      // E' | T' | (E)
      if ((children[1] as Token).name) {
        // + T E' | - T E' | * F T' | / F T'
        throw new Error("unexpected")
      }
      // @ts-ignore
      return evaluateExpression(children[1] as Tree)
    }
    default:
      return undefined
  }
}

export function betterTree(node: TreeCalc) {
  //@ts-ignore
  function subTree(t: TreeCalc): [TreeEl, ((x: (Tree | Token), y: (Tree | Token)) => Tree | Token)] | undefined {
    if (t == undefined) return undefined
    const children = t.terms;
    if (children.length == 0) {
      return [TreeCalc(State.null, []), (a, _) => a]
    }
    if (children.length == 2) {
      if ((children[0] as Token).name != 'LOG') throw new Error("smt go wrong 2 args but not log:" + t)

      const sign = (children[0] as Token)
      const v = betterTree(children[1] as TreeCalc)
      return [v, (x, y) => {
        return TreeCalc(State.null, [x, sign, y])
      }]
    }
    if (children.length == 3) {
      const a = betterTree(children[0] as TreeCalc)
      //@ts-ignore
      const [b, foo] = subTree(children[2] as Tree)
      return [a, (x: TreeCalc | Token, y: TreeCalc | Token) => {
        const r1 = TreeCalc(State.null, [x, children[1], y])
        return foo(r1, b)
      }]
    }
    if (children.length < 3 || (children[0] as Token).name) {
      throw new Error("smt go wrong not 3 args in subEval " + t)
    }
  }

  const children = node.terms
  switch (children.length) {
    case 0: {
      // eps
      return undefined
    }
    case 1: {
      // n
      return children[0]
    }
    case 2: {
      // E | T | K
      if ((children[0] as Token).name == 'SUB') {
        return TreeCalc(State.null, [children[0] as Token, betterTree(children[1] as TreeCalc)])
      }

      const a = betterTree(children[0] as TreeCalc)
      const [b, foo] = subTree(children[1] as TreeCalc)
      return foo(a, b)
    }
    case 3: {
      // E' | T' | K' |  (E)
      if ((children[1] as Token).name) {
        // + T E' | - T E' | * F T' | / F T'
        throw new Error("unexpected")
      }
      // (E)
      // @ts-ignore
      return betterTree(children[1] as Tree)
    }
  }
}

export const OperationToSymbol = {
  "ADD": "+",
  "SUB": "-",
  "MUL": "*",
  "DIV": "/",
  "LOG": "//",
}

export function convertTokens(o: Object): TreeCalc {
  const TokensMap = {
    'LOG': (a, b) => Math.log(b) / Math.log(a),
    'ADD': (a, b) => a + b,
    'SUB': (a, b) => a - b,
    'MUL': (a, b) => a * b,
    'DIV': (a, b) => a / b,
    'sin': Math.sin,
    'cos': Math.cos,
  }
  const {state, terms} = o
  return {
    state,
    terms: terms.map(el => {
      if (typeof el == 'string') {
        return {
          name: el,
          value: TokensMap[el]
        }
      } else if (el && el.name == 'NUMBER') return el
      else if (el && el.name == 'FUNC') return {name:el.name, value:TokensMap[el.value]}
      else return convertTokens(el)
    })
  }
}