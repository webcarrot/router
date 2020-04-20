import * as React from "react";

import { Context, RouteInterface } from "../types";

import { ReactContextValue } from "../make/reactContextProvider/types";
import { Display } from "../component/Display";

export const make = <
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context
>(
  ReactContext: React.Context<ReactContextValue<MAP, C>>
) =>
  React.memo(() => Display<MAP, C>({ ReactContext }));
