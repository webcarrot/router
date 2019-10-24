import { RouteInterface, Payload, Output, MatchInfo, Context, OnEnd, Unpacked } from "../types";
import { ChangeType } from "../utils/enums";
import { FullContext } from "./context/types";
export declare const make: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C>;
}, P extends Payload = Payload, C extends Context = Context>(routes: MAP, context: FullContext<MAP, P, C>, onChange?: OnEnd<MAP, P, C>) => <N extends keyof MAP>(id: N, match: Exclude<Unpacked<ReturnType<MAP[N]["match"]>>, false>, out: Unpacked<ReturnType<MAP[N]["action"]>>, changeType?: ChangeType) => Promise<void>;
