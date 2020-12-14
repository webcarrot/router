import {
  Status,
  ClientError,
  Informational,
  Redirection,
  ServerError,
  Success,
} from "./status";

import { ComponentType } from "react";
import { Method } from "./method";
import { ChangeType } from "../utils/enums";

export type Unpacked<T> = T extends Promise<infer U> ? U : T;
export type Retrun<T extends (...args: any) => any> = Unpacked<ReturnType<T>>;

export {
  Status,
  ClientError,
  Informational,
  Redirection,
  ServerError,
  Success,
  Method,
};

export type MatchInfo = {
  method?: Method;
};

export type Context = {
  routePath?: string;
  [key: string]: any;
};

export type GetPayload = {
  method?: "GET";
  no: number;
  url: string;
  changeType: ChangeType;
  body?: never;
};

export type PostPayload = {
  method: "POST";
  no: number;
  url: string;
  changeType: ChangeType;
  body: { [key: string]: string };
};

export type Payload = GetPayload | PostPayload;

export type Output = {
  url: string;
  status: Success | ClientError | ServerError;
  title?: string;
};

export type RedirectOutput = {
  url: string;
  status: Redirection;
};

export type PromiseOrNot<V> = Promise<V> | V;

export type Action<M extends MatchInfo, O extends Output, C extends Context> = (
  payload: Payload,
  match: M,
  context: C
) => PromiseOrNot<O | RedirectOutput>;

export type Component<
  ID,
  M extends MatchInfo,
  O extends Output,
  C extends Context
> = ComponentType<{
  route: RouteInterface<ID, M, O, C>;
  match: M;
  output: O;
}>;

export type Prepare<
  ID,
  M extends MatchInfo,
  O extends Output,
  C extends Context
> = (output: O) => PromiseOrNot<Component<ID, M, O, C> | null>;

export type Match<M extends MatchInfo, C extends Context> = (
  url: URL,
  payload: Payload,
  context: C
) => PromiseOrNot<M | false>;

export type Build<M extends MatchInfo, C extends Context> = (
  match: M,
  context: C
) => string;

export type BuildCheck<M extends MatchInfo, C extends Context> = (
  match: M,
  context: C
) => string | false;

export type OnStart = (id: number) => Promise<void | boolean>;
export type OnBeforeStart = (cb: () => void) => void;

export type OnEnd<
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context = Context
> = (id: number, out: ExtractRouteFullOutput<MAP, MAP["id"], C>) => void;

export type OnError = (id: number, err: any) => boolean | void;

export type Execute<
  ID,
  M extends MatchInfo,
  O extends Output,
  C extends Context
> = (
  url: URL,
  payload: Payload,
  context: C,
  doPrepare: boolean,
  onStart?: OnStart,
  onError?: OnError
) => PromiseOrNot<ExecuteOutput<ID, M, O, C> | false>;

export type ExecuteOutput<
  ID,
  M extends MatchInfo,
  O extends Output,
  C extends Context
> = {
  id: ID;
  route: RouteInterface<ID, M, O, C>;
  payload: Payload;
  match: M;
  output: O;
  Component: Component<ID, M, O, C>;
};

export interface RouteInterface<
  ID,
  M extends MatchInfo,
  O extends Output,
  C extends Context
> {
  id: ID;
  prepare: Prepare<ID, M, O, C>;
  action: Action<M, O, C>;
  match: Match<M, C>;
  build: Build<M, C>;
  execute: Execute<ID, M, O, C>;
}

export type ExtractRoute<ID, U> = U extends { id: ID } ? U : never;

export type RoutesMap<MAP extends RouteInterface<any, any, any, any>> = {
  [ID in MAP["id"]]: ExtractRoute<ID, MAP>;
};

export type ExtractRouteInfo<
  MAP extends RouteInterface<any, any, any, C>,
  ID extends MAP["id"],
  C extends Context
> = ExtractRoute<ID, MAP>;

export type ExtractRouteMatch<
  MAP extends RouteInterface<any, any, any, C>,
  ID extends MAP["id"],
  C extends Context
> = Exclude<Unpacked<ReturnType<ExtractRoute<ID, MAP>["match"]>>, false>;

export type ExtractRouteOutput<
  MAP extends RouteInterface<any, any, any, C>,
  ID extends MAP["id"],
  C extends Context
> = Unpacked<ReturnType<ExtractRoute<ID, MAP>["action"]>>;

export type ExtractRouteFullOutput<
  MAP extends RouteInterface<any, any, any, C>,
  ID extends MAP["id"],
  C extends Context
> = Exclude<Unpacked<ReturnType<ExtractRoute<ID, MAP>["execute"]>>, false>;
