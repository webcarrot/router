import { Payload, Context, OnStart, OnError, RoutesMap, RouteInterface } from "../types";
import { FullContext } from "..";
export declare const execute: <MAP extends RouteInterface<any, any, any, C>, C extends Context = Context>(routes: RoutesMap<MAP>, payload: Payload, context: FullContext<MAP, C>, prepare?: boolean, onStart?: OnStart, onError?: OnError) => Promise<Exclude<import("..").Unpacked<ReturnType<import("..").ExtractRoute<MAP["id"], MAP>["execute"]>>, false>>;
