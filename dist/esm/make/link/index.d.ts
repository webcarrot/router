import { Context, RoutesMap, RouteInterface } from "../../types";
import { FullContext } from "..";
export declare const make: <MAP extends RouteInterface<any, any, any, C>, C extends Context = Context>(routes: RoutesMap<MAP>, context: FullContext<MAP, C>) => <ID extends MAP["id"]>(id: ID, payload: Exclude<import("../../types").Unpacked<ReturnType<import("../../types").ExtractRoute<ID, MAP>["match"]>>, false>) => string;
