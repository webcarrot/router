import {
  Payload,
  MatchInfo,
  Output,
  Context,
  Action,
  Prepare,
  PromiseOrNot
} from "../../types";

export type RouteInit<
  ID extends any,
  P extends Payload,
  M extends MatchInfo,
  O extends Output,
  C extends Context
> = () => PromiseOrNot<{
  action: Action<P, M, O, C>;
  prepare: Prepare<ID, P, M, O, C>;
}>;
