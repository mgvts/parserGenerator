//@ts-nocheck
import {TreeCalcLexer} from "./TreeCalcLexer.ts";

let lex: TreeCalcLexer;

const first = {
  'e': new Set(['OPEN_BR','NUMBER','SUB','FUNC']),
	'e_': new Set(['#','ADD','SUB']),
	't': new Set(['OPEN_BR','NUMBER','SUB','FUNC']),
	't_': new Set(['MUL','DIV','#']),
	'k': new Set(['OPEN_BR','NUMBER','SUB','FUNC']),
	'k_': new Set(['LOG','#']),
	'f': new Set(['OPEN_BR','NUMBER','SUB','FUNC']),
	'OPEN_BR': new Set(['OPEN_BR']),
	'CLOSE_BR': new Set(['CLOSE_BR']),
	'SUB': new Set(['SUB']),
	'ADD': new Set(['ADD']),
	'MUL': new Set(['MUL']),
	'LOG': new Set(['LOG']),
	'DIV': new Set(['DIV']),
	'NUMBER': new Set(['NUMBER']),
	'WS': new Set(['WS']),
	'FUNC': new Set(['FUNC']),
}
  

const follow = {
  'e': new Set(['EOF','CLOSE_BR']),
	'e_': new Set(['EOF','CLOSE_BR']),
	't': new Set(['ADD','SUB','EOF','CLOSE_BR']),
	't_': new Set(['ADD','SUB','EOF','CLOSE_BR']),
	'k': new Set(['MUL','DIV','ADD','SUB','EOF','CLOSE_BR']),
	'k_': new Set(['MUL','DIV','ADD','SUB','EOF','CLOSE_BR']),
	'f': new Set(['LOG','MUL','DIV','ADD','SUB','EOF','CLOSE_BR']),
}
  

export class ParseError extends Error {
    constructor() {
        const msg = "unexpected symbol " + lex.curChar + "at " + lex.curPos
        super(msg);
        Object.setPrototypeOf(this, ParseError.prototype);
    }
}

export function parseExpr(input: string) {
    lex = new TreeCalcLexer(input + '$')
    lex.nextToken()
    return e()
}


function e() {
  let cntx = {}
  
  const token = lex.curToken
  switch (token.name) {
    case 'OPEN_BR': {
            cntx['t'] = t()
      cntx['e_'] = e_(cntx.t.val)
      {
       {cntx.val={state:'e', terms: [cntx.t.val, cntx.e_.val]}}
      }
      
        return {val:cntx.val}
      }
    case 'NUMBER': {
            cntx['t'] = t()
      cntx['e_'] = e_(cntx.t.val)
      {
       {cntx.val={state:'e', terms: [cntx.t.val, cntx.e_.val]}}
      }
      
        return {val:cntx.val}
      }
    case 'SUB': {
            cntx['t'] = t()
      cntx['e_'] = e_(cntx.t.val)
      {
       {cntx.val={state:'e', terms: [cntx.t.val, cntx.e_.val]}}
      }
      
        return {val:cntx.val}
      }
    case 'FUNC': {
            cntx['t'] = t()
      cntx['e_'] = e_(cntx.t.val)
      {
       {cntx.val={state:'e', terms: [cntx.t.val, cntx.e_.val]}}
      }
      
        return {val:cntx.val}
      }
    case 'EOF': {
      throw new ParseError()
      }
    case 'CLOSE_BR': {
      throw new ParseError()
      }
    default: {
          throw new ParseError()
      }
    }
  }


