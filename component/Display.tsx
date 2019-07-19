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
      ComponentProps
    >;
  },
  P extends Payload,
  C extends Context
>({
  ReactContext
}: {
  ReactContext: React.Context<ReactContextValue<MAP, P, C>>;
}) => {
  const { info } = React.useContext(ReactContext);
  const { Component, match, output, route } = info;
  return <Component match={match} output={output} route={route} />;
};
