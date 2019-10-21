import { RouteInterface, Payload, Output, MatchInfo, Context, OnStart, OnError, OnEnd } from "../types";
import { FullContext } from "./context/types";
export declare const make: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C>;
}, P extends Payload = Payload, C extends Context = Context>(routes: MAP, context: FullContext<MAP, P, C>, onStart?: OnStart, onEnd?: OnEnd<MAP, P, C>, onError?: OnError) => (payload: P) => Promise<void>;
