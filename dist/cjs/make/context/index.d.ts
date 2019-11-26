import { Payload, Context, OnStart, OnError, OnEnd, RoutesMap, RouteInterface, MatchInfo, Output } from "../../types";
import { FullContext } from "./types";
export declare const make: <MAP extends RouteInterface<any, P, MatchInfo, Output, any>, P extends Payload, C extends Context>(routes: RoutesMap<MAP, P, any>, context: C, onStart?: OnStart, onEnd?: OnEnd<MAP, P, any>, onError?: OnError, onChange?: OnEnd<MAP, P, any>) => FullContext<MAP, P, C>;