function e_(i) {
  let cntx = {}
  cntx['i'] = i
  const token = lex.curToken
  switch (token.name) {
    case 'ADD': {
      cntx['ADD'] = lex.curToken
          lex.nextToken()
      cntx['t'] = t()
      cntx['e_'] = e_(cntx.val)
      {
       {cntx.val={state:'e_', terms: [ cntx.t.val,'ADD', cntx.e_.val]}}
      }
      
        return {val:cntx.val}
      }
    case 'SUB': {
      cntx['SUB'] = lex.curToken
          lex.nextToken()
      cntx['t'] = t()
      cntx['e_'] = e_(cntx.val)
      {
       {cntx.val={state:'e_', terms: [ cntx.t.val,'SUB', cntx.e_.val]}}
      }
      
        return {val:cntx.val}
      }
    case 'EOF': {
      {cntx.val={state: 'e_', terms: [] }}
          return {val:cntx.val}
      }
    case 'CLOSE_BR': {
      {cntx.val={state: 'e_', terms: [] }}
          return {val:cntx.val}
      }
    default: {
          throw new ParseError()
      }
    }
  }


function t() {
  let cntx = {}
  
  const token = lex.curToken
  switch (token.name) {
    case 'OPEN_BR': {
            cntx['k'] = k()
      cntx['t_'] = t_(cntx.k.val)
      {
       {cntx.val={state:'t', terms: [cntx.k.val, cntx.t_.val]}}
      }
      
        return {val:cntx.val}
      }
    case 'NUMBER': {
            cntx['k'] = k()
      cntx['t_'] = t_(cntx.k.val)
      {
       {cntx.val={state:'t', terms: [cntx.k.val, cntx.t_.val]}}
      }
      
        return {val:cntx.val}
      }
    case 'SUB': {
            cntx['k'] = k()
      cntx['t_'] = t_(cntx.k.val)
      {
       {cntx.val={state:'t', terms: [cntx.k.val, cntx.t_.val]}}
      }
      
        return {val:cntx.val}
      }
    case 'FUNC': {
            cntx['k'] = k()
      cntx['t_'] = t_(cntx.k.val)
      {
       {cntx.val={state:'t', terms: [cntx.k.val, cntx.t_.val]}}
      }
      
        return {val:cntx.val}
      }
    case 'ADD': {
      throw new ParseError()
      }
    case 'SUB': {
      throw new ParseError()
      }
    case 'EOF': {
      throw new ParseError()
      }
    case 'CLOSE_BR': {
      throw new ParseError()
      }
    default: {
          throw new ParseError()
      }
    }
  }


function t_(i) {
  let cntx = {}
  cntx['i'] = i
  const token = lex.curToken
  switch (token.name) {
    case 'MUL': {
      cntx['MUL'] = lex.curToken
          lex.nextToken()
      cntx['k'] = k()
      cntx['t_'] = t_(cntx.val)
      {
       {cntx.val={state:'t_', terms: [cntx.k.val, 'MUL', cntx.t_.val]}}
      }
      
        return {val:cntx.val}
      }
    case 'DIV': {
      cntx['DIV'] = lex.curToken
          lex.nextToken()
      cntx['k'] = k()
      cntx['t_'] = t_(cntx.val)
      {
       {cntx.val={state:'t_', terms: [cntx.k.val, 'DIV', cntx.t_.val]}}
      }
      
        return {val:cntx.val}
      }
    case 'ADD': {
      {cntx.val={state: 't_', terms: [] }}
          return {val:cntx.val}
      }
    case 'SUB': {
      {cntx.val={state: 't_', terms: [] }}
          return {val:cntx.val}
      }
    case 'EOF': {
      {cntx.val={state: 't_', terms: [] }}
          return {val:cntx.val}
      }
    case 'CLOSE_BR': {
      {cntx.val={state: 't_', terms: [] }}
          return {val:cntx.val}
      }
    default: {
          throw new ParseError()
      }
    }
  }


