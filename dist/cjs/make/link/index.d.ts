import { RouteInterface, Payload, Output, MatchInfo, Context } from "../../types";
import { LinkMatch } from "./types";
export declare const make: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C>;
}, P extends Payload = Payload, C extends Context = Context>(routes: MAP, context: C) => <N extends keyof MAP>(id: N, payload: LinkMatch<MAP[N]["build"], C, MatchInfo>) => string;
