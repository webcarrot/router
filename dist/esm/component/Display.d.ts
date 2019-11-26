import * as React from "react";
import { Payload, Context, RouteInterface, MatchInfo, Output } from "../types";
import { ReactContextValue } from "../make/reactContextProvider/types";
export declare const Display: <MAP extends RouteInterface<any, P, MatchInfo, Output, C>, P extends Payload, C extends Context>({ ReactContext }: {
    ReactContext: React.Context<ReactContextValue<MAP, P, C>>;
}) => JSX.Element;
export declare const DisplayMemo: React.MemoExoticComponent<(<MAP extends RouteInterface<any, P, MatchInfo, Output, C>, P extends Payload, C extends Context>({ ReactContext }: {
    ReactContext: React.Context<ReactContextValue<MAP, P, C>>;
}) => JSX.Element)>;
