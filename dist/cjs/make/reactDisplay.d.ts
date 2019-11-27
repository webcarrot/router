import * as React from "react";
import { Context, RouteInterface } from "../types";
import { ReactContextValue } from "../make/reactContextProvider/types";
export declare const make: <MAP extends RouteInterface<any, any, any, C>, C extends Context>(ReactContext: React.Context<ReactContextValue<MAP, C>>) => React.MemoExoticComponent<() => JSX.Element>;
