/// <reference types="react" />
import { RouteInterface, Payload, Output, MatchInfo, Context } from "../../types";
import { ReactContextValue } from "./types";
export declare const make: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C>;
}, P extends Payload, C extends Context>() => import("react").Context<ReactContextValue<MAP, P, C>>;
