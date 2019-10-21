import * as React from "react";
import { RouteInterface, Payload, Output, MatchInfo, Context } from "../types";
import { ReactContextValue } from "../make/reactContextProvider/types";
import { LinkProps } from "../component/Link/types";
export declare const make: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C>;
}, P extends Payload, C extends Context>(ReactContext: React.Context<ReactContextValue<MAP, P, C>>) => <ID extends keyof MAP>(props: LinkProps<MAP, P, C, ID>, ref?: any) => JSX.Element;
