import {
  Payload,
  MatchInfo,
  Output,
  Context,
  ComponentProps,
  Action,
  Prepare
} from "../../types";

export type RouteInit<
  ID extends any,
  P extends Payload,
  M extends MatchInfo,
  O extends Output,
  C extends Context,
  CP extends ComponentProps
> = () => Promise<{
  action: Action<P, M, O, C>;
  prepare: Prepare<ID, P, M, O, C, CP>;
}>;
