
//@ts-nocheck
export type Token = {
  name: string,
  text?: unknown;
}
export type TokenName = 'OPEN_BR'
	| 'CLOSE_BR'
	| 'SUB'
	| 'ADD'
	| 'MUL'
	| 'LOG'
	| 'DIV'
	| 'NUMBER'
	| 'WS'
	| 'FUNC'
  | 'EOF'

const tokens = {
'OPEN_BR' : {
'name' : 'OPEN_BR',
'validate' : /\(/,
'isOneChar' : true,
},
'CLOSE_BR' : {
'name' : 'CLOSE_BR',
'validate' : /\)/,
'isOneChar' : true,
},
'SUB' : {
'name' : 'SUB',
'validate' : /\-/,
'isOneChar' : true,
},
'ADD' : {
'name' : 'ADD',
'validate' : /\+/,
'isOneChar' : true,
},
'MUL' : {
'name' : 'MUL',
'validate' : /\*/,
'isOneChar' : true,
},
'LOG' : {
'name' : 'LOG',
'validate' : /\/\//,
'isOneChar' : false,
},
'DIV' : {
'name' : 'DIV',
'validate' : /\//,
'isOneChar' : true,
},
'NUMBER' : {
'name' : 'NUMBER',
'validate' : /([1-9][0-9]*|0)/,
'isOneChar' : false,
},
'WS' : {
'name' : 'WS',
'validate' : /[ \t\n\r]*/,
'isOneChar' : false,
'skip' : true,
},
'FUNC' : {
'name' : 'FUNC',
'validate' : /[a-zA-Z]+/,
'isOneChar' : false,
},
}
const skipRule = new RegExp(Object.values(tokens)
            .filter(t => t.skip)
            .map(t => t.validate.source)
            .join('|'))
            
const createTerm = (name: TokenName, text?) => {return {name, text} as Token}

export class TreeCalcLexer {
  curPos: number
  curChar: string = ''
  curToken: Token | undefined;
  input: string;
  
  constructor(input: string) {
    this.curPos = 0
    this.input = input
  }
  
  nextToken(): void {
    this.skipWhitespace()
    let check = Object.values(tokens).every(t => {
      const subStr = this.input.slice(this.curPos)
      if (subStr == '$') return true
      let matches = subStr.match(t.validate);
      if (matches && matches.index == 0 && matches[0]) {
        if (t.isOneChar) {
          this.curToken = createTerm(t.name)
          this.curPos++
        } else this.curToken = this[t.name]()
        return false
      }
      return true
    })
    if (check && this.input.slice(this.curPos) == '$') {
      this.curToken = createTerm('EOF')
      return;
    }
  }
  
  read(): string | undefined {
      return this.input[this.curPos++]
  }
  
  skipWhitespace() {
    const subStr = this.input.slice(this.curPos)
    const mt = subStr.match(skipRule)
    if (!mt || mt.index != 0) return
    this.curPos += mt[0].length
  }

  private LOG() {
    const re = tokens['LOG'].validate
    return createTerm('LOG',
     this.getSequence(re))
  }

  private NUMBER() {
    const re = tokens['NUMBER'].validate
    return createTerm('NUMBER',
     this.getSequence(re))
  }

  private WS() {
    const re = tokens['WS'].validate
    return createTerm('WS',
     this.getSequence(re))
  }

  private FUNC() {
    const re = tokens['FUNC'].validate
    return createTerm('FUNC',
     this.getSequence(re))
  }

  private getSequence(re: RegExp): string {
    let match = this.input.slice(this.curPos).match(re)
    const val = match[0]
    this.curPos += val.length
    return match[0];
  }
}
