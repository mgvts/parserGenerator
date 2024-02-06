import {generate} from "./generate.ts";
import {sout} from "../utils/utils.ts";

let p = "D:\\4sem\\mt\\mt4ll\\tests\\TreeCalc\\TreeCalc.gramm"

let g = generate(p, 'gen/')
sout(g)