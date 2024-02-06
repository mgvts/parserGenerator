lexer grammar grammLexer;

TOKENS: '@token' -> pushMode(TOKENSMODE);
STATES: '@states' -> pushMode(STATESMODE);
DECLARE: '@dec' -> pushMode(DECLAREMODE);
//MEMBERS: '@mem' -> pushMode(MEMBERSMODE);


GRAMMAR: 'grammar';
SEMI: ';';
COLON: ':';
OPEN_CR: '{';
CLOSE_CR: '}';

UPPER: [A-Z];
LOWER: [a-z];
DIGIT: [0-9];

ALPHADIGIT: (UPPER | LOWER | DIGIT)+;

WS: [ \t\r\n] -> skip;


mode TOKENSMODE;
    WS1: WS -> skip;
    TOKENOPEN: '{' -> type(OPEN_CR);
    TOKENCLOSE: '}' -> type(CLOSE_CR), popMode;

    TOKEN_NAME: (UPPER | '_')+;
    TOKENVALUE: ':' ~([;])+ ';';

mode STATESMODE;
    STATEINNER: '->'
    (TOKEN_NAME | LOWER | WS2
    | '[' | ']' | '$' | '.' | '(' | ')'
    | '{' | '}' | '=' | '#' | '+' | '-'
    | '*' | '/' | '\'' | '"' | ':' | '_'
    | ',')+
    ';';
    WS2: WS -> skip;
    STATEOPEN: '{' -> type(OPEN_CR);
    STATECLOSE: '}' -> type(CLOSE_CR), popMode;
    CODEBLOKE: [{}];
    STATE_NAME: (LOWER | '_')+;


mode DECLAREMODE;
    WS3: WS -> skip;
    DEC_ARG: '@a[' ~([\]])+ ']';
    DEC_RETURN: '@r[' ~([\]])+ ']';
    DECOPEN: '{' -> type(OPEN_CR);
    DECCLOSE: '}' -> type(CLOSE_CR), popMode;
    DECNAME: (LOWER | '_')+;
    DECSEMI: SEMI -> type(SEMI);

//mode MEMBERSMODE;
//    WS4: WS -> skip;
//    ANYTHING: ( NormalText | String | Block)*;
//    NormalText :		(~ ('{' | '}' | '"'))*;
//    String: '"' (~ '"')* '"';
//    Block: '{' (NormalText | String)* '}';
//    WHOLE: '{' ANYTHING '}' -> popMode;
