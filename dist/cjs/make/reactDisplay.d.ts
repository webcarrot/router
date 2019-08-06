import * as React from "react";
import { RouteInterface, Payload, Output, ComponentProps, MatchInfo, Context } from "../types";
import { ReactContextValue } from "../make/reactContextProvider/types";
export declare const make: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C, CP>;
}, P extends Payload, C extends Context, CP extends ComponentProps>(ReactContext: React.Context<ReactContextValue<MAP, P, C, CP>>) => React.MemoExoticComponent<(props: CP) => JSX.Element>;
