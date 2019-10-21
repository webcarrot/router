import {
  RouteInterface,
  Payload,
  Output,
  MatchInfo,
  Context
} from "../../types";

import { ReactContextValue } from "./types";

import { createContext } from "react";

export const make = <
  MAP extends {
    [key: string]: RouteInterface<
      Extract<keyof MAP, string>,
      P,
      MatchInfo,
      Output,
      C
    >;
  },
  P extends Payload,
  C extends Context
>() => createContext<ReactContextValue<MAP, P, C>>(null);
