import { RouteInterface, Payload, Output, ComponentProps, MatchInfo, Context, OnStart, OnError } from "../types";
export declare const execute: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C, CP>;
}, P extends Payload = Payload, C extends Context = Context, CP extends ComponentProps = ComponentProps>(routes: MAP, payload: P, context: C, prepare?: boolean, onStart?: OnStart, onError?: OnError) => Promise<Exclude<import("../types").Unpacked<ReturnType<MAP[keyof MAP]["execute"]>>, false>>;
