//https://youtu.be/jv4dwxukVvU?si=EWx4sPTDLtqBaGbw&t=181

import {constructFIRST, constructFOLLOW} from "../generator/createParser";
import {toString} from "../utils/utils";



const rls = {
  s: {
    name:'s',
    transition: [['a','b','c','d','e']]
  },
  a: {
    name:'a',
    transition: [['A'], ['#']]
  },
  b: {
    name:'b',
    transition: [['B',], ['#']]
  },
  c: {
    name:'c',
    transition: [['C']]
  },
  d: {
    name:'d',
    transition: [['D'], ['#']]
  },
  e: {
    name:'e',
    transition: [['E'], ['#']]
  }
}
const tkns = {
  A: {},
  B:{},
  C:{},
  D:{},
  E:{}
}
let firs = constructFIRST(rls, tkns)
let follow = constructFOLLOW(rls, firs)
console.log(toString(firs))
console.log(toString(follow))
//+
