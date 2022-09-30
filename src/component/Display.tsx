import { Context as RContext, useContext, memo } from "react";

import { Context, RouteInterface } from "../types";

import { ReactContextValue } from "../make/reactContextProvider/types";

export function Display<
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context
>({ ReactContext }: { ReactContext: RContext<ReactContextValue<MAP, C>> }) {
  const { info } = useContext(ReactContext);
  const { Component, match, output, route } = info();
  if (Component) {
    return <Component route={route} match={match} output={output} />;
  } else {
    return null;
  }
}

export const DisplayMemo = memo(Display) as typeof Display;
