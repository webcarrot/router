import {
  Status,
  ClientError,
  Informational,
  Redirection,
  ServerError,
  Success
} from "./status";

import { ComponentType } from "react";
import { Method } from "./method";
import { ChangeType } from "../utils/enums";
import { RouteInfo } from "../make/reactContextProvider/types";

export type Unpacked<T> = T extends Promise<infer U> ? U : T;
export type Retrun<T extends (...args: any) => any> = Unpacked<ReturnType<T>>;

export {
  Status,
  ClientError,
  Informational,
  Redirection,
  ServerError,
  Success,
  Method
};

export type MatchInfo = {
  method?: Method;
};

export type Context = { [key: string]: any };

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

export type Action<
  P extends Payload,
  M extends MatchInfo,
  O extends Output,
  C extends Context
> = (payload: P, match: M, context: C) => PromiseOrNot<O | RedirectOutput>;

export type Component<
  ID,
  P extends Payload,
  M extends MatchInfo,
  O extends Output,
  C extends Context
> = ComponentType<{
  route: RouteInterface<ID, P, M, O, C>;
  match: M;
  output: O;
}>;

export type Prepare<
  ID,
  P extends Payload,
  M extends MatchInfo,
  O extends Output,
  C extends Context
> = (output: O) => PromiseOrNot<Component<ID, P, M, O, C> | null>;

export type Match<P extends Payload, M extends MatchInfo, C extends Context> = (
  url: URL,
  payload: P,
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

export type OnStart = (id: number) => void | boolean;

export type OnEnd<
  MAP extends RouteInterface<any, P, MatchInfo, Output, C>,
  P extends Payload = Payload,
  C extends Context = Context
> = (id: number, out: RouteInfo<MAP, P, C>) => void;

export type OnError = (id: number, err: any) => boolean | void;

export type Execute<
  ID,
  P extends Payload,
  M extends MatchInfo,
  O extends Output,
  C extends Context
> = (
  url: URL,
  payload: P,
  context: C,
  doPrepare: boolean,
  onStart?: OnStart,
  onError?: OnError
) => PromiseOrNot<ExecuteOutput<ID, P, M, O, C> | false>;

export type ExecuteOutput<
  ID,
  P extends Payload,
  M extends MatchInfo,
  O extends Output,
  C extends Context
> = {
  id: ID;
  route: RouteInterface<ID, P, M, O, C>;
  payload: P;
  match: M;
  output: O;
  Component: Component<ID, P, M, O, C>;
};

export interface RouteInterface<
  ID,
  P extends Payload,
  M extends MatchInfo,
  O extends Output,
  C extends Context
> {
  id: ID;
  prepare: Prepare<ID, P, M, O, C>;
  action: Action<P, M, O, C>;
  match: Match<P, M, C>;
  build: Build<M, C>;
  execute: Execute<ID, P, M, O, C>;
}

export type ExtractRoute<ID, U> = U extends { id: ID } ? U : never;

export type RoutesMap<
  MAP extends RouteInterface<any, P, MatchInfo, Output, C>,
  P extends Payload,
  C extends Context
> = { [ID in MAP["id"]]: ExtractRoute<ID, MAP> };

export type ExtractRouteInfo<
  MAP extends RouteInterface<any, P, MatchInfo, Output, C>,
  ID extends MAP["id"],
  P extends Payload,
  C extends Context
> = ExtractRoute<ID, MAP>;

export type ExtractRouteMatch<
  MAP extends RouteInterface<any, P, MatchInfo, Output, C>,
  ID extends MAP["id"],
  P extends Payload,
  C extends Context
> = Exclude<Unpacked<ReturnType<ExtractRoute<ID, MAP>["match"]>>, false>;

export type ExtractRouteOutput<
  MAP extends RouteInterface<any, P, MatchInfo, Output, C>,
  ID extends MAP["id"],
  P extends Payload,
  C extends Context
> = Unpacked<ReturnType<ExtractRoute<ID, MAP>["action"]>>;
