//@ts-nocheck
import {CalcLexer} from "./CalcLexer.ts";

let lex: CalcLexer;

const first = {
  'e': new Set(['NUMBER']),
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
  'e': new Set(['EOF','ADD','MUL']),
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
    case 'NUMBER': {
      cntx['NUMBER'] = lex.curToken
          lex.nextToken()
        return {val:cntx.val}
      }
    case 'EOF': {
      throw new ParseError()
      }
    case 'ADD': {
      throw new ParseError()
      }
    case 'MUL': {
      throw new ParseError()
      }
    default: {
          throw new ParseError()
      }
    }
  }

  