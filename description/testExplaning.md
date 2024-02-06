structure:
```
TESTS
│   firstFollow.ts
│   testGenerator.ts
│
├───Calc
│   │   Calc.gramm
│   │   index.ts
│   │   simpleCalc.test.ts
│   │
│   └───gen
│           CalcLexer.ts
│           CalcParser.ts
│
└───TreeCalc
    │   generatorDot.ts
    │   index.ts
    │   testImgs.ts
    │   TreeCalc.gramm
    │   TreeCalc.test.ts
    │
    ├───gen
    │       TreeCalcLexer.ts
    │       TreeCalcParser.ts
    │
    └───imgs
            img_0.svg
            img_1.svg
            img_2.svg
            img_3.svg
            img_4.svg
            img_5.svg
            img_6.svg


```

* [firstFollow.ts](tests/firstFollow.ts) 
> here simple test for correct detecting `first` `follow` sets
* [testGenerator.ts](tests/testGenerator.ts)
> utility file for creating test cases in [simpleCalc.test.ts](tests/Calc/simpleCalc.test.ts) 
and [TreeCalc.test.ts](tests/TreeCalc/TreeCalc.test.ts)
* `Calc`/`TreeCalc`
> dirs for test with `jest`
> [index.ts](tests/TreeCalc/index.ts) file for generate [gen dir](tests/Calc/gen)
* [testImgs](tests/TreeCalc/testImgs.ts) 
>file for generate `.svg` files with [ts-graphviz](https://github.com/ts-graphviz/ts-graphviz) 
> 
> example in [imgs](tests/TreeCalc/imgs)