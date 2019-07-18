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

export {
  Status,
  ClientError,
  Informational,
  Redirection,
  ServerError,
  Success,
  Method
};

export type ComponentProps = { [key: string]: any };
export type MatchInfo = { [key: string]: any };
export type Context = { [key: string]: any };

export type GetPayload = {
  method: "GET";
  no: number;
  url: string;
};

export type PostPayload = {
  method: "POST";
  no: number;
  url: string;
  body: any;
};

export type Payload = GetPayload | PostPayload;

export type Output = {
  url: string;
  status: Status;
};

export type Action<
  P extends Payload,
  M extends MatchInfo,
  O extends Output,
  C extends Context
> = (payload: P, match: M, context: C) => Promise<O>;

export type Component<
  ID extends any,
  P extends Payload,
  M extends MatchInfo,
  O extends Output,
  C extends Context,
  CP extends ComponentProps
> = ComponentType<
  CP & { route: RouteInterface<ID, P, M, O, C, CP>; match: M; output: O }
>;

export type Prepare<
  ID extends any,
  P extends Payload,
  M extends MatchInfo,
  O extends Output,
  C extends Context,
  CP extends ComponentProps
> = (output: O) => Promise<Component<ID, P, M, O, C, CP> | null>;

export type Match<P extends Payload, M extends MatchInfo, C extends Context> = (
  url: URL,
  payload: P,
  context: C
) => M | false | Promise<M | false>;

export type Build<M extends MatchInfo, C extends Context> = (
  match: M,
  context: C
) => string | false;

export type OnStart = (id: number) => void;
export type OnError = (id: number, err: any) => boolean | void;

export type Execute<
  ID extends any,
  P extends Payload,
  M extends MatchInfo,
  O extends Output,
  C extends Context,
  CP extends ComponentProps
> = (
  url: URL,
  payload: P,
  context: C,
  doPrepare: boolean,
  onStart?: OnStart,
  onError?: OnError
) => Promise<ExecuteOutput<ID, P, M, O, C, CP> | false>;

export type ExecuteOutput<
  ID extends any,
  P extends Payload,
  M extends MatchInfo,
  O extends Output,
  C extends Context,
  CP extends ComponentProps
> = {
  id: ID;
  route: RouteInterface<ID, P, M, O, C, CP>;
  payload: P;
  match: M;
  output: O;
  Component: Component<ID, P, M, O, C, CP>;
};

export interface RouteInterface<
  ID extends any,
  P extends Payload,
  M extends MatchInfo,
  O extends Output,
  C extends Context,
  CP extends ComponentProps
> {
  id: ID;
  prepare: Prepare<ID, P, M, O, C, CP>;
  action: Action<P, M, O, C>;
  match: Match<P, M, C>;
  build: Build<M, C>;
  execute: Execute<ID, P, M, O, C, CP>;
}
