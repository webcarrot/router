import * as React from "react";
import { RouteInterface, Payload, Output, ComponentProps, MatchInfo, Context } from "../types";
import { ReactContextValue } from "../make/reactContextProvider/types";
import { LinkProps } from "../component/Link/types";
export declare const make: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C, CP>;
}, P extends Payload, C extends Context, CP extends ComponentProps>(ReactContext: React.Context<ReactContextValue<MAP, P, C, CP>>) => <ID extends keyof MAP>(props: LinkProps<MAP, P, C, CP, ID>, ref?: any) => JSX.Element;
