import { Payload, Context, OnStart, OnError, RoutesMap, RouteInterface } from "../types";
import { RouteInfo } from "../make/reactContextProvider/types";
import { FullContext } from "..";
export declare const execute: <MAP extends RouteInterface<any, any, any, C>, C extends Context = Context>(routes: RoutesMap<MAP>, payload: Payload, context: FullContext<MAP, C>, prepare?: boolean, onStart?: OnStart, onError?: OnError) => Promise<RouteInfo<MAP, C>>;
