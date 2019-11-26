import {
  Payload,
  Context,
  OnStart,
  OnError,
  OnEnd,
  RoutesMap,
  RouteInterface,
  MatchInfo,
  Output
} from "../../types";

import { RouteContext, FullContext } from "./types";

import { make as makeLinkProvider } from "./../link";
import { make as makeNavigateProvider } from "./../navigate";
import { make as makeNavigateToUrlProvider } from "./../navigateToUrl";
import { makeChangeUrl } from "..";

export const make = <
  MAP extends RouteInterface<any, P, MatchInfo, Output, any>,
  P extends Payload,
  C extends Context
>(
  routes: RoutesMap<MAP, P, any>,
  context: C,
  onStart?: OnStart,
  onEnd?: OnEnd<MAP, P, any>,
  onError?: OnError,
  onChange?: OnEnd<MAP, P, any>
): FullContext<MAP, P, C> => {
  const routeContext = {} as RouteContext<MAP, P, C>;
  const fullContext = { ...context, route: routeContext } as FullContext<
    MAP,
    P,
    C
  >;
  routeContext.makeLink = makeLinkProvider<MAP, P, C>(routes, fullContext);
  routeContext.navigate = makeNavigateProvider<MAP, P, C>(
    routes,
    fullContext,
    onStart,
    onEnd,
    onError
  );
  routeContext.navigateToUrl = makeNavigateToUrlProvider<MAP, P, C>(
    routes,
    fullContext,
    onStart,
    onEnd,
    onError
  );

  routeContext.changeUrl = makeChangeUrl<MAP, P, C>(
    routes,
    fullContext,
    onChange
  );

  return fullContext;
};
