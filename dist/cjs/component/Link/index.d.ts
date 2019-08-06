import * as React from "react";
import { RouteInterface, Payload, Output, ComponentProps, MatchInfo, Context } from "../../types";
import { ReactContextValue } from "../../make/reactContextProvider/types";
import { LinkProps } from "./types";
export declare const Link: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C, CP>;
}, P extends Payload, C extends Context, CP extends ComponentProps, ID extends keyof MAP>({ route, match, ReactContext, onClick, href, changeType, ...rest }: LinkProps<MAP, P, C, CP, ID> & {
    ReactContext: React.Context<ReactContextValue<MAP, P, C, CP>>;
}, ref?: any) => JSX.Element;
export declare const LinkMemo: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C, CP>;
}, P extends Payload, C extends Context, CP extends ComponentProps, ID extends keyof MAP>({ route, match, ReactContext, onClick, href, changeType, ...rest }: LinkProps<MAP, P, C, CP, ID> & {
    ReactContext: React.Context<ReactContextValue<MAP, P, C, CP>>;
}, ref?: any) => JSX.Element;
