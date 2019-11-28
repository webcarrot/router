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
  ID,
  M extends MatchInfo,
  O extends Output,
  C extends Context
> = () => PromiseOrNot<{
  action: Action<M, O, C>;
  prepare: Prepare<ID, M, O, C>;
}>;
