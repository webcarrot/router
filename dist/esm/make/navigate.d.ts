import { RouteInterface, Payload, Output, MatchInfo, Context, OnStart, OnError, OnEnd } from "../types";
import { LinkMatch } from "./link/types";
import { ChangeType } from "../utils/enums";
import { FullContext } from "./context/types";
export declare const make: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C>;
}, P extends Payload = Payload, C extends Context = Context>(routes: MAP, context: FullContext<MAP, P, C>, onStart?: OnStart, onEnd?: OnEnd<MAP, P, C>, onError?: OnError) => {
    <N extends keyof MAP>(id: N, data: {
        match: LinkMatch<MAP[N]["build"], C, MatchInfo>;
        prepare?: boolean;
        method: "POST";
        no?: number;
        changeType?: ChangeType;
    }): Promise<void>;
    <N_1 extends keyof MAP>(id: N_1, data: {
        match: LinkMatch<MAP[N_1]["build"], C, MatchInfo>;
        prepare?: boolean;
        method?: "GET";
        no?: number;
        changeType?: ChangeType;
    }): Promise<void>;
};
