import * as React from "react";

import { RouteInterface, Payload, Output, MatchInfo, Context } from "../types";

import { ReactContextValue } from "../make/reactContextProvider/types";

export const Display = <
  MAP extends {
    [key: string]: RouteInterface<
      Extract<keyof MAP, string>,
      P,
      MatchInfo,
      Output,
      C
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
  const { Component, match, output, route } = info();
  if (Component) {
    return <Component route={route} match={match} output={output} />;
  } else {
    return null;
  }
};

export const DisplayMemo = React.memo(Display);
