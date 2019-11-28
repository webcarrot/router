import * as React from "react";
import { Context, RoutesMap, RouteInterface } from "../types";
import { ReactContextValue, RouteInfo } from "../make/reactContextProvider/types";
import { FullContext } from "@webcarrot/router";
export declare const ContextProvider: React.MemoExoticComponent<(<MAP extends RouteInterface<any, any, any, C>, C extends Context>({ routes, context, initialInfo, ReactContext, children }: {
    routes: RoutesMap<MAP>;
    context: FullContext<MAP, C>;
    initialInfo: RouteInfo<MAP, C>;
    ReactContext: React.Context<ReactContextValue<MAP, C>>;
    children: React.ReactNode;
}) => JSX.Element)>;
