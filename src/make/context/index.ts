import {
  Context,
  OnStart,
  OnError,
  OnEnd,
  RoutesMap,
  RouteInterface,
} from "../../types";

import { RouteContext, FullContext } from "./types";

import { make as makeLinkProvider } from "./../link";
import { make as makeNavigateProvider } from "./../navigate";
import { make as makeNavigateToUrlProvider } from "./../navigateToUrl";
import { makeChangeUrl } from "..";

export const make = <
  MAP extends RouteInterface<any, any, any, any>,
  C extends Context
>(
  routes: RoutesMap<MAP>,
  context: C,
  onStart?: OnStart,
  onEnd?: OnEnd<MAP, any>,
  onError?: OnError,
  onChange?: OnEnd<MAP, any>
): FullContext<MAP, C> => {
  const routeContext = {} as RouteContext<MAP, C>;
  const fullContext = { ...context, route: routeContext } as FullContext<
    MAP,
    C
  >;
  routeContext.makeLink = makeLinkProvider<MAP, C>(routes, fullContext);
  routeContext.navigate = makeNavigateProvider<MAP, C>(
    routes,
    fullContext,
    onStart,
    onEnd,
    onError
  );
  routeContext.navigateToUrl = makeNavigateToUrlProvider<MAP, C>(
    routes,
    fullContext,
    onStart,
    onEnd,
    onError
  );
  routeContext.changeUrl = makeChangeUrl<MAP, C>(routes, fullContext, onChange);
  return fullContext;
};
