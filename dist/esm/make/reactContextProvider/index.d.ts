/// <reference types="react" />
import { Context, RouteInterface } from "../../types";
import { ReactContextValue } from "./types";
export declare const make: <MAP extends RouteInterface<any, any, any, C>, C extends Context>() => import("react").Context<ReactContextValue<MAP, C>>;
