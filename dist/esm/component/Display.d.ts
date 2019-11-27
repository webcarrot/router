import * as React from "react";
import { Context, RouteInterface } from "../types";
import { ReactContextValue } from "../make/reactContextProvider/types";
export declare const Display: <MAP extends RouteInterface<any, any, any, C>, C extends Context>({ ReactContext }: {
    ReactContext: React.Context<ReactContextValue<MAP, C>>;
}) => JSX.Element;
export declare const DisplayMemo: React.MemoExoticComponent<(<MAP extends RouteInterface<any, any, any, C>, C extends Context>({ ReactContext }: {
    ReactContext: React.Context<ReactContextValue<MAP, C>>;
}) => JSX.Element)>;
