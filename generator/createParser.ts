import {
  DeclareRule,
  Gramm,
  isCodeBlock,
  isRuleApply,
  isRuleName,
  isTokenName,
  Rule,
  RuleApply,
  RuleMap,
  RuleName,
  SimpleRuleMap,
  TokenName,
  TransitionCode,
  TransitionRule
} from "./Gramm.ts";

Set.prototype.union = function (st) {
  st.forEach(v => this.add(v))
  return this
}

class SynthesisError extends Error {
  constructor(message?) {
    super(message);
    this.name = 'SynthesisError'
  }
}

const buildEmpty = (rules) => Object.keys(rules).reduce(
  (acc, cur) => {
    acc[cur] = new Set()
    return acc
  }, {}) as { [key: RuleName]: Set<TokenName> }

type FFSet = {
  [key: RuleName]: Set<TokenName>
}

export function constructFIRST(rules, tokens): FFSet {
  let first = {
    ...buildEmpty(rules),
    ...(Object.keys(tokens).reduce(
      (acc, cur) => {
        acc[cur] = new Set([cur])
        return acc
      }, {}))
  }
  let changed = true
  while (changed) {
    changed = false

    for (let {name: rn, transition}: Rule of Object.values(rules)) {
      for (let tr: TransitionRule of transition) {
        let sb;
        for (let i = 0; i < tr.length; i++) {
          let old = first[rn].size
          sb = tr[i]
          if (isTokenName(sb) || sb == '#') {
            first[rn].add(sb)
            changed |= old != first[rn].size
            break
          }
          if (isRuleName(sb)) {
            first[rn].union(first[sb])
            if (first[rn].delete('#')) {
              changed |= old != first[rn].size
              continue
            }
            changed |= old != first[rn].size
            break
          }

        }
      }
    }
  }

  return first
}

export function constructFOLLOW(rules, first): FFSet {
  let follow = buildEmpty(rules)
  follow[Object.keys(rules)[0]].add('EOF')
  let changed = true

  while (changed) {
    changed = false
    for (let {name: rn, transition} of Object.values(rules)) {
      for (let tr of transition as TransitionRule) {
        for (let i = tr.length - 1; i >= 0; i--) {
          let sb = tr[i]
          let old = follow[sb]?.size

          const addAsLast = () => {
            follow[sb].union(follow[rn])
            changed |= old != follow[sb].size
          }

          const addFirstIt = () => {
            follow[sb].union(first[tr[++i]])
            if (follow[sb].delete('#')) {
              if (i == tr.length - 1) {
                addAsLast()
              } else {
                addFirstIt()
              }
            }
            changed |= old != follow[sb].size
          }

          if (isTokenName(sb) || sb == '#') {
            continue
          }
          if (isRuleName(sb)) {
            if (i != tr.length - 1) {
              let ii = i
              addFirstIt()
              i = ii
            } else {
              addAsLast()
            }
          }
        }
      }
    }
  }
  return follow
}

function buildObject(followFirstObj: FFSet, nm: string): string {
  function buildRow(key: (RuleName | TokenName), set: Set<TokenName>): string {
    return `'${key}': new Set([${Array.from(set).map(v => "'" + v + "'")}]),\n`
  }

  return `
const ${nm} = {
  ${Object.entries(followFirstObj).map(([key, set]) => buildRow(key, set)).join('\t')}}
  `
}

const simplifyRules = (rules: RuleMap): SimpleRuleMap => {
  const simplifyCodes = (rls: TransitionRule[]): (TokenName | RuleName)[][] => {
    return rls.map(rl => simplifyCode(rl.transitionCode))
  }
  const simplifyCode = (cds: TransitionCode[]): (TokenName | RuleName)[] => {
    let ar = []
    for (const cd of cds) {
      if (typeof cd == 'string') {
        ar.push(cd)
      } else {
        // {name} | {code}
        if ((cd as RuleApply).name) {
          ar.push(cd.name)
        }
      }
    }
    return ar
  }
  return Object.values(rules)
    .map(rule => {
      let {name, transition} = rule
      return {
        name,
        transition: simplifyCodes(transition)
      }
    })
    .reduce((acc, cur) => {
      const {name} = cur
      acc[name] = cur
      return acc
    }, {})
}

