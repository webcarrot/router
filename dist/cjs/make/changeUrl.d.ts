import { Payload, Output, Context, OnEnd, RoutesMap, RouteInterface, MatchInfo } from "../types";
import { ChangeType } from "../utils/enums";
import { FullContext } from "./context/types";
export declare const make: <MAP extends RouteInterface<any, P, MatchInfo, Output, C>, P extends Payload = Payload, C extends Context = Context>(routes: RoutesMap<MAP, P, C>, context: FullContext<MAP, P, C>, onChange?: OnEnd<MAP, P, C>) => <ID extends MAP["id"]>(id: ID, match: Exclude<import("../types").Unpacked<ReturnType<import("../types").ExtractRoute<ID, MAP>["match"]>>, false>, output: import("../types").Unpacked<ReturnType<import("../types").ExtractRoute<ID, MAP>["action"]>>, changeType?: ChangeType) => Promise<void>;
