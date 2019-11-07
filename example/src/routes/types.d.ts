import {
  Action,
  Payload,
  MatchInfo,
  Output,
  Component,
  RouteInterface as RouteInterfaceBase,
  FullContext,
  RoutesMap
} from "@webcarrot/router";
import { AppContext } from "../app/types";

import { Route as Home } from "./home/types";
import { Route as News } from "./news/types";
import { Route as Todo } from "./todo/types";
import { Route as NotFound } from "./notFound/types";

type RoutesObj = {
  home: Home;
  news: News;
  todo: Todo;
  notFound: NotFound;
};

export type Routes = RoutesMap<RoutesObj, Payload, RouteContext>;

export type RouteContext = FullContext<
  RoutesMap<RoutesObj, Payload, AppContext>,
  Payload,
  AppContext
>;

export type RouteAction<M extends MatchInfo, O extends Output> = Action<
  Payload,
  M,
  O,
  RouteContext
>;

export type RouteOutput<T> = Output & (T);

export type RouteComponent<
  ID,
  M extends MatchInfo,
  O extends Output
> = Component<ID, Payload, M, O, RouteContext>;

export type RouteInterfaceL<
  ID,
  M extends MatchInfo,
  O extends Output
> = RouteInterfaceBase<ID, Payload, M, O, RouteContext>;