function k() {
  let cntx = {}
  
  const token = lex.curToken
  switch (token.name) {
    case 'OPEN_BR': {
            cntx['f'] = f()
      cntx['k_'] = k_(cntx.f.val)
      {
       {cntx.val={state:'k', terms: [cntx.f.val, cntx.k_.val]}}
      }
      
        return {val:cntx.val}
      }
    case 'NUMBER': {
            cntx['f'] = f()
      cntx['k_'] = k_(cntx.f.val)
      {
       {cntx.val={state:'k', terms: [cntx.f.val, cntx.k_.val]}}
      }
      
        return {val:cntx.val}
      }
    case 'SUB': {
            cntx['f'] = f()
      cntx['k_'] = k_(cntx.f.val)
      {
       {cntx.val={state:'k', terms: [cntx.f.val, cntx.k_.val]}}
      }
      
        return {val:cntx.val}
      }
    case 'FUNC': {
            cntx['f'] = f()
      cntx['k_'] = k_(cntx.f.val)
      {
       {cntx.val={state:'k', terms: [cntx.f.val, cntx.k_.val]}}
      }
      
        return {val:cntx.val}
      }
    case 'MUL': {
      throw new ParseError()
      }
    case 'DIV': {
      throw new ParseError()
      }
    case 'ADD': {
      throw new ParseError()
      }
    case 'SUB': {
      throw new ParseError()
      }
    case 'EOF': {
      throw new ParseError()
      }
    case 'CLOSE_BR': {
      throw new ParseError()
      }
    default: {
          throw new ParseError()
      }
    }
  }


function k_(i) {
  let cntx = {}
  cntx['i'] = i
  const token = lex.curToken
  switch (token.name) {
    case 'LOG': {
      cntx['LOG'] = lex.curToken
          lex.nextToken()
      cntx['k'] = k()
      {
       {cntx.val={state:'k_', terms: ['LOG', cntx.k.val]}}
      }
      
        return {val:cntx.val}
      }
    case 'MUL': {
      {cntx.val={state: 'k_', terms: [] }}
          return {val:cntx.val}
      }
    case 'DIV': {
      {cntx.val={state: 'k_', terms: [] }}
          return {val:cntx.val}
      }
    case 'ADD': {
      {cntx.val={state: 'k_', terms: [] }}
          return {val:cntx.val}
      }
    case 'SUB': {
      {cntx.val={state: 'k_', terms: [] }}
          return {val:cntx.val}
      }
    case 'EOF': {
      {cntx.val={state: 'k_', terms: [] }}
          return {val:cntx.val}
      }
    case 'CLOSE_BR': {
      {cntx.val={state: 'k_', terms: [] }}
          return {val:cntx.val}
      }
    default: {
          throw new ParseError()
      }
    }
  }


function f() {
  let cntx = {}
  
  const token = lex.curToken
  switch (token.name) {
    case 'OPEN_BR': {
      cntx['OPEN_BR'] = lex.curToken
          lex.nextToken()
      cntx['e'] = e()
cntx['CLOSE_BR'] = lex.curToken
          lex.nextToken()
      {
       {cntx.val={state:'f', terms: ['OPEN_BR', cntx.e.val, 'CLOSE_BR']}}
      }
      
        return {val:cntx.val}
      }
    case 'NUMBER': {
      cntx['NUMBER'] = lex.curToken
          lex.nextToken()
      {
       {cntx.val={state:'f',terms:[{name:'NUMBER',value:+cntx.NUMBER.text}]}}
      }
      
        return {val:cntx.val}
      }
    case 'SUB': {
      cntx['SUB'] = lex.curToken
          lex.nextToken()
      cntx['f'] = f()
      {
       {cntx.val={state:'f', terms: ['SUB', cntx.f.val]}}
      }
      
        return {val:cntx.val}
      }
    case 'FUNC': {
      cntx['FUNC'] = lex.curToken
          lex.nextToken()
      cntx['f'] = f()
      {
       {cntx.val={state:'f',terms:[{name:'FUNC',value:cntx.FUNC.text},cntx.f.val]}}
      }
      
        return {val:cntx.val}
      }
    case 'LOG': {
      throw new ParseError()
      }
    case 'MUL': {
      throw new ParseError()
      }
    case 'DIV': {
      throw new ParseError()
      }
    case 'ADD': {
      throw new ParseError()
      }
    case 'SUB': {
      throw new ParseError()
      }
    case 'EOF': {
      throw new ParseError()
      }
    case 'CLOSE_BR': {
      throw new ParseError()
      }
    default: {
          throw new ParseError()
      }
    }
  }

  