import {
  RouteInterface,
  Payload,
  Output,
  MatchInfo,
  Context
} from "../../types";

import { LinkMatch } from "./types";

export const make = <
  MAP extends {
    [key: string]: RouteInterface<
      Extract<keyof MAP, string>,
      P,
      MatchInfo,
      Output,
      C
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
    payload: LinkMatch<D[N]["build"], C>
  ) => string;
  const linkProvider: LinkProvider<typeof routes> = (id, payload) =>
    routes[id].build(payload, context);
  return linkProvider;
};
