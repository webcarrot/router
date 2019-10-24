import {
  Payload,
  MatchInfo,
  Output,
  Context,
  Action,
  Prepare
} from "../../types";

export type RouteInit<
  ID extends any,
  P extends Payload,
  M extends MatchInfo,
  O extends Output,
  C extends Context
> = () =>
  | Promise<{
      action: Action<P, M, O, C>;
      prepare: Prepare<ID, P, M, O, C>;
    }>
  | {
      action: Action<P, M, O, C>;
      prepare: Prepare<ID, P, M, O, C>;
    };
