export type Gramm = {
  name: string,
  tokens: TokenMap,
  rules: RuleMap,
  declare: DeclareMap,
}

export type TokenName = string
export type TokenMap = {
  [key: TokenName]: Token
}
export type Token = {
  name: TokenName,
  validate: string | RegExp;
  isOneChar: boolean,
  skip?: Boolean;
  code?: string;
}

export type DeclareMap = {
  [key in RuleName]: DeclareRule
}

export type DeclareRule = {
  name: RuleName,
  args?: string[],
  returns?: string[]
}

export type RuleApply = {
  name: RuleName,
  args: string
}
export type RuleName = string
export type RuleMap = {
  [key: RuleName]: Rule,
}

export type Rule = {
  name: RuleName,
  transition: TransitionRule[]
}

export type TransitionRule = {
  name: RuleName,
  transitionCode: TransitionCode[],
}
export type CodeBlock = {
  code: string
}
export type TransitionCode = (
  | TokenName
  | RuleApply
  | CodeBlock)[]

export type SimpleRuleMap = {
  [key: RuleName]: SimpleRule
}
export type SimpleRule = {
  name: RuleName,
  transition: (TokenName | RuleName)[][]
}

export function isCodeBlock(o: any): o is CodeBlock {
  return o && typeof o == 'object' && o.code
}

export function isRuleApply(o: any): o is RuleApply {
  return o && typeof o == 'object' && o.name
}

const upperRe = new RegExp(/[A-Z_]+/)
const lowerRe = new RegExp(/[a-z_]+/)
export const isTokenName = (nm: (TokenName | RuleName)): nm is TokenName => {
  const {0: match, input} = nm.match(upperRe) ?? {0: '0', input: '1'}
  return match == input
}
export const isRuleName = (nm: (TokenName | RuleName)): nm is RuleName => {
  const {0: match, input} = nm.match(lowerRe) ?? {0: '0', input: '1'}
  return match == input
}
