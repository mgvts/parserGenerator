4th lab methods translation in itmo cs

project structure : 
```
GENERATOR
│   createLexer.ts
│   createParser.ts
│   generate.ts
│   Gramm.ts
│
├───antlr
│       grammLexer.g4
│       grammParser.g4
│
└───generated-parser
        grammLexer.interp
        grammLexer.tokens
        grammLexer.ts
        grammParser.interp
        grammParser.tokens
        grammParser.ts
        grammParserListener.ts
```
main source for generating with current `.gramm` file

main entry is  `generate` in `generator/generate.ts`
```typescript
export function generate(filePath: string, generationPath) {
    let file: string = fs.readFileSync(filePath, 'utf-8')
    let g = antlrParse(file)
    const fileName = filePath
                .split('\\').slice(-1)[0] 
                .split('.')[0]            
    write(generationPath + fileName + 'Lexer.ts',
      createLexer(fileName, g.tokens))

    write(generationPath + fileName + 'Parser.ts',
      createParser(g))

    return g
}
```
data scans with antlr4 and then with `GrammParser` `GrammLexer`

creating self generating files `FILE_NAMEParser.ts` `FILE_NAMELexer.ts`
explaining of `.gramm` file [here](description/grammarDescription.md)

[lexer generating description](description/LexerExplaning.md) and [parser generating description](description/ParserExplaning.md)

and my test cases [explanation](description/testExplaning.md)