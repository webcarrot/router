import * as React from "react";

import { Payload, Context, RouteInterface, MatchInfo, Output } from "../types";

import { ReactContextValue } from "../make/reactContextProvider/types";
import { Display } from "../component";

export const make = <
  MAP extends RouteInterface<any, P, MatchInfo, Output, C>,
  P extends Payload,
  C extends Context
>(
  ReactContext: React.Context<ReactContextValue<MAP, P, C>>
) => React.memo(() => Display<MAP, P, C>({ ReactContext }));
