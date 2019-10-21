import {
  Action,
  Payload,
  MatchInfo,
  Output,
  Component,
  RouteInterface as RouteInterfaceBase,
  FullContext
} from "@webcarrot/router";
import { AppContext } from "../app/types";

import { Route as Home } from "./home/types";
import { Route as News } from "./news/types";
import { Route as Todo } from "./todo/types";
import { Route as NotFound } from "./notFound/types";

export type Routes = {
  home: Home;
  news: News;
  todo: Todo;
  notFound: NotFound;
};

export type RouteContext = FullContext<Routes, Payload, AppContext>;

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

export type RouteInterface<
  ID,
  M extends MatchInfo,
  O extends Output
> = RouteInterfaceBase<ID, Payload, M, O, RouteContext>;
