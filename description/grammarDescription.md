start of ur `.gramm` file must start with 
```
grammar NAME_OF_GRAMMAR;
```
section `token` contains token name, and it parses rule

name of token must be Upper case and `_` at least one symbol
after name must be `:` and after it parses rule regExp style or string

example:
```
@token {
    NUMBER: ([1-9][0-9]+ | 0);
    OPEN_BR: '(';
    CLOSE_BR: ')';
    SUB: '-';
    ADD:'+';
    MUL:'*';
    DIV:'/';
}
```
section `dec`

declare of ur states with return value/arguments for it

`name_state` `@a[argumentName]` `@r[returnValueName]`

example:
```
@dec {
    e        @r[val];
    e_ @a[i] @r[val];
    t        @r[val];
    t_ @a[i] @r[val];
    f        @r[val];
}
```
section `states`

name with lower case, `->`, transition rule with token names
or states name
if derive the empty string u should paste `#`
also in any place u could paste code block like `{ some code }`
for connecting with return values u should paste `$`
in synthesis code this will paste like 
```typescript
//for rule e -> t e_ {$val = $e_.val}
let cntx = {}
cntx['t'] = t()
cntx['e_'] = e_(cntx.t.val)
{
  cntx.val = cntx.e_.val
}
```

example:
```
@states {
    e  -> { // test block } t e_[$t.val]       { $val = $e_.val} ;

    e_ -> #                  { $val = $i } ;
    e_ -> ADD t { $val = $i + $t.val } e_[$val] ;
    e_ -> SUB t { $val = $i - $t.val } e_[$val] ;

    t  ->  f t_[$f.val]         { $val = $t_.val } ;

    t_ -> MUL f { $val = $i * $f.val } t_[$val]    ;
    t_ -> DIV f { $val = $i / $f.val } t_[$val];
    t_ -> #                  { $val = $i } ;

    f  -> OPEN_BR e CLOSE_BR { $val = $e.val } ;
    f  -> NUMBER             { $val = +$NUMBER.text } ;
}
```