import { RouteInterface, Payload, Output, ComponentProps, MatchInfo, Context, OnStart, OnError, OnEnd } from "../types";
import { LinkMatch } from "./link/types";
import { ChangeType } from "../utils/enums";
export declare const make: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C, CP>;
}, P extends Payload = Payload, C extends Context = Context, CP extends ComponentProps = ComponentProps>(routes: MAP, context: C, onStart?: OnStart, onEnd?: OnEnd<MAP, P, C, CP>, onError?: OnError) => {
    <N extends keyof MAP>(id: N, data: {
        match: LinkMatch<MAP[N]["build"], C, MatchInfo>;
        prepare?: boolean;
        method: "POST";
        no?: number;
        changeType?: ChangeType;
    }): Promise<void>;
    <N extends keyof MAP>(id: N, data: {
        match: LinkMatch<MAP[N]["build"], C, MatchInfo>;
        prepare?: boolean;
        method?: "GET";
        no?: number;
        changeType?: ChangeType;
    }): Promise<void>;
};
