import * as React from "react";

import { Context, RouteInterface } from "../types";

import { ReactContextValue } from "../make/reactContextProvider/types";

export const Display = <
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context
>({
  ReactContext
}: {
  ReactContext: React.Context<ReactContextValue<MAP, C>>;
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
