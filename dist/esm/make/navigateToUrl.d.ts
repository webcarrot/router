import { Payload, Context, OnStart, OnError, OnEnd, RoutesMap, RouteInterface } from "../types";
import { FullContext } from "./context/types";
export declare const make: <MAP extends RouteInterface<any, any, any, C>, C extends Context = Context>(routes: RoutesMap<MAP>, context: FullContext<MAP, C>, onStart?: OnStart, onEnd?: OnEnd<MAP, C>, onError?: OnError) => (payload: Payload) => Promise<void>;
