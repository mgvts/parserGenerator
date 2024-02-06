// Generated from generator/antlr/grammParser.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import grammParserListener from "./grammParserListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


    import {Gramm, TokenMap, Token, Rule, RuleMap} from 'Gramm.ts'

export default class grammParser extends Parser {
	public static readonly TOKENS = 1;
	public static readonly STATES = 2;
	public static readonly DECLARE = 3;
	public static readonly GRAMMAR = 4;
	public static readonly SEMI = 5;
	public static readonly COLON = 6;
	public static readonly OPEN_CR = 7;
	public static readonly CLOSE_CR = 8;
	public static readonly UPPER = 9;
	public static readonly LOWER = 10;
	public static readonly DIGIT = 11;
	public static readonly ALPHADIGIT = 12;
	public static readonly WS = 13;
	public static readonly WS1 = 14;
	public static readonly TOKEN_NAME = 15;
	public static readonly TOKENVALUE = 16;
	public static readonly STATEINNER = 17;
	public static readonly WS2 = 18;
	public static readonly CODEBLOKE = 19;
	public static readonly STATE_NAME = 20;
	public static readonly WS3 = 21;
	public static readonly DEC_ARG = 22;
	public static readonly DEC_RETURN = 23;
	public static readonly DECNAME = 24;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_read = 0;
	public static readonly RULE_name = 1;
	public static readonly RULE_token = 2;
	public static readonly RULE_one_token = 3;
	public static readonly RULE_declares = 4;
	public static readonly RULE_declare = 5;
	public static readonly RULE_states = 6;
	public static readonly RULE_stat = 7;
	public static readonly literalNames: (string | null)[] = [ null, "'@token'", 
                                                            "'@states'", 
                                                            "'@dec'", "'grammar'", 
                                                            "';'", "':'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "TOKENS", 
                                                             "STATES", "DECLARE", 
                                                             "GRAMMAR", 
                                                             "SEMI", "COLON", 
                                                             "OPEN_CR", 
                                                             "CLOSE_CR", 
                                                             "UPPER", "LOWER", 
                                                             "DIGIT", "ALPHADIGIT", 
                                                             "WS", "WS1", 
                                                             "TOKEN_NAME", 
                                                             "TOKENVALUE", 
                                                             "STATEINNER", 
                                                             "WS2", "CODEBLOKE", 
                                                             "STATE_NAME", 
                                                             "WS3", "DEC_ARG", 
                                                             "DEC_RETURN", 
                                                             "DECNAME" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"read", "name", "token", "one_token", "declares", "declare", "states", 
		"stat",
	];
	public get grammarFileName(): string { return "grammParser.g4"; }
	public get literalNames(): (string | null)[] { return grammParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return grammParser.symbolicNames; }
	public get ruleNames(): string[] { return grammParser.ruleNames; }
	public get serializedATN(): number[] { return grammParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}


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


	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, grammParser._ATN, grammParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public read(): ReadContext {
		let localctx: ReadContext = new ReadContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, grammParser.RULE_read);

