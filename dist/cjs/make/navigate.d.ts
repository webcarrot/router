import { Payload, Context, OnStart, OnError, OnEnd, RoutesMap, RouteInterface, MatchInfo, Output } from "../types";
import { ChangeType } from "../utils/enums";
import { FullContext } from "./context/types";
export declare const make: <MAP extends RouteInterface<any, P, MatchInfo, Output, C>, P extends Payload = Payload, C extends Context = Context>(routes: RoutesMap<MAP, P, C>, context: FullContext<MAP, P, C>, onStart?: OnStart, onEnd?: OnEnd<MAP, P, C>, onError?: OnError) => <ID extends MAP["id"]>(id: ID, { match, prepare, no, changeType }: {
    match?: any;
    prepare?: boolean;
    no?: number;
    changeType?: ChangeType;
}) => Promise<void>;
