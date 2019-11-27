import { Context, OnStart, OnError, OnEnd, RoutesMap, RouteInterface } from "../../types";
import { FullContext } from "./types";
export declare const make: <MAP extends RouteInterface<any, any, any, any>, C extends Context>(routes: RoutesMap<MAP>, context: C, onStart?: OnStart, onEnd?: OnEnd<MAP, any>, onError?: OnError, onChange?: OnEnd<MAP, any>) => FullContext<MAP, C>;