		        localctx.g = {
		            name: '',
		            tokens: {} as TokenMap,
		            rules: {} as RuleMap
		        }
		    
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 16;
			localctx._nm = this.name();
			 localctx.g['name']   = localctx._nm.s    
			this.state = 27;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 27;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 1:
					{
					this.state = 18;
					localctx._ts = this.token();
					 localctx.g['tokens'] = {...localctx.g['tokens'],...localctx._ts.tkns} 
					}
					break;
				case 2:
					{
					this.state = 21;
					localctx._sts = this.states();
					 localctx.g['rules'] = {...localctx.g['rules'], ...localctx._sts.rules} 
					}
					break;
				case 3:
					{
					this.state = 24;
					localctx._dec = this.declares();
					 localctx.g['declare'] = {...localctx.g['declare'], ...localctx._dec.decs} 
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 29;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public name(): NameContext {
		let localctx: NameContext = new NameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, grammParser.RULE_name);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 31;
			this.match(grammParser.GRAMMAR);
			this.state = 32;
			localctx._nm = this.match(grammParser.ALPHADIGIT);
			this.state = 33;
			this.match(grammParser.SEMI);
			localctx.s = (localctx._nm != null ? localctx._nm.text : undefined)
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public token(): TokenContext {
		let localctx: TokenContext = new TokenContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, grammParser.RULE_token);

		        localctx.tkns = {}
		    
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 36;
			this.match(grammParser.TOKENS);
			this.state = 37;
			this.match(grammParser.OPEN_CR);
			this.state = 43;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===15) {
				{
				{
				this.state = 38;
				localctx._tk = this.one_token();
				 localctx.tkns[localctx._tk.tk.name] = localctx._tk.tk 
				}
				}
				this.state = 45;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 46;
			this.match(grammParser.CLOSE_CR);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public one_token(): One_tokenContext {
		let localctx: One_tokenContext = new One_tokenContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, grammParser.RULE_one_token);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 48;
			localctx._nm = this.match(grammParser.TOKEN_NAME);
			this.state = 49;
			localctx._val = this.match(grammParser.TOKENVALUE);
			localctx.tk = this.createToken((localctx._nm != null ? localctx._nm.text : undefined), (localctx._val != null ? localctx._val.text : undefined))
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public declares(): DeclaresContext {
		let localctx: DeclaresContext = new DeclaresContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, grammParser.RULE_declares);

		        localctx.decs= {}
		    
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 52;
			this.match(grammParser.DECLARE);
			this.state = 53;
			this.match(grammParser.OPEN_CR);
			this.state = 59;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===24) {
				{
				{
				this.state = 54;
				localctx._dec = this.declare_();

				        let {name} = localctx._dec.dec
				        localctx.decs[name] = localctx._dec.dec
				        
				}
				}
				this.state = 61;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 62;
			this.match(grammParser.CLOSE_CR);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public declare_(): DeclareContext {
		let localctx: DeclareContext = new DeclareContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, grammParser.RULE_declare);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 64;
			localctx._nm = this.match(grammParser.DECNAME);
			this.state = 69;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===22 || _la===23) {
				{
				this.state = 67;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 22:
					{
					this.state = 65;
					localctx._ar = this.match(grammParser.DEC_ARG);
					}
					break;
				case 23:
					{
					this.state = 66;
					localctx._ret = this.match(grammParser.DEC_RETURN);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 71;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 72;
			this.match(grammParser.SEMI);

			        localctx.dec = {
			            name: (localctx._nm != null ? localctx._nm.text : undefined),
			            args : this.getArgRet(localctx._ar),
			            returns: this.getArgRet(localctx._ret),
			        }
			    
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public states(): StatesContext {
		let localctx: StatesContext = new StatesContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, grammParser.RULE_states);

		        localctx.rules = {}
		    
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 75;
			this.match(grammParser.STATES);
			this.state = 76;
			this.match(grammParser.OPEN_CR);
			this.state = 82;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===20) {
				{
				{
				this.state = 77;
				localctx._st = this.stat();

				let {name} = localctx._st.rule
				localctx.rules[name] = {
				    name,
				    transition: [...(localctx.rules[name] ? localctx.rules[name].transition : []), localctx._st.rule]
				}
				        
				}
				}
				this.state = 84;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 85;
			this.match(grammParser.CLOSE_CR);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stat(): StatContext {
		let localctx: StatContext = new StatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, grammParser.RULE_stat);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 87;
			localctx._nm = this.match(grammParser.STATE_NAME);
			this.state = 88;
			localctx._r = this.match(grammParser.STATEINNER);

			        localctx.rule = {
			            name: (localctx._nm != null ? localctx._nm.text : undefined),
			            transitionCode: this.parse((localctx._r != null ? localctx._r.text : undefined).slice(2, -1))
			        }
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,24,92,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,4,0,28,8,0,11,0,12,0,29,1,1,1,1,1,1,1,1,1,1,1,
	2,1,2,1,2,1,2,1,2,5,2,42,8,2,10,2,12,2,45,9,2,1,2,1,2,1,3,1,3,1,3,1,3,1,
	4,1,4,1,4,1,4,1,4,5,4,58,8,4,10,4,12,4,61,9,4,1,4,1,4,1,5,1,5,1,5,5,5,68,
	8,5,10,5,12,5,71,9,5,1,5,1,5,1,5,1,6,1,6,1,6,1,6,1,6,5,6,81,8,6,10,6,12,
	6,84,9,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,0,0,8,0,2,4,6,8,10,12,14,0,0,91,0,
	16,1,0,0,0,2,31,1,0,0,0,4,36,1,0,0,0,6,48,1,0,0,0,8,52,1,0,0,0,10,64,1,
	0,0,0,12,75,1,0,0,0,14,87,1,0,0,0,16,17,3,2,1,0,17,27,6,0,-1,0,18,19,3,
	4,2,0,19,20,6,0,-1,0,20,28,1,0,0,0,21,22,3,12,6,0,22,23,6,0,-1,0,23,28,
	1,0,0,0,24,25,3,8,4,0,25,26,6,0,-1,0,26,28,1,0,0,0,27,18,1,0,0,0,27,21,
	1,0,0,0,27,24,1,0,0,0,28,29,1,0,0,0,29,27,1,0,0,0,29,30,1,0,0,0,30,1,1,
	0,0,0,31,32,5,4,0,0,32,33,5,12,0,0,33,34,5,5,0,0,34,35,6,1,-1,0,35,3,1,
	0,0,0,36,37,5,1,0,0,37,43,5,7,0,0,38,39,3,6,3,0,39,40,6,2,-1,0,40,42,1,
	0,0,0,41,38,1,0,0,0,42,45,1,0,0,0,43,41,1,0,0,0,43,44,1,0,0,0,44,46,1,0,
	0,0,45,43,1,0,0,0,46,47,5,8,0,0,47,5,1,0,0,0,48,49,5,15,0,0,49,50,5,16,
	0,0,50,51,6,3,-1,0,51,7,1,0,0,0,52,53,5,3,0,0,53,59,5,7,0,0,54,55,3,10,
	5,0,55,56,6,4,-1,0,56,58,1,0,0,0,57,54,1,0,0,0,58,61,1,0,0,0,59,57,1,0,
	0,0,59,60,1,0,0,0,60,62,1,0,0,0,61,59,1,0,0,0,62,63,5,8,0,0,63,9,1,0,0,
	0,64,69,5,24,0,0,65,68,5,22,0,0,66,68,5,23,0,0,67,65,1,0,0,0,67,66,1,0,
	0,0,68,71,1,0,0,0,69,67,1,0,0,0,69,70,1,0,0,0,70,72,1,0,0,0,71,69,1,0,0,
	0,72,73,5,5,0,0,73,74,6,5,-1,0,74,11,1,0,0,0,75,76,5,2,0,0,76,82,5,7,0,
	0,77,78,3,14,7,0,78,79,6,6,-1,0,79,81,1,0,0,0,80,77,1,0,0,0,81,84,1,0,0,
	0,82,80,1,0,0,0,82,83,1,0,0,0,83,85,1,0,0,0,84,82,1,0,0,0,85,86,5,8,0,0,
	86,13,1,0,0,0,87,88,5,20,0,0,88,89,5,17,0,0,89,90,6,7,-1,0,90,15,1,0,0,
	0,7,27,29,43,59,67,69,82];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!grammParser.__ATN) {
			grammParser.__ATN = new ATNDeserializer().deserialize(grammParser._serializedATN);
		}

		return grammParser.__ATN;
	}


