import * as React from "react";

import { Payload, Context, RoutesMap } from "../types";

import { ReactContextValue } from "../make/reactContextProvider/types";

export const Display = <
  MAP extends RoutesMap<MAP, P, C>,
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
