import {
  RouteInterface,
  Payload,
  Output,
  ComponentProps,
  MatchInfo,
  Context,
  OnStart,
  OnError,
  OnEnd
} from "../../types";

import {
  RouteContext,
  FullContext,
  RouteContextLink,
  RouteContextNavigate
} from "./types";

import { make as makeLinkProvider } from "./../link";
import { make as makeNavigateProvider } from "./../navigate";

export { RouteContext, FullContext, RouteContextLink, RouteContextNavigate };

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
  routes: MAP,
  context: C,
  onStart?: OnStart,
  onEnd?: OnEnd<typeof routes, P, C, CP>,
  onError?: OnError
) => {
  const routeContext = {} as RouteContext<typeof routes, P, typeof context, CP>;
  const fullContext = { ...context, route: routeContext } as FullContext<
    typeof routes,
    P,
    typeof context,
    CP
  >;
  routeContext.makeLink = makeLinkProvider<typeof routes, P, C, CP>(
    routes,
    fullContext
  );
  routeContext.navigate = makeNavigateProvider<typeof routes, P, C, CP>(
    routes,
    fullContext,
    onStart,
    onEnd,
    onError
  );
  return fullContext;
};
