import {
  RouteInterface,
  Payload,
  Output,
  ComponentProps,
  MatchInfo,
  Context,
  OnStart,
  OnError
} from "../types";
import { make as makeLinkProvider, LinkPayload } from "./link";
import { make as makeNavigateProvider } from "./navigate";

export type FullContext<
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
  P extends Payload = Payload,
  C extends Context = Context
> = C & {
  route: RouteContext<MAP, P, C>;
};

type RouteContext<
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
  P extends Payload = Payload,
  C extends Context = Context,
  D extends MAP = MAP
> = {
  makeLink: <N extends keyof D>(
    id: N,
    payload: LinkPayload<MatchInfo, C, D[N]["build"]>
  ) => string | false;
  navigate: {
    <N extends keyof D>(
      id: N,
      payload: LinkPayload<MatchInfo, C, D[N]["build"]>,
      prepare: boolean,
      method: "POST",
      body: any
    ): Promise<void>;
    <N extends keyof D>(
      id: N,
      payload: LinkPayload<MatchInfo, C, D[N]["build"]>,
      prepare: boolean,
      method: "GET"
    ): Promise<void>;
  };
};

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
    onError
  );
  return fullContext;
};
