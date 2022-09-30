import { Context, RouteInterface } from "../../types";

import { ReactContextValue } from "./types";

import { createContext } from "react";

export function make<
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context
>() {
  return createContext<ReactContextValue<MAP, C>>(null as any);
}
