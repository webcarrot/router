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
import { ChangeType } from "../../utils/enums";

export type FullContext<
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
  P extends Payload = Payload,
  C extends Context = Context,
  CP extends ComponentProps = ComponentProps
> = C & {
  route: RouteContext<MAP, P, C, CP>;
};

export type RouteContextLink<
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
  P extends Payload = Payload,
  C extends Context = Context,
  CP extends ComponentProps = ComponentProps,
  D extends MAP = MAP
> = <N extends keyof D>(
  id: N,
  payload: LinkPayload<MatchInfo, C, D[N]["build"]>
) => string;

export type RouteContextNavigate<
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
  P extends Payload = Payload,
  C extends Context = Context,
  CP extends ComponentProps = ComponentProps,
  D extends MAP = MAP
> = {
  <N extends keyof D>(
    id: N,
    payload: LinkPayload<MatchInfo, C, D[N]["build"]>,
    prepare: boolean,
    method: "POST",
    no: number,
    changeType: ChangeType,
    body: any
  ): Promise<void>;
  <N extends keyof D>(
    id: N,
    payload: LinkPayload<MatchInfo, C, D[N]["build"]>,
    prepare: boolean,
    method: "GET",
    no: number,
    changeType: ChangeType
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
      CP
    >;
  },
  P extends Payload = Payload,
  C extends Context = Context,
  CP extends ComponentProps = ComponentProps
> = {
  makeLink: RouteContextLink<MAP, P, C, CP>;
  navigate: RouteContextNavigate<MAP, P, C, CP>;
};
