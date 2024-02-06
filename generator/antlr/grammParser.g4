parser grammar grammParser;

options {
    tokenVocab = grammLexer;
}

@header {
    import {Gramm, TokenMap, Token, Rule, RuleMap} from 'Gramm.ts'
}

@members {
  const isTokenName = (nm: (TokenName | RuleName)): nm is TokenName => {
    const {0: match, input} = nm.match(/[A-Z_]+/) ?? {0: '0', input: '1'}
    return match == input
  }
  escapeRegex(string) {
      return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  getTokenValueStr = (s:string):string => {
    let impl = s.slice(1, -1).trim()
    return impl.startsWith("'")
      ? {
      valStr: this.escapeRegex(impl.slice(1, -1)),
      isOneChar: true
      }
      : {
      valStr: impl,
      isOneChar: false
      }
  }

  wrapTokenValidate(t: Token): Token {
    return {
      ...t,
      ...{validate: new RegExp(t.validate)}
      }
  }

  createToken = (name:string, validate:string):Token => {
    const { valStr, isOneChar } = this.getTokenValueStr(validate)

    if (valStr.includes('->')) {
      const additional = {}
      var [validate, params] = valStr.split('->')
      validate = validate.trim()
      params = params.trim()
      params.split(',').forEach(p => additional[p] = true)
      return this.wrapTokenValidate({
        name,
        validate,
        isOneChar,
        ...additional
      })
    }
    return this.wrapTokenValidate({
        name,
        validate: valStr,
        isOneChar
    })
}

getStateRule = (s:string) => {
    const impl = s.slice(2, -1).trim()
    return impl.split(' ')
}

//@a[val1,val2] -> [val1,val2]
const getOptValue = (st) => {
  const matches = st.match(/\[(.*?)\]/g) // находим все подстроки, заключенные в квадратные скобки
  if (matches) {
    return matches.map(match => match.slice(1, -1)) // обрезаем квадратные скобки и возвращаем массив значений
  }
  return [] // если совпадений не найдено, возвращаем пустой массив
}
getArgRet = (s?:string): (string[] | undefined) => {
    if (s) return this.getOptValue(s.text)
    return s
}

const parse = (s) => {
  const convertRuleApply = (s: string) => {
    const regex = /^(\w+)(?:\[(.*)\])?$/;
    const matches = s.match(regex);
    if (matches) {
      return {
        name: matches[1],
        args: matches[2] || undefined,
      };
    } else {
      return {
        name: s,
        args: undefined,
      };
    }
 }
  const regex = /{[^{}]*}|[^ ]+/g;
  const matches = s.match(regex) || [];
  let inBlock = false
  let firstInFl = false
  let p = []

  for (let el of matches) {
    if (el[0] == '{' && el[el.length - 1] == '}' && !inBlock) {p.push({code: el}); inBlock = false; continue}
    if (el[0] == '{') {
      if (!inBlock) firstInFl=true
      inBlock = true
    }

    if (inBlock && firstInFl) {p.push({code: el}); firstInFl=false; continue}
    if (inBlock && !firstInFl) {p[p.length - 1].code += el; continue}
    if (!inBlock) p.push(el)
  }


  return p.map(v => {
    if (typeof v == 'string' && (this.isTokenName(v) || v == '#')){
      return v
    }else if (typeof v == 'object') {
        return {code: v.code}
    }
    return convertRuleApply(v)
  })
}

}


read returns [Gramm g]
    @init {
        $g = {
            name: '',
            tokens: {} as TokenMap,
            rules: {} as RuleMap
        }
    }
    : nm=name        { $g['name']   = $nm.s    }
      ( ts=token     { $g['tokens'] = {...$g['tokens'],...$ts.tkns} }
      | sts=states   { $g['rules'] = {...$g['rules'], ...$sts.rules} }
      | dec=declares { $g['declare'] = {...$g['declare'], ...$dec.decs} }
      )+
    ;

name returns [string s]
    : GRAMMAR nm=ALPHADIGIT SEMI {$s = $nm.text}
    ;

token returns [TokenMap tkns]
    @init {
        $tkns = {}
    }
    :   TOKENS OPEN_CR
        (tk=one_token { $tkns[$tk.tk.name] = $tk.tk })*
        CLOSE_CR
    ;

one_token returns [Token tk]
    : nm=TOKEN_NAME val=TOKENVALUE
         {$tk = this.createToken($nm.text, $val.text)}
    ;

declares returns [DeclareMap decs]
    @init {
        $decs= {}
    }
    : DECLARE OPEN_CR
        (dec=declare {
        let {name} = $dec.dec
        $decs[name] = $dec.dec
        })*
        CLOSE_CR
    ;
declare returns [DeclareRule dec]
    :   nm=DECNAME
    (ar=DEC_ARG | ret=DEC_RETURN)*
     SEMI {
        $dec = {
            name: $nm.text,
            args : this.getArgRet($ar),
            returns: this.getArgRet($ret),
        }
    }
    ;


states returns [RuleMap rules]
    @init {
        $rules = {}
    }
    :   STATES OPEN_CR
        (st=stat {
let {name} = $st.rule
$rules[name] = {
    name,
    transition: [...($rules[name] ? $rules[name].transition : []), $st.rule]
}
        })*
        CLOSE_CR
    ;

stat returns [transitionRule rule]
    : nm=STATE_NAME    r=STATEINNER
        {
        $rule = {
            name: $nm.text,
            transitionCode: this.parse($r.text.slice(2, -1))
        }}
    ;