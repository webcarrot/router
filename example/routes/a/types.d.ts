import {
  RouteInit,
  Output as OutputInt,
  Action as ActionInt,
  Component as ComponentInt,
  Payload,
  RouteInterface
} from "@webcarrot/router";

import { RouteContext, ComponentProps } from "../../types";

export type ID = "a";

export type Match = {
  params?: { aa?: string; zz?: undefined } | { aa?: undefined; zz: string };
};

export type Action = ActionInt<Payload, Match, Output, RouteContext>;

export type Output = OutputInt & { titleA: string };

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
