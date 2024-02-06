let g = {
  name: 'TreeCalc',
  tokens: {
    OPEN_BR: { name: 'OPEN_BR', validate: /\(/, isOneChar: true },
    CLOSE_BR: { name: 'CLOSE_BR', validate: /\)/, isOneChar: true },
    SUB: { name: 'SUB', validate: /\-/, isOneChar: true },
    ADD: { name: 'ADD', validate: /\+/, isOneChar: true },
    MUL: { name: 'MUL', validate: /\*/, isOneChar: true },
    LOG: { name: 'LOG', validate: /\/\//, isOneChar: false },
    DIV: { name: 'DIV', validate: /\//, isOneChar: true },
    NUMBER: { name: 'NUMBER', validate: /([1-9][0-9]*|0)/, isOneChar: false },
    WS: {
      name: 'WS',
      validate: /[ \t\n\r]*/,
      isOneChar: false,
      skip: true
    },
    FUNC: { name: 'FUNC', validate: /[a-zA-Z]+/, isOneChar: false }
  },
  rules: {
    e: {
      name: 'e',
      transition: [
        {
          name: 'e',
          transitionCode: [
            { name: 't', args: undefined },
            { name: 'e_', args: '$t.val' },
            { code: "{$val={state:'e', terms: [$t.val, $e_.val]}}" }
          ]
        }
      ]
    },
    e_: {
      name: 'e_',
      transition: [
        {
          name: 'e_',
          transitionCode: [ '#', { code: "{$val={state: 'e_', terms: [] }}" } ]
        },
        {
          name: 'e_',
          transitionCode: [
            'ADD',
            { name: 't', args: undefined },
            { name: 'e_', args: '$val' },
            {
              code: "{$val={state:'e_', terms: [ $t.val,'ADD', $e_.val]}}"
            }
          ]
        },
        {
          name: 'e_',
          transitionCode: [
            'SUB',
            { name: 't', args: undefined },
            { name: 'e_', args: '$val' },
            {
              code: "{$val={state:'e_', terms: [ $t.val,'SUB', $e_.val]}}"
            }
          ]
        }
      ]
    },
    t: {
      name: 't',
      transition: [
        {
          name: 't',
          transitionCode: [
            { name: 'k', args: undefined },
            { name: 't_', args: '$k.val' },
            { code: "{$val={state:'t', terms: [$k.val, $t_.val]}}" }
          ]
        }
      ]
    },
    t_: {
      name: 't_',
      transition: [
        {
          name: 't_',
          transitionCode: [
            'MUL',
            { name: 'k', args: undefined },
            { name: 't_', args: '$val' },
            {
              code: "{$val={state:'t_', terms: [$k.val, 'MUL', $t_.val]}}"
            }
          ]
        },
        {
          name: 't_',
          transitionCode: [
            'DIV',
            { name: 'k', args: undefined },
            { name: 't_', args: '$val' },
            {
              code: "{$val={state:'t_', terms: [$k.val, 'DIV', $t_.val]}}"
            }
          ]
        },
        {
          name: 't_',
          transitionCode: [ '#', { code: "{$val={state: 't_', terms: [] }}" } ]
        }
      ]
    },
    k: {
      name: 'k',
      transition: [
        {
          name: 'k',
          transitionCode: [
            { name: 'f', args: undefined },
            { name: 'k_', args: '$f.val' },
            { code: "{$val={state:'k', terms: [$f.val, $k_.val]}}" }
          ]
        }
      ]
    },
    k_: {
      name: 'k_',
      transition: [
        {
          name: 'k_',
          transitionCode: [
            'LOG',
            { name: 'k', args: undefined },
            { code: "{$val={state:'k_', terms: ['LOG', $k.val]}}" }
          ]
        },
        {
          name: 'k_',
          transitionCode: [ '#', { code: "{$val={state: 'k_', terms: [] }}" } ]
        }
      ]
    },
    f: {
      name: 'f',
      transition: [
        {
          name: 'f',
          transitionCode: [
            'OPEN_BR',
            { name: 'e', args: undefined },
            'CLOSE_BR',
            {
              code: "{$val={state:'f', terms: ['OPEN_BR', $e.val, 'CLOSE_BR']}}"
            }
          ]
        },
        {
          name: 'f',
          transitionCode: [
            'NUMBER',
            {
              code: "{$val={state:'f',terms:[{name:'NUMBER',value:+$NUMBER.text}]}}"
            }
          ]
        },
        {
          name: 'f',
          transitionCode: [
            'SUB',
            { name: 'f', args: undefined },
            { code: "{$val={state:'f', terms: ['SUB', $f.val]}}" }
          ]
        },
        {
          name: 'f',
          transitionCode: [
            'FUNC',
            { name: 'f', args: undefined },
            {
              code: "{$val={state:'f',terms:[{name:'FUNC',value:$FUNC.text},$f.val]}}"
            }
          ]
        }
      ]
    }
  },
  declare: {
    e: { name: 'e', args: undefined, returns: [ 'val' ] },
    e_: { name: 'e_', args: [ 'i' ], returns: [ 'val' ] },
    t: { name: 't', args: undefined, returns: [ 'val' ] },
    t_: { name: 't_', args: [ 'i' ], returns: [ 'val' ] },
    k: { name: 'k', args: undefined, returns: [ 'val' ] },
    k_: { name: 'k_', args: [ 'i' ], returns: [ 'val' ] },
    f: { name: 'f', args: undefined, returns: [ 'val' ] }
  }
}
