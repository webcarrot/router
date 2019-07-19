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

import { LinkPayload } from "../link/types";

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

export type RouteContextLink<
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
> = <N extends keyof D>(
  id: N,
  payload: LinkPayload<MatchInfo, C, D[N]["build"]>
) => string | false;

export type RouteContextNavigate<
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

export type RouteContext<
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
> = {
  makeLink: RouteContextLink<MAP, P, C>;
  navigate: RouteContextNavigate<MAP, P, C>;
};
