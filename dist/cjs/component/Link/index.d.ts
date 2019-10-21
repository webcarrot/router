import * as React from "react";
import { RouteInterface, Payload, Output, MatchInfo, Context } from "../../types";
import { ReactContextValue } from "../../make/reactContextProvider/types";
import { LinkProps } from "./types";
export declare const Link: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C>;
}, P extends Payload, C extends Context, ID extends keyof MAP>({ route, match, ReactContext, onClick, href, changeType, ...rest }: LinkProps<MAP, P, C, ID> & {
    ReactContext: React.Context<ReactContextValue<MAP, P, C>>;
}, ref?: any) => JSX.Element;
export declare const LinkMemo: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C>;
}, P extends Payload, C extends Context, ID extends keyof MAP>({ route, match, ReactContext, onClick, href, changeType, ...rest }: LinkProps<MAP, P, C, ID> & {
    ReactContext: React.Context<ReactContextValue<MAP, P, C>>;
}, ref?: any) => JSX.Element;
