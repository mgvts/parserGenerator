import {Token, TokenMap} from "./Gramm.ts";

export function createLexer(name: string, tokens: TokenMap): string {

  function generateObjectString(o: Object): string {
    let s = '{\n'
    Object.entries(o).forEach(([key, val]) => {
      s += "'" + key + "'" + ' : '
      if (typeof val == 'object' && key != 'validate') {
        s += generateObjectString(val) + ",\n"
      } else {
        if (key == 'name') s += "'" + val + "'"
        else s += val.toString()
        s += ',\n'
      }
    })
    s += '}'
    return s
  }

  function generateComplexTokens(t: Token) {
    return `
  private ${t.name}() {
    const re = tokens['${t.name}'].validate
    return createTerm('${t.name}',
     this.getSequence(re))
  }
`
  }

  return `
//@ts-nocheck
export type Token = {
  name: string,
  text?: unknown;
}
export type TokenName = ${Object.keys(tokens)
                      .map(nm => "'" + nm + "'")
                      .join('\n\t| ')}
  | 'EOF'

const tokens = ${generateObjectString(tokens)}
const skipRule = new RegExp(Object.values(tokens)
            .filter(t => t.skip)
            .map(t => t.validate.source)
            .join('|'))
            
const createTerm = (name: TokenName, text?) => {return {name, text} as Token}

export class ${name}Lexer {
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
${Object.values(tokens)
    .filter(t => !t.isOneChar)
    .map(t => generateComplexTokens(t))
    .join('')}
  private getSequence(re: RegExp): string {
    let match = this.input.slice(this.curPos).match(re)
    const val = match[0]
    this.curPos += val.length
    return match[0];
  }
}
`
}