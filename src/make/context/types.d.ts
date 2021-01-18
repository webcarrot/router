import {
  RouteInterface,
  Payload,
  Context,
  ExtractRouteMatch,
  ExtractRouteOutput,
} from "../../types";

import { ChangeType } from "../../utils/enums";

export type FullContext<
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context = Context
> = C & {
  route: RouteContext<MAP, C>;
};

export type RouteContextLink<
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context = Context
> = <ID extends MAP["id"]>(
  id: ID,
  match: ExtractRouteMatch<MAP, ID, C>
) => string;

export type RouteContextNavigate<
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context = Context
> = <ID extends MAP["id"]>(
  id: ID,
  info: {
    match: ExtractRouteMatch<MAP, ID, C>;
    ignoreConfirm?: boolean;
    prepare?: boolean;
    no?: number;
    changeType?: ChangeType;
  }
) => Promise<void>;

export type RouteContextChangeUrl<
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context = Context
> = <ID extends MAP["id"]>(
  id: ID,
  match: ExtractRouteMatch<MAP, ID, C>,
  output: ExtractRouteOutput<MAP, ID, C>,
  changeType?: ChangeType
) => Promise<void>;

export type RouteContextToUrl = (payload: Payload) => Promise<void>;

export type RouteContext<
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context = Context
> = {
  makeLink: RouteContextLink<MAP, C>;
  navigate: RouteContextNavigate<MAP, C>;
  navigateToUrl: RouteContextToUrl;
  changeUrl: RouteContextChangeUrl<MAP, C>;
};
