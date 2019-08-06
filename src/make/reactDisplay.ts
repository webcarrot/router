import * as React from "react";

import {
  RouteInterface,
  Payload,
  Output,
  ComponentProps,
  MatchInfo,
  Context
} from "../types";

import { ReactContextValue } from "../make/reactContextProvider/types";
import { Display } from "../component";

export const make = <
  MAP extends {
    [key: string]: RouteInterface<
      Extract<keyof MAP, string>,
      P,
      MatchInfo,
      Output,
      C,
      CP
    >;
  },
  P extends Payload,
  C extends Context,
  CP extends ComponentProps
>(
  ReactContext: React.Context<ReactContextValue<MAP, P, C, CP>>
) =>
  React.memo((props: CP) => Display<MAP, P, C, CP>({ ...props, ReactContext }));