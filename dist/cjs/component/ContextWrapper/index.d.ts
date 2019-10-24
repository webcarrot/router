import * as React from "react";
import { RouteInterface, Payload, Output, MatchInfo, Context } from "../../types";
import { ReactContextValue } from "../../make/reactContextProvider/types";
export declare const ContextWrapper: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C>;
}, P extends Payload, C extends Context>({ routes, context, initialInfo, ReactContext, children }: {
    routes: MAP;
    context: C;
    initialInfo: Exclude<import("../../types").Unpacked<ReturnType<MAP[Extract<keyof MAP, string>]["execute"]>>, false>;
    ReactContext: React.Context<ReactContextValue<MAP, P, C>>;
    children: React.ReactNode;
}) => JSX.Element;
export declare const ContextWrapperMemo: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C>;
}, P extends Payload, C extends Context>({ routes, context, initialInfo, ReactContext, children }: {
    routes: MAP;
    context: C;
    initialInfo: Exclude<import("../../types").Unpacked<ReturnType<MAP[Extract<keyof MAP, string>]["execute"]>>, false>;
    ReactContext: React.Context<ReactContextValue<MAP, P, C>>;
    children: React.ReactNode;
}) => JSX.Element;