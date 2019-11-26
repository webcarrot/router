/// <reference types="react" />
import { Payload, Context, RouteInterface, MatchInfo, Output } from "../../types";
import { ReactContextValue } from "./types";
export declare const make: <MAP extends RouteInterface<any, P, MatchInfo, Output, C>, P extends Payload, C extends Context>() => import("react").Context<ReactContextValue<MAP, P, C>>;
