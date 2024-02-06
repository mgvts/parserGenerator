//@ts-nocheck
import {CalcLexer} from "./CalcLexer.ts";

let lex: CalcLexer;

const first = {
  'e': new Set(['OPEN_BR','NUMBER','SUB']),
	'e_': new Set(['#','ADD','SUB']),
	't': new Set(['OPEN_BR','NUMBER','SUB']),
	't_': new Set(['MUL','DIV','#']),
	'f': new Set(['OPEN_BR','NUMBER','SUB']),
	'OPEN_BR': new Set(['OPEN_BR']),
	'CLOSE_BR': new Set(['CLOSE_BR']),
	'SUB': new Set(['SUB']),
	'ADD': new Set(['ADD']),
	'MUL': new Set(['MUL']),
	'DIV': new Set(['DIV']),
	'NUMBER': new Set(['NUMBER']),
	'WS': new Set(['WS']),
}
  

const follow = {
  'e': new Set(['EOF','CLOSE_BR']),
	'e_': new Set(['EOF','CLOSE_BR']),
	't': new Set(['ADD','SUB','EOF','CLOSE_BR']),
	't_': new Set(['ADD','SUB','EOF','CLOSE_BR']),
	'f': new Set(['MUL','DIV','ADD','SUB','EOF','CLOSE_BR']),
}
  

export class ParseError extends Error {
    constructor() {
        const msg = "unexpected symbol " + lex.curChar + "at " + lex.curPos
        super(msg);
        Object.setPrototypeOf(this, ParseError.prototype);
    }
}

export function parseExpr(input: string) {
    lex = new CalcLexer(input + '$')
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
       { cntx.val = cntx.e_.val}
      }
      
        return {val:cntx.val}
      }
    case 'NUMBER': {
            cntx['t'] = t()
      cntx['e_'] = e_(cntx.t.val)
      {
       { cntx.val = cntx.e_.val}
      }
      
        return {val:cntx.val}
      }
    case 'SUB': {
            cntx['t'] = t()
      cntx['e_'] = e_(cntx.t.val)
      {
       { cntx.val = cntx.e_.val}
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
      {
       { cntx.val = cntx.i + cntx.t.val }
      }
      
      cntx['e_'] = e_(cntx.val)
      {
       { cntx.val = cntx.e_.val }
      }
      
        return {val:cntx.val}
      }
    case 'SUB': {
      cntx['SUB'] = lex.curToken
          lex.nextToken()
      cntx['t'] = t()
      {
       { cntx.val = cntx.i - cntx.t.val }
      }
      
      cntx['e_'] = e_(cntx.val)
      {
       { cntx.val = cntx.e_.val }
      }
      
        return {val:cntx.val}
      }
    case 'EOF': {
      { cntx.val = cntx.i }
          return {val:cntx.val}
      }
    case 'CLOSE_BR': {
      { cntx.val = cntx.i }
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
            cntx['f'] = f()
      cntx['t_'] = t_(cntx.f.val)
      {
       { cntx.val = cntx.t_.val }
      }
      
        return {val:cntx.val}
      }
    case 'NUMBER': {
            cntx['f'] = f()
      cntx['t_'] = t_(cntx.f.val)
      {
       { cntx.val = cntx.t_.val }
      }
      
        return {val:cntx.val}
      }
    case 'SUB': {
            cntx['f'] = f()
      cntx['t_'] = t_(cntx.f.val)
      {
       { cntx.val = cntx.t_.val }
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
      cntx['f'] = f()
      {
       { cntx.val = cntx.i * cntx.f.val }
      }
      
      cntx['t_'] = t_(cntx.val)
      {
       { cntx.val = cntx.t_.val }
      }
      
        return {val:cntx.val}
      }
    case 'DIV': {
      cntx['DIV'] = lex.curToken
          lex.nextToken()
      cntx['f'] = f()
      {
       { cntx.val = cntx.i / cntx.f.val }
      }
      
      cntx['t_'] = t_(cntx.val)
      {
       { cntx.val = cntx.t_.val }
      }
      
        return {val:cntx.val}
      }
    case 'ADD': {
      { cntx.val = cntx.i }
          return {val:cntx.val}
      }
    case 'SUB': {
      { cntx.val = cntx.i }
          return {val:cntx.val}
      }
    case 'EOF': {
      { cntx.val = cntx.i }
          return {val:cntx.val}
      }
    case 'CLOSE_BR': {
      { cntx.val = cntx.i }
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
       { cntx.val = cntx.e.val }
      }
      
        return {val:cntx.val}
      }
    case 'NUMBER': {
      cntx['NUMBER'] = lex.curToken
          lex.nextToken()
      {
       { cntx.val = +cntx.NUMBER.text }
      }
      
        return {val:cntx.val}
      }
    case 'SUB': {
      cntx['SUB'] = lex.curToken
          lex.nextToken()
      cntx['f'] = f()
      {
       { cntx.val = -cntx.f.val }
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

  