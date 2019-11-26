import {
  Action,
  Payload,
  MatchInfo,
  Output,
  Component,
  RouteInterface as RouteInterfaceBase,
  FullContext,
  RoutesMap,
  RouteInterface,
  Context,
  RouteInit
} from "@webcarrot/router";
import { AppContext } from "../app/types";

import { Route as Home } from "./home/types";
import { Route as News } from "./news/types";
import { Route as Todo } from "./todo/types";
import { Route as NotFound } from "./notFound/types";

export type RoutesType = Home | News | Todo | NotFound;

export type Routes = RoutesMap<RoutesType, Payload, RouteContext>;

export type RouteContext = FullContext<RoutesType, Payload, AppContext>;

export type RouteAction<M extends MatchInfo, O extends Output> = Action<
  Payload,
  M,
  O,
  AppContext
>;

export type RouteMatch<T> = MatchInfo & (T);

export type RouteOutput<T> = Output & (T);

export type RouteComponent<
  ID,
  M extends MatchInfo,
  O extends Output
> = Component<ID, Payload, M, O, AppContext>;

export type RouteInterfaceL<
  ID,
  M extends MatchInfo,
  O extends Output
> = RouteInterfaceBase<ID, Payload, M, O, AppContext>;

export type RouteInintL<ID, M extends MatchInfo, O extends Output> = RouteInit<
  ID,
  Payload,
  M,
  O,
  AppContext
>;
