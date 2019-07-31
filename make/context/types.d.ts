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

import { LinkMatch } from "../link/types";
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
> = <N extends keyof D>(id: N, payload: LinkMatch<D[N]["build"], C>) => string;

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
    info: {
      method: "POST";
      match: LinkMatch<D[N]["build"], C>;
      prepare?: boolean;
      no?: number;
      changeType?: ChangeType;
    }
  ): Promise<void>;
  <N extends keyof D>(
    id: N,
    info: {
      method?: "GET";
      match: LinkMatch<D[N]["build"], C>;
      prepare?: boolean;
      no?: number;
      changeType?: ChangeType;
    }
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
