import { RouteInterface, Payload, Output, MatchInfo, Context, OnStart, OnError } from "../types";
export declare const execute: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C>;
}, P extends Payload = Payload, C extends Context = Context>(routes: MAP, payload: P, context: C, prepare?: boolean, onStart?: OnStart, onError?: OnError) => Promise<Exclude<import("../types").Unpacked<ReturnType<MAP[keyof MAP]["execute"]>>, false>>;
