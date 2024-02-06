// Generated from generator/antlr/grammParser.g4 by ANTLR 4.13.1

import {ParseTreeListener} from "antlr4";


    import {Gramm, TokenMap, Token, Rule, RuleMap} from 'Gramm.ts'


import { ReadContext } from "./grammParser";
import { NameContext } from "./grammParser";
import { TokenContext } from "./grammParser";
import { One_tokenContext } from "./grammParser";
import { DeclaresContext } from "./grammParser";
import { DeclareContext } from "./grammParser";
import { StatesContext } from "./grammParser";
import { StatContext } from "./grammParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `grammParser`.
 */
export default class grammParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `grammParser.read`.
	 * @param ctx the parse tree
	 */
	enterRead?: (ctx: ReadContext) => void;
	/**
	 * Exit a parse tree produced by `grammParser.read`.
	 * @param ctx the parse tree
	 */
	exitRead?: (ctx: ReadContext) => void;
	/**
	 * Enter a parse tree produced by `grammParser.name`.
	 * @param ctx the parse tree
	 */
	enterName?: (ctx: NameContext) => void;
	/**
	 * Exit a parse tree produced by `grammParser.name`.
	 * @param ctx the parse tree
	 */
	exitName?: (ctx: NameContext) => void;
	/**
	 * Enter a parse tree produced by `grammParser.token`.
	 * @param ctx the parse tree
	 */
	enterToken?: (ctx: TokenContext) => void;
	/**
	 * Exit a parse tree produced by `grammParser.token`.
	 * @param ctx the parse tree
	 */
	exitToken?: (ctx: TokenContext) => void;
	/**
	 * Enter a parse tree produced by `grammParser.one_token`.
	 * @param ctx the parse tree
	 */
	enterOne_token?: (ctx: One_tokenContext) => void;
	/**
	 * Exit a parse tree produced by `grammParser.one_token`.
	 * @param ctx the parse tree
	 */
	exitOne_token?: (ctx: One_tokenContext) => void;
	/**
	 * Enter a parse tree produced by `grammParser.declares`.
	 * @param ctx the parse tree
	 */
	enterDeclares?: (ctx: DeclaresContext) => void;
	/**
	 * Exit a parse tree produced by `grammParser.declares`.
	 * @param ctx the parse tree
	 */
	exitDeclares?: (ctx: DeclaresContext) => void;
	/**
	 * Enter a parse tree produced by `grammParser.declare`.
	 * @param ctx the parse tree
	 */
	enterDeclare?: (ctx: DeclareContext) => void;
	/**
	 * Exit a parse tree produced by `grammParser.declare`.
	 * @param ctx the parse tree
	 */
	exitDeclare?: (ctx: DeclareContext) => void;
	/**
	 * Enter a parse tree produced by `grammParser.states`.
	 * @param ctx the parse tree
	 */
	enterStates?: (ctx: StatesContext) => void;
	/**
	 * Exit a parse tree produced by `grammParser.states`.
	 * @param ctx the parse tree
	 */
	exitStates?: (ctx: StatesContext) => void;
	/**
	 * Enter a parse tree produced by `grammParser.stat`.
	 * @param ctx the parse tree
	 */
	enterStat?: (ctx: StatContext) => void;
	/**
	 * Exit a parse tree produced by `grammParser.stat`.
	 * @param ctx the parse tree
	 */
	exitStat?: (ctx: StatContext) => void;
}

