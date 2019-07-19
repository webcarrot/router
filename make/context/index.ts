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
      ComponentProps
    >;
  },
  P extends Payload,
  C extends Context
>(
  routes: MAP,
  context: C,
  onStart?: OnStart,
  onEnd?: OnEnd<MAP, P, C>,
  onError?: OnError
) => {
  const routeContext = {} as RouteContext<typeof routes, P, typeof context>;
  const fullContext = { ...context, route: routeContext } as FullContext<
    typeof routes,
    P,
    typeof context
  >;
  routeContext.makeLink = makeLinkProvider<typeof routes, P, C>(
    routes,
    fullContext
  );
  routeContext.navigate = makeNavigateProvider<typeof routes, P, C>(
    routes,
    fullContext,
    onStart,
    onEnd,
    onError
  );
  return fullContext;
};
