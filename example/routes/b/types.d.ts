import {
  RouteInit,
  Output as OutputInt,
  Action as ActionInt,
  Component as ComponentInt,
  Payload,
  RouteInterface
} from "@webcarrot/router";

import { RouteContext, ComponentProps } from "../../types";

export type ID = "b";

export type Match = { params?: { bb?: string } };

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
