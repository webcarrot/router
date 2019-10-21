import * as React from "react";
import { RouteInterface, Payload, Output, MatchInfo, Context } from "../types";
import { ReactContextValue } from "../make/reactContextProvider/types";
export declare const Display: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C>;
}, P extends Payload, C extends Context>({ ReactContext }: {
    ReactContext: React.Context<ReactContextValue<MAP, P, C>>;
}) => JSX.Element;
export declare const DisplayMemo: React.MemoExoticComponent<(<MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C>;
}, P extends Payload, C extends Context>({ ReactContext }: {
    ReactContext: React.Context<ReactContextValue<MAP, P, C>>;
}) => JSX.Element)>;
