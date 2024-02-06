main file is [createLexer](../generator/createLexer.ts)

```typescript
export function createLexer(name: string, tokens: TokenMap): string 
```
example of args
according to [Gramm file](../generator/Gramm.ts) with types declaring
```typescript
{
  name: 'TreeCalc',
  tokens: {
  OPEN_BR: { name: 'OPEN_BR', validate: /\(/, isOneChar: true },
  CLOSE_BR: { name: 'CLOSE_BR', validate: /\)/, isOneChar: true },
  SUB: { name: 'SUB', validate: /\-/, isOneChar: true },
  ADD: { name: 'ADD', validate: /\+/, isOneChar: true },
  MUL: { name: 'MUL', validate: /\*/, isOneChar: true },
  LOG: { name: 'LOG', validate: /\/\//, isOneChar: false },
  DIV: { name: 'DIV', validate: /\//, isOneChar: true },
  NUMBER: { name: 'NUMBER', validate: /([1-9][0-9]*|0)/, isOneChar: false },
  WS: {
    name: 'WS',
      validate: /[ \t\n\r]*/,
      isOneChar: false,
      skip: true
  },
  FUNC: { name: 'FUNC', validate: /[a-zA-Z]+/, isOneChar: false }
  }
}
```

generating file with complex method `nextToken`

```javascript
  function generateComplexTokens(t: Token) {
    return `
  private ${t.name}() {
    const re = tokens['${t.name}'].validate
    return createTerm('${t.name}',
     this.getSequence(re))
  }
`
  }
```
from above example we get this for each tokenName `isOnecar = false`
```javascript
  private LOG() {
    const re = tokens['LOG'].validate
    return createTerm('LOG',
     this.getSequence(re))
  }
```
```javascript
  private getSequence(re: RegExp): string {
    let match = this.input.slice(this.curPos).match(re)
    const val = match[0]
    this.curPos += val.length
    return match[0];
  }
```
`getSequence` very helpful with js RegExp in `token.validate`