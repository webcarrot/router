import { Payload, Context, OnStart, OnError, RoutesMap, RouteInterface, MatchInfo, Output } from "../types";
import { RouteInfo } from "../make/reactContextProvider/types";
export declare const execute: <MAP extends RouteInterface<any, P, MatchInfo, Output, C>, P extends Payload = Payload, C extends Context = Context>(routes: RoutesMap<MAP, P, C>, payload: P, context: C, prepare?: boolean, onStart?: OnStart, onError?: OnError) => Promise<RouteInfo<MAP, P, C>>;
