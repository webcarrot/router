import {
  RouteInterface,
  Payload,
  Output,
  MatchInfo,
  Context,
  OnStart,
  OnError,
  OnEnd,
  Unpacked
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
      C
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
      C
    >;
  },
  P extends Payload = Payload,
  C extends Context = Context,
  D extends MAP = MAP
> = <N extends keyof D>(id: N, match: LinkMatch<D[N]["build"], C>) => string;

export type RouteContextNavigate<
  MAP extends {
    [key: string]: RouteInterface<
      Extract<keyof MAP, string>,
      P,
      MatchInfo,
      Output,
      C
    >;
  },
  P extends Payload = Payload,
  C extends Context = Context,
  D extends MAP = MAP
> = {
  <N extends keyof D>(
    id: N,
    info: {
      match: LinkMatch<D[N]["build"], C>;
      prepare?: boolean;
      no?: number;
      changeType?: ChangeType;
    }
  ): Promise<void>;
};

export type RouteContextChangeUrl<
  MAP extends {
    [key: string]: RouteInterface<
      Extract<keyof MAP, string>,
      P,
      MatchInfo,
      Output,
      C
    >;
  },
  P extends Payload = Payload,
  C extends Context = Context,
  D extends MAP = MAP
> = {
  <N extends keyof D>(
    id: N,
    match: Exclude<Unpacked<ReturnType<D[N]["match"]>>, false>,
    out: Unpacked<ReturnType<D[N]["action"]>>,
    changeType?: ChangeType
  ): Promise<void>;
};

export type RouteContextToUrl<
  MAP extends {
    [key: string]: RouteInterface<
      Extract<keyof MAP, string>,
      P,
      MatchInfo,
      Output,
      C
    >;
  },
  P extends Payload = Payload,
  C extends Context = Context,
  D extends MAP = MAP
> = (payload: P) => Promise<void>;

export type RouteContext<
  MAP extends {
    [key: string]: RouteInterface<
      Extract<keyof MAP, string>,
      P,
      MatchInfo,
      Output,
      C
    >;
  },
  P extends Payload = Payload,
  C extends Context = Context
> = {
  makeLink: RouteContextLink<MAP, P, C>;
  navigate: RouteContextNavigate<MAP, P, C>;
  navigateToUrl: RouteContextToUrl<MAP, P, C>;
  changeUrl: RouteContextChangeUrl<MAP, P, C>;
};
