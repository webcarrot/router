/// <reference types="react" />
import { RouteInterface, Payload, Output, ComponentProps, MatchInfo, Context } from "../../types";
import { ReactContextValue } from "./types";
export declare const make: <MAP extends {
    [key: string]: RouteInterface<Extract<keyof MAP, string>, P, MatchInfo, Output, C, CP>;
}, P extends Payload, C extends Context, CP extends ComponentProps>() => import("react").Context<ReactContextValue<MAP, P, C, CP>>;
