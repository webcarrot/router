import {
  RouteInterface,
  Payload,
  Output,
  MatchInfo,
  Context,
  OnStart,
  OnError,
  OnEnd
} from "../../types";

import { RouteContext, FullContext } from "./types";

import { make as makeLinkProvider } from "./../link";
import { make as makeNavigateProvider } from "./../navigate";
import { make as makeNavigateToUrlProvider } from "./../navigateToUrl";
import { makeChangeUrl } from "..";

export const make = <
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
>(
  routes: MAP,
  context: C,
  onStart?: OnStart,
  onEnd?: OnEnd<typeof routes, P, C>,
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
  routeContext.navigateToUrl = makeNavigateToUrlProvider<typeof routes, P, C>(
    routes,
    fullContext,
    onStart,
    onEnd,
    onError
  );

  routeContext.changeUrl = makeChangeUrl<typeof routes, P, C>(
    routes,
    fullContext,
    onStart,
    onEnd,
    onError
  );

  return fullContext;
};
