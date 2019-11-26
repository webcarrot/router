import * as React from "react";
import { Payload, Context, RoutesMap, RouteInterface, MatchInfo, Output } from "../../types";
import { ReactContextValue, RouteInfo } from "../../make/reactContextProvider/types";
export declare const ContextWrapper: <MAP extends RouteInterface<any, P, MatchInfo, Output, C>, P extends Payload, C extends Context>({ routes, context, initialInfo, ReactContext, children }: {
    routes: RoutesMap<MAP, P, C>;
    context: C;
    initialInfo: RouteInfo<MAP, P, C>;
    ReactContext: React.Context<ReactContextValue<MAP, P, C>>;
    children: React.ReactNode;
}) => JSX.Element;
export declare const ContextWrapperMemo: <MAP extends RouteInterface<any, P, MatchInfo, Output, C>, P extends Payload, C extends Context>({ routes, context, initialInfo, ReactContext, children }: {
    routes: RoutesMap<MAP, P, C>;
    context: C;
    initialInfo: RouteInfo<MAP, P, C>;
    ReactContext: React.Context<ReactContextValue<MAP, P, C>>;
    children: React.ReactNode;
}) => JSX.Element;
