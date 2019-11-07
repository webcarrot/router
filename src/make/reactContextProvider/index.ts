import { Payload, Context, RoutesMap } from "../../types";

import { ReactContextValue } from "./types";

import { createContext } from "react";

export const make = <
  MAP extends RoutesMap<MAP, P, C>,
  P extends Payload,
  C extends Context
>() => createContext<ReactContextValue<MAP, P, C>>(null);
