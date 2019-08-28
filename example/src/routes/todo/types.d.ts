import {
  RouteAction,
  RouteOutput,
  RouteComponent,
  RouteInterface
} from "../types";

import { Method } from "@webcarrot/router";

export type ID = "todo";

export type Match = {
  method: Method;
};

export type Output = RouteOutput<{}>;

export type Action = RouteAction<Match, Output>;

export type Component = RouteComponent<ID, Match, Output>;

export type Route = RouteInterface<ID, Match, Output>;
