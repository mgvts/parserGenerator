main file is [createParser](../generator/createParser.ts)

```javascript
export function createParser({name, tokens, rules, declare}: Gramm): string 
```
example of args [here](gramm.ts)

first we generate `FIRST` and `FOLLOW` sets for sets

then `buildRuleMethod` for each `Rule` in `RuleMap`
```javascript
function buildRuleMethod(r: Rule, firstSet: FFSet, followSet: FFSet, dec: DeclareRule): string
```
example of each method according each rule is:
```typescript
function t_(i) {
  let cntx = {}
  cntx['i'] = i
  const token = lex.curToken
  switch (token.name) {
    case 'MUL':
    case 'DIV': {
      cntx['DIV'] = lex.curToken
      lex.nextToken()
      cntx['k'] = k()
      cntx['t_'] = t_(cntx.val)
      {
        cntx.val={state:'t_', terms: [cntx.k.val, 'DIV', cntx.t_.val]}
      }

      return {val:cntx.val}
    }
    case 'ADD':
    case 'SUB':
    case 'EOF': 
    case 'CLOSE_BR': {
      {cntx.val={state: 't_', terms: [] }}
      return {val:cntx.val}
    }
    default: {
      throw new ParseError()
    }
  }
}
```
we store result of each method call into `cntx[methodName]` with same name

each case `tokenName` we get from `generateWithFirst()` or `generateWithFollow()`
if `tokenName` in `firstSer[tokenName]` then we paste code that according to it

same for `followSet[tokenName]` (with follow set pasting 'empty' case if current rule supports it [see follow](https://en.wikipedia.org/wiki/LL_parser#Terminology))