function buildRuleMethod(r: Rule, firstSet: FFSet, followSet: FFSet, dec: DeclareRule): string {

  function replaceDollar(s?: string): string {
    return s ? s.replaceAll('$', `cntx.`) : ''
  }

  function getName(cd: TransitionCode): TokenName | RuleName {
    if (isRuleApply(cd)) return cd.name
    if (typeof cd == 'string') return cd
    return null // codeBlock
  }

  function generateWithFirst() {
    function getCaseCode(tokName: string): string {
      let filterCodes = r.transition.filter(
        (rule: TransitionRule) =>
          (firstSet[getName(rule.transitionCode[0]) || '']?? new Set())
          .has(tokName))

      if (filterCodes.length == 0) {
        filterCodes = r.transition
      }
      if (filterCodes.length > 1) {
        throw Error(`Gramm is not LL1: multiple rules at ${r.name}`)
      }
      let trRule = filterCodes[0]
      return `${trRule.transitionCode.map(cd => {
        if (typeof cd == 'object') {
          if (isRuleApply(cd)) {
            // cd: RuleApply
            return `      cntx['${cd.name}'] = ${cd.name}(${replaceDollar(cd.args)})`
          } else if (isCodeBlock(cd)) {
            return `     ${replaceDollar(cd.code)}`
          }
        } else if (typeof cd == 'string') {
          return `cntx['${cd}'] = lex.curToken
          lex.nextToken()`
        } else {
          throw new SynthesisError('multiple tokens not implemented')
        }
      }).join('\n')}
        return ${dec.returns ? `{${dec.returns}:cntx.${dec.returns}}` : ''}`
    }

    return Array.from(firstSet[r.name])
      .map(tokName => {
        if (tokName == '#') return undefined
        return `    case '${tokName}': {
      ${getCaseCode(tokName)}
      }`
      })
      .filter(i => i)
      .join('\n')
  }

  function generateWithFollow() {
    let isNullable = r.transition
      .map(rule => rule.transitionCode)
      .flat(1).includes('#')

    function generateCaseCode(tokName: string): string {
      if (isNullable) {
        return `${r.transition.map(v => v.transitionCode)
          .find((ar: TransitionCode[]) => {
            if (ar.find(el => el === '#')) {
              return ar
            } else return false
          }).map(el => {
            if (isCodeBlock(el)) {
              return el.code
            }
          }).filter(e => e).map(codeStr => replaceDollar(codeStr))}
          return ${dec.returns ? `{${dec.returns}:cntx.${dec.returns}}` : ''}`
      } else {
        return 'throw new ParseError()'
        // throw new SynthesisError('')
      }
    }

    return Array.from(followSet[r.name])
      .map(tokName => {
        return `    case '${tokName}': {
      ${generateCaseCode(tokName)}
      }`
      })
      .filter(i => i)
      .join('\n')
  }

  function getArgs(): string {
    return dec.args ? dec.args.join(',') : ''
  }

  return `
function ${r.name}(${getArgs()}) {
  let cntx = {}
  ${getArgs() ? `cntx['${getArgs()}'] = ${getArgs()}` : ''}
  const token = lex.curToken
  switch (token.name) {
${generateWithFirst()}
${generateWithFollow()}
    default: {
          throw new ParseError()
      }
    }
  }
`
}

export function createParser({name, tokens, rules, declare}: Gramm): string {
  const rls = simplifyRules(rules)
  const first = constructFIRST(rls, tokens)
  const follow = constructFOLLOW(rls, first)


  return `//@ts-nocheck
import {${name}Lexer} from "./${name}Lexer.ts";

let lex: ${name}Lexer;
${buildObject(first, 'first')}
${buildObject(follow, 'follow')}

export class ParseError extends Error {
    constructor() {
        const msg = "unexpected symbol " + lex.curChar + "at " + lex.curPos
        super(msg);
        Object.setPrototypeOf(this, ParseError.prototype);
    }
}

export function parseExpr(input: string) {
    lex = new ${name}Lexer(input + '$')
    lex.nextToken()
    return ${Object.keys(rules)[0]}()
}

${Object.values(rules)
    .map(r => buildRuleMethod(r, first, follow, declare[r.name])).join('\n')}
  `
}