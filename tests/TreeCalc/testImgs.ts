//@ts-ignore
import {toFile} from 'ts-graphviz/adapter';
import {generate} from "./generatorDot.ts";
import {betterTree, TreeCalc} from "../../utils/parseTree.ts";

import {parseExpr} from "./gen/TreeCalcParser.ts";
import {sout} from "../../utils/utils.ts";

function pe(s) {
    function convertTokens(o: Object): TreeCalc {
        const TokensMap = {
            'LOG': (a, b) => Math.log(b) / Math.log(a),
            'ADD': (a, b) => a + b,
            'SUB': (a, b) => a - b,
            'MUL': (a, b) => a * b,
            'DIV': (a, b) => a / b
        }
        const {state, terms} = o
        return {
            state,
            terms: terms.map(el => {
                if (typeof el == 'string') {
                    return {
                        name: el,
                        value: TokensMap[el]
                    }
                } else if (el && el.name) return el
                else return convertTokens(el)
            })
        }
    }
    return convertTokens(parseExpr(s).val)
}
export async function writeDot(t: TreeCalc, label: string, filename: string) {
    const dot: string = generate(t, label)
    console.log(dot)
    await toFile(dot, filename, {format: 'svg'});
}

//@ts-ignore
const test = [
    '1+1',
    "1/2/3",
    "1-2-3",
    "1 - 2 /3",
    "(69+34*6+(81+1/7)/70)",
    '17056/54475-7418/50831-37881-4239/66150*64346+55544*73219/72248',
    "(46006*7483/42399/2064/75870/28941+34332+89267+24460/47962-39824)"
]

const test1 = [
    '2//2//16',
    '(69+34*6+(2//2//16+1/7)/70)'
]

//@ts-ignore
function runTests(test: string[]): void {
    const basePath = (id: number): string => "D:\\4sem\\mt\\mt4ll\\tests\\TreeCalc\\imgs\\img_" + id + ".svg"
    test.forEach(async (s, i) => {
        await writeDot(betterTree(pe(s)), s, basePath(i))
    })
}

runTests(test)
