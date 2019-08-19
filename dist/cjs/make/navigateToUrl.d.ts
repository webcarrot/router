import { RouteInterface, Payload, Output, ComponentProps, MatchInfo, Context, OnStart, OnError, OnEnd } from "../types";
export declare const make: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C, CP>;
}, P extends Payload = Payload, C extends Context = Context, CP extends ComponentProps = ComponentProps>(routes: MAP, context: C, onStart?: OnStart, onEnd?: OnEnd<MAP, P, C, CP>, onError?: OnError) => (payload: P) => Promise<void>;
