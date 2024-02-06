// @ts-ignore
import {attribute as _, Digraph, Node, Edge, toDot} from 'ts-graphviz';
import {OperationToSymbol, Token, TreeCalc, TreeEl} from "../../utils/parseTree.ts";

let idP = 0

export function generate(t: TreeCalc, legend:string) : string {
    const G = new Digraph("", {
        [_.label]:legend
    })
    if (t == undefined) return ''
    generateSubTree(G, idP, t as TreeCalc | Token)
    return toDot(G)
}

function generateSubTree(G: Digraph, idP: number, t: TreeCalc | Token): number {
    if (isToken(t)) {
        const pt = node(idP, t.name)
        G.addNode(pt)
        const nd = node(idP + 1, t)
        G.addNode(nd)
        G.addEdge(edge(pt, nd))
        return idP + 1
    }
    if (isTree(t)) {
        if (t.terms.length == 3) {
            const [l, m, r] = t.terms
            if (!isToken(m)) throw new Error()
            const pt = node(idP, m)
            G.addNode(pt)
            if (isToken(l)) {
                const node0 = node(++idP, l)
                G.addNode(node0)
                G.addEdge(edge(pt, node0))
            }
            if (isTree(l)) {
                const node0 = node(++idP, " ")
                // G.addNode(node0)
                G.addEdge(edge(pt, node0))
                idP = generateSubTree(G, idP, l)
            }
            const nd1 = node(++idP, OperationToSymbol[m.name])
            G.addNode(nd1)
            G.addEdge(edge(pt, nd1))
            if (isToken(r)) {
                const node2 = node(++idP, r)
                G.addNode(node2)
                G.addEdge(edge(pt, node2))
            }

            if (isTree(r)) {
                const node2 = node(++idP, " ")
                // G.addNode(node2)
                G.addEdge(edge(pt, node2))
                idP = generateSubTree(G, idP, r)
            }
            return idP + 3
        }
        if (t.terms.length == 2) {
            const [l, r] = t.terms
            if (!isToken(l)) throw new Error()
            const pt = node(idP, l)
            G.addNode(pt)
            const node0 = node(++idP, OperationToSymbol[l.name])
            G.addNode(node0)
            G.addEdge(edge(pt, node0))
            if (isToken(r)) {
                const node1 = node(++idP, r)
                G.addNode(node1)
                G.addEdge(edge(pt, node1))
            }
            if (isTree(r)) {
                // const node1 = node(++idP , " ")
                // G.addNode(node1)
                // G.addEdge(edge(pt, node1))
                idP = generateSubTree(G,  ++idP, r)
            }
            return idP + 2
        }
        throw new Error()
    }
    throw new Error()
}

const getN = (id: number): string => "N" + id


const isToken = (t: TreeEl) => !!((t as Token).name)
const isTree = (t: TreeEl)  => !!((t as TreeCalc).terms)
const node = (id: number, token: Token | string | undefined): Node => {
    if (token == undefined) throw new Error()
    if (typeof token === 'string') {
        return new Node(getN(id), {
            [_.label]: token
        })
    }
    let nm = ''
    if (token.name == 'val') nm = token.value + ""
    else nm = token.name + ""

    return new Node(getN(id), {
        [_.label]: nm
    })
}
const edge = (x: Node, y: Node) => new Edge([x, y])
