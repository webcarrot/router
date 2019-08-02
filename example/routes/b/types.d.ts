import {
  RouteInit,
  Output as OutputInt,
  Action as ActionInt,
  Component as ComponentInt,
  Payload,
  RouteInterface,
  Method
} from "@webcarrot/router";

import { RouteContext, ComponentProps } from "../../types";

export type ID = "b";

type MatchBase<M extends Method, P = {}> = {
  method: M;
  params: { bb: string };
  query: { id: string };
} & { [K in keyof P]: P[K] };

export type Match =
  | MatchBase<"GET">
  | MatchBase<"POST", { body: { jasio: string } }>;

export type Action = ActionInt<Payload, Match, Output, RouteContext>;

export type Output = OutputInt & { titleB: string };

export type Component = ComponentInt<
  ID,
  Payload,
  Match,
  Output,
  RouteContext,
  ComponentProps
>;

export type Route = RouteInterface<
  ID,
  Payload,
  Match,
  Output,
  RouteContext,
  ComponentProps
>;
