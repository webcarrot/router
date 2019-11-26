import {
  Payload,
  Context,
  RouteInterface,
  MatchInfo,
  Output
} from "../../types";

import { ReactContextValue } from "./types";

import { createContext } from "react";

export const make = <
  MAP extends RouteInterface<any, P, MatchInfo, Output, C>,
  P extends Payload,
  C extends Context
>() => createContext<ReactContextValue<MAP, P, C>>(null);
