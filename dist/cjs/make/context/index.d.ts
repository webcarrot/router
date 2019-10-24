import { RouteInterface, Payload, Output, MatchInfo, Context, OnStart, OnError, OnEnd } from "../../types";
import { FullContext } from "./types";
export declare const make: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C>;
}, P extends Payload, C extends Context>(routes: MAP, context: C, onStart?: OnStart, onEnd?: OnEnd<MAP, P, C>, onError?: OnError, onChange?: OnEnd<MAP, P, C>) => FullContext<MAP, P, C>;
