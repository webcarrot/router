import { Context, RouteInterface } from "../../types";

import { ReactContextValue } from "./types";

import { createContext } from "react";

export const make = <
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context
>() => createContext<ReactContextValue<MAP, C>>(null);