	static DecisionsToDFA = grammParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ReadContext extends ParserRuleContext {
	public g: Gramm;
	public _nm!: NameContext;
	public _ts!: TokenContext;
	public _sts!: StatesContext;
	public _dec!: DeclaresContext;
	constructor(parser?: grammParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public name(): NameContext {
		return this.getTypedRuleContext(NameContext, 0) as NameContext;
	}
	public token_list(): TokenContext[] {
		return this.getTypedRuleContexts(TokenContext) as TokenContext[];
	}
	public token(i: number): TokenContext {
		return this.getTypedRuleContext(TokenContext, i) as TokenContext;
	}
	public states_list(): StatesContext[] {
		return this.getTypedRuleContexts(StatesContext) as StatesContext[];
	}
	public states(i: number): StatesContext {
		return this.getTypedRuleContext(StatesContext, i) as StatesContext;
	}
	public declares_list(): DeclaresContext[] {
		return this.getTypedRuleContexts(DeclaresContext) as DeclaresContext[];
	}
	public declares(i: number): DeclaresContext {
		return this.getTypedRuleContext(DeclaresContext, i) as DeclaresContext;
	}
    public get ruleIndex(): number {
    	return grammParser.RULE_read;
	}
	public enterRule(listener: grammParserListener): void {
	    if(listener.enterRead) {
	 		listener.enterRead(this);
		}
	}
	public exitRule(listener: grammParserListener): void {
	    if(listener.exitRead) {
	 		listener.exitRead(this);
		}
	}
}


export class NameContext extends ParserRuleContext {
	public s: string;
	public _nm!: Token;
	constructor(parser?: grammParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public GRAMMAR(): TerminalNode {
		return this.getToken(grammParser.GRAMMAR, 0);
	}
	public SEMI(): TerminalNode {
		return this.getToken(grammParser.SEMI, 0);
	}
	public ALPHADIGIT(): TerminalNode {
		return this.getToken(grammParser.ALPHADIGIT, 0);
	}
    public get ruleIndex(): number {
    	return grammParser.RULE_name;
	}
	public enterRule(listener: grammParserListener): void {
	    if(listener.enterName) {
	 		listener.enterName(this);
		}
	}
	public exitRule(listener: grammParserListener): void {
	    if(listener.exitName) {
	 		listener.exitName(this);
		}
	}
}


export class TokenContext extends ParserRuleContext {
	public tkns: TokenMap;
	public _tk!: One_tokenContext;
	constructor(parser?: grammParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TOKENS(): TerminalNode {
		return this.getToken(grammParser.TOKENS, 0);
	}
	public OPEN_CR(): TerminalNode {
		return this.getToken(grammParser.OPEN_CR, 0);
	}
	public CLOSE_CR(): TerminalNode {
		return this.getToken(grammParser.CLOSE_CR, 0);
	}
	public one_token_list(): One_tokenContext[] {
		return this.getTypedRuleContexts(One_tokenContext) as One_tokenContext[];
	}
	public one_token(i: number): One_tokenContext {
		return this.getTypedRuleContext(One_tokenContext, i) as One_tokenContext;
	}
    public get ruleIndex(): number {
    	return grammParser.RULE_token;
	}
	public enterRule(listener: grammParserListener): void {
	    if(listener.enterToken) {
	 		listener.enterToken(this);
		}
	}
	public exitRule(listener: grammParserListener): void {
	    if(listener.exitToken) {
	 		listener.exitToken(this);
		}
	}
}


export class One_tokenContext extends ParserRuleContext {
	public tk: Token;
	public _nm!: Token;
	public _val!: Token;
	constructor(parser?: grammParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TOKEN_NAME(): TerminalNode {
		return this.getToken(grammParser.TOKEN_NAME, 0);
	}
	public TOKENVALUE(): TerminalNode {
		return this.getToken(grammParser.TOKENVALUE, 0);
	}
    public get ruleIndex(): number {
    	return grammParser.RULE_one_token;
	}
	public enterRule(listener: grammParserListener): void {
	    if(listener.enterOne_token) {
	 		listener.enterOne_token(this);
		}
	}
	public exitRule(listener: grammParserListener): void {
	    if(listener.exitOne_token) {
	 		listener.exitOne_token(this);
		}
	}
}


export class DeclaresContext extends ParserRuleContext {
	public decs: DeclareMap;
	public _dec!: DeclareContext;
	constructor(parser?: grammParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DECLARE(): TerminalNode {
		return this.getToken(grammParser.DECLARE, 0);
	}
	public OPEN_CR(): TerminalNode {
		return this.getToken(grammParser.OPEN_CR, 0);
	}
	public CLOSE_CR(): TerminalNode {
		return this.getToken(grammParser.CLOSE_CR, 0);
	}
	public declare__list(): DeclareContext[] {
		return this.getTypedRuleContexts(DeclareContext) as DeclareContext[];
	}
	public declare_(i: number): DeclareContext {
		return this.getTypedRuleContext(DeclareContext, i) as DeclareContext;
	}
    public get ruleIndex(): number {
    	return grammParser.RULE_declares;
	}
	public enterRule(listener: grammParserListener): void {
	    if(listener.enterDeclares) {
	 		listener.enterDeclares(this);
		}
	}
	public exitRule(listener: grammParserListener): void {
	    if(listener.exitDeclares) {
	 		listener.exitDeclares(this);
		}
	}
}


export class DeclareContext extends ParserRuleContext {
	public dec: DeclareRule;
	public _nm!: Token;
	public _ar!: Token;
	public _ret!: Token;
	constructor(parser?: grammParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SEMI(): TerminalNode {
		return this.getToken(grammParser.SEMI, 0);
	}
	public DECNAME(): TerminalNode {
		return this.getToken(grammParser.DECNAME, 0);
	}
	public DEC_ARG_list(): TerminalNode[] {
	    	return this.getTokens(grammParser.DEC_ARG);
	}
	public DEC_ARG(i: number): TerminalNode {
		return this.getToken(grammParser.DEC_ARG, i);
	}
	public DEC_RETURN_list(): TerminalNode[] {
	    	return this.getTokens(grammParser.DEC_RETURN);
	}
	public DEC_RETURN(i: number): TerminalNode {
		return this.getToken(grammParser.DEC_RETURN, i);
	}
    public get ruleIndex(): number {
    	return grammParser.RULE_declare;
	}
	public enterRule(listener: grammParserListener): void {
	    if(listener.enterDeclare) {
	 		listener.enterDeclare(this);
		}
	}
	public exitRule(listener: grammParserListener): void {
	    if(listener.exitDeclare) {
	 		listener.exitDeclare(this);
		}
	}
}


export class StatesContext extends ParserRuleContext {
	public rules: RuleMap;
	public _st!: StatContext;
	constructor(parser?: grammParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STATES(): TerminalNode {
		return this.getToken(grammParser.STATES, 0);
	}
	public OPEN_CR(): TerminalNode {
		return this.getToken(grammParser.OPEN_CR, 0);
	}
	public CLOSE_CR(): TerminalNode {
		return this.getToken(grammParser.CLOSE_CR, 0);
	}
	public stat_list(): StatContext[] {
		return this.getTypedRuleContexts(StatContext) as StatContext[];
	}
	public stat(i: number): StatContext {
		return this.getTypedRuleContext(StatContext, i) as StatContext;
	}
    public get ruleIndex(): number {
    	return grammParser.RULE_states;
	}
	public enterRule(listener: grammParserListener): void {
	    if(listener.enterStates) {
	 		listener.enterStates(this);
		}
	}
	public exitRule(listener: grammParserListener): void {
	    if(listener.exitStates) {
	 		listener.exitStates(this);
		}
	}
}


export class StatContext extends ParserRuleContext {
	public rule: transitionRule;
	public _nm!: Token;
	public _r!: Token;
	constructor(parser?: grammParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STATE_NAME(): TerminalNode {
		return this.getToken(grammParser.STATE_NAME, 0);
	}
	public STATEINNER(): TerminalNode {
		return this.getToken(grammParser.STATEINNER, 0);
	}
    public get ruleIndex(): number {
    	return grammParser.RULE_stat;
	}
	public enterRule(listener: grammParserListener): void {
	    if(listener.enterStat) {
	 		listener.enterStat(this);
		}
	}
	public exitRule(listener: grammParserListener): void {
	    if(listener.exitStat) {
	 		listener.exitStat(this);
		}
	}
}
