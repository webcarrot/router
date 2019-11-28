import { Context, OnStart, OnError, OnEnd, RoutesMap, RouteInterface } from "../types";
import { ChangeType } from "../utils/enums";
import { FullContext } from "./context/types";
export declare const make: <MAP extends RouteInterface<any, any, any, C>, C extends Context = Context>(routes: RoutesMap<MAP>, context: FullContext<MAP, C>, onStart?: OnStart, onEnd?: OnEnd<MAP, C>, onError?: OnError) => <ID extends MAP["id"]>(id: ID, { match, prepare, no, changeType }: {
    match?: any;
    prepare?: boolean;
    no?: number;
    changeType?: ChangeType;
}) => Promise<void>;
