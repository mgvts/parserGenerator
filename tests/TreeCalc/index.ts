import {generate} from "../../generator/generate.ts";
import {sout} from "../../utils/utils.ts";

let path = 'D:\\4sem\\mt\\mt4ll\\tests\\TreeCalc\\TreeCalc.gramm'
let gen = 'D:\\4sem\\mt\\mt4ll\\tests\\TreeCalc\\gen\\'

let g = generate(path, gen)

// sout(g)

// example to use

// import {parseExpr} from "./gen/TreeCalcParser.ts";
// import {convertTokens, evaluateExpression} from "../../utils/parseTree.ts";
//
// const {val} = parseExpr('sin 1')
// const converted = convertTokens(val)
// sout(val)
// sout(converted)
// sout(evaluateExpression(converted))