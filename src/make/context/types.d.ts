import {
  RouteInterface,
  Payload,
  Output,
  MatchInfo,
  Context,
  OnStart,
  OnError,
  OnEnd,
  Unpacked,
  RoutesMap,
  ExtractRouteMatch,
  ExtractRouteOutput
} from "../../types";

import { ChangeType } from "../../utils/enums";

export type FullContext<
  MAP extends RouteInterface<any, P, MatchInfo, Output, C>,
  P extends Payload = Payload,
  C extends Context = Context
> = C & {
  route: RouteContext<MAP, P, C>;
};

export type RouteContextLink<
  MAP extends RouteInterface<any, P, MatchInfo, Output, C>,
  P extends Payload = Payload,
  C extends Context = Context
> = <ID extends MAP["id"]>(
  id: ID,
  match: ExtractRouteMatch<MAP, ID, P, C>
) => string;

export type RouteContextNavigate<
  MAP extends RouteInterface<any, P, MatchInfo, Output, C>,
  P extends Payload = Payload,
  C extends Context = Context
> = <ID extends MAP["id"]>(
  id: ID,
  info: {
    match: ExtractRouteMatch<MAP, ID, P, C>;
    prepare?: boolean;
    no?: number;
    changeType?: ChangeType;
  }
) => Promise<void>;

export type RouteContextChangeUrl<
  MAP extends RouteInterface<any, P, MatchInfo, Output, C>,
  P extends Payload = Payload,
  C extends Context = Context
> = <ID extends MAP["id"]>(
  id: ID,
  match: ExtractRouteMatch<MAP, ID, P, C>,
  output: ExtractRouteOutput<MAP, ID, P, C>,
  changeType?: ChangeType
) => Promise<void>;

export type RouteContextToUrl<
  MAP extends RouteInterface<any, P, MatchInfo, Output, C>,
  P extends Payload = Payload,
  C extends Context = Context
> = (payload: P) => Promise<void>;

export type RouteContext<
  MAP extends RouteInterface<any, P, MatchInfo, Output, C>,
  P extends Payload = Payload,
  C extends Context = Context
> = {
  makeLink: RouteContextLink<MAP, P, C>;
  navigate: RouteContextNavigate<MAP, P, C>;
  navigateToUrl: RouteContextToUrl<MAP, P, C>;
  changeUrl: RouteContextChangeUrl<MAP, P, C>;
};
