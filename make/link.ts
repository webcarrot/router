import {
  RouteInterface,
  Payload,
  Output,
  ComponentProps,
  MatchInfo,
  Context,
  Build
} from "../types";

export type LinkPayload<
  M extends MatchInfo,
  C extends Context,
  T extends Build<M, C>
> = T extends (p: infer LP, c: C) => any ? LP : never;

export const make = <
  MAP extends {
    [key: string]: RouteInterface<
      Extract<keyof MAP, string>,
      P,
      MatchInfo,
      Output,
      C,
      ComponentProps
    >;
  },
  P extends Payload = Payload,
  C extends Context = Context
>(
  routes: MAP,
  context: C
) => {
  type LinkProvider<D extends MAP> = <N extends keyof D>(
    id: N,
    payload: LinkPayload<MatchInfo, C, D[N]["build"]>
  ) => string | false;
  const linkProvider: LinkProvider<typeof routes> = (id, payload) =>
    routes[id].build(payload, context);
  return linkProvider;
};
