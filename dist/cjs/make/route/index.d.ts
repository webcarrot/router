import { Output, RouteInterface, MatchInfo, Context, Build, Match } from "../../types";
import { RouteInit } from "./types";
export declare const make: <ID, M extends MatchInfo, O extends Output, C extends Context>(id: ID, match: Match<M, C>, build: Build<M, C>, init: RouteInit<ID, M, O, C>) => RouteInterface<ID, M, O, C>;
