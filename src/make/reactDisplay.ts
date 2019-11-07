import * as React from "react";

import { Payload, Context, RoutesMap } from "../types";

import { ReactContextValue } from "../make/reactContextProvider/types";
import { Display } from "../component";

export const make = <
  MAP extends RoutesMap<MAP, P, C>,
  P extends Payload,
  C extends Context
>(
  ReactContext: React.Context<ReactContextValue<MAP, P, C>>
) => React.memo(() => Display<MAP, P, C>({ ReactContext }));
