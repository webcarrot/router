import * as React from "react";
import { Context, RoutesMap, RouteInterface } from "../types";
import { ReactContextValue } from "../make/reactContextProvider/types";
export declare const ContextProvider: React.MemoExoticComponent<(<MAP extends RouteInterface<any, any, any, C>, C extends Context>({ routes, context, initialInfo, ReactContext, children }: {
    routes: RoutesMap<MAP>;
    context: C;
    initialInfo: Exclude<import("../types").Unpacked<ReturnType<import("../types").ExtractRoute<MAP["id"], MAP>["execute"]>>, false>;
    ReactContext: React.Context<ReactContextValue<MAP, C>>;
    children: React.ReactNode;
}) => JSX.Element)>;
