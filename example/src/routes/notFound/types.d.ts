import {
  RouteAction,
  RouteOutput,
  RouteComponent,
  RouteInterfaceL,
  RouteMatch
} from "../types";

import { Method } from "@webcarrot/router";

export type ID = "notFound";

export type Match = RouteMatch<{}>;

export type Output = RouteOutput<{}>;

export type Action = RouteAction<Match, Output>;

export type Component = RouteComponent<ID, Match, Output>;

export type Route = RouteInterfaceL<ID, Match, Output>;
