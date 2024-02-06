import {generate} from "../../generator/generate.ts";
import {sout} from "../../utils/utils.ts";

let path = 'D:\\4sem\\mt\\mt4ll\\tests\\Calc\\Calc.gramm'
let gen = 'D:\\4sem\\mt\\mt4ll\\tests\\Calc\\gen\\'

let g = generate(path, gen)

sout(g)

import {parseExpr} from "./gen/CalcParser.ts";
sout(parseExpr('1+2'))