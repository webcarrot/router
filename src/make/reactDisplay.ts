import { memo, Context as RContext } from "react";

import { Context, RouteInterface } from "../types";

import { ReactContextValue } from "../make/reactContextProvider/types";
import { Display } from "../component/Display";

export function make<
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context
>(ReactContext: RContext<ReactContextValue<MAP, C>>) {
  return memo(() => Display<MAP, C>({ ReactContext }));
}
