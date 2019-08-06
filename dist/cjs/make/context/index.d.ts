import { RouteInterface, Payload, Output, ComponentProps, MatchInfo, Context, OnStart, OnError, OnEnd } from "../../types";
import { FullContext } from "./types";
export declare const make: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C, CP>;
}, P extends Payload, C extends Context, CP extends ComponentProps>(routes: MAP, context: C, onStart?: OnStart, onEnd?: OnEnd<MAP, P, C, CP>, onError?: OnError) => FullContext<MAP, P, C, CP>;
