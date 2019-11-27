import {
  RouteAction,
  RouteOutput,
  RouteComponent,
  RouteInterfaceL,
  RouteMatch
} from "../types";

import { Method } from "@webcarrot/router";

export type ID = "home";

export type Match = RouteMatch<{
  jasio: number;
}>;

export type Output = RouteOutput<{}>;

export type Action = RouteAction<Match, Output>;

export type Component = RouteComponent<ID, Match, Output>;

export type Route = RouteInterfaceL<ID, Match, Output>;
