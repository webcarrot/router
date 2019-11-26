import * as React from "react";
import { Payload, Context, RouteInterface, MatchInfo, Output } from "../../types";
import { ReactContextValue } from "../../make/reactContextProvider/types";
import { ChangeType } from "../../utils/enums";
export declare const Link: <MAP extends RouteInterface<any, P, MatchInfo, Output, C>, P extends Payload, C extends Context>({ route, match, ReactContext, onClick, href, changeType, ...rest }: {
    href?: string;
    route: MAP["id"];
    match: Exclude<import("../../types").Unpacked<ReturnType<import("../../types").ExtractRoute<MAP["id"], MAP>["match"]>>, false>;
    changeType?: ChangeType;
} & React.ClassAttributes<HTMLAnchorElement> & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    ReactContext: React.Context<ReactContextValue<MAP, P, C>>;
}, ref?: any) => JSX.Element;
export declare const LinkMemo: <MAP extends RouteInterface<any, P, MatchInfo, Output, C>, P extends Payload, C extends Context>({ route, match, ReactContext, onClick, href, changeType, ...rest }: {
    href?: string;
    route: MAP["id"];
    match: Exclude<import("../../types").Unpacked<ReturnType<import("../../types").ExtractRoute<MAP["id"], MAP>["match"]>>, false>;
    changeType?: ChangeType;
} & React.ClassAttributes<HTMLAnchorElement> & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    ReactContext: React.Context<ReactContextValue<MAP, P, C>>;
}, ref?: any) => JSX.Element;
