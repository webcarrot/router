import { Output, Payload, RouteInterface, MatchInfo, ComponentProps, Context, Build, Match } from "../../types";
import { RouteInit } from "./types";
export declare const make: <ID extends string, P extends Payload, M extends MatchInfo, O extends Output, C extends Context, CP extends ComponentProps>(id: ID, { match, build }: {
    match: Match<P, M, C>;
    build: Build<M, C>;
}, init: RouteInit<ID, P, M, O, C, CP>) => RouteInterface<ID, P, M, O, C, CP>;
