import fs from 'fs'
import antlr4 from "antlr4";
import grammLexer from "./generated-parser/grammLexer.ts";
import grammParser from "./generated-parser/grammParser.ts";
import {write} from "../utils/utils.ts";
import {createLexer} from "./createLexer.ts";
import {createParser} from "./createParser.ts";


const generation_path = 'gen/'

export function antlrParse(file: string) {
    let chars = new antlr4.InputStream(file)
    var lexer = new grammLexer(chars);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new grammParser(tokens);
    parser.buildParseTrees = true;
    var tree = parser.read();
    // console.log(tree.)
    return tree.g
}


export function generate(filePath: string, generationPath=generation_path) {
    let file: string = fs.readFileSync(filePath, 'utf-8')
    let g = antlrParse(file)
    const fileName = filePath
                .split('\\').slice(-1)[0] // Calc.gramm
                .split('.')[0]            // Calc
    write(generationPath + fileName + 'Lexer.ts',
      createLexer(fileName, g.tokens))

    write(generationPath + fileName + 'Parser.ts',
      createParser(g))

    return g
}