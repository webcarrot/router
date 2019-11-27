import { Context, OnEnd, RoutesMap, RouteInterface } from "../types";
import { ChangeType } from "../utils/enums";
import { FullContext } from "./context/types";
export declare const make: <MAP extends RouteInterface<any, any, any, C>, C extends Context = Context>(routes: RoutesMap<MAP>, context: FullContext<MAP, C>, onChange?: OnEnd<MAP, C>) => <ID extends MAP["id"]>(id: ID, match: Exclude<import("../types").Unpacked<ReturnType<import("../types").ExtractRoute<ID, MAP>["match"]>>, false>, output: import("../types").Unpacked<ReturnType<import("../types").ExtractRoute<ID, MAP>["action"]>>, changeType?: ChangeType) => Promise<void>;
