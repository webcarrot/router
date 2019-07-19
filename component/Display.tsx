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

export const Display = <
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
>({
  ReactContext,
  ...rest
}: CP & {
  ReactContext: React.Context<ReactContextValue<MAP, P, C, CP>>;
}) => {
  const { info } = React.useContext(ReactContext);
  const { Component, match, output, route } = info;
  return (
    <Component
      {...(rest as any) as CP}
      route={route}
      match={match}
      output={output}
    />
  );
};

export const DisplayMemo = React.memo(Display);
