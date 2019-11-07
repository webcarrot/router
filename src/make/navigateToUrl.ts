import { Payload, Context, OnStart, OnError, OnEnd, RoutesMap } from "../types";
import { execute } from "../utils";
import { FullContext } from "./context/types";

export const make = <
  MAP extends RoutesMap<MAP, P, C>,
  P extends Payload = Payload,
  C extends Context = Context
>(
  routes: MAP,
  context: FullContext<MAP, P, C>,
  onStart?: OnStart,
  onEnd?: OnEnd<typeof routes, P, C>,
  onError?: OnError
) => (payload: P) =>
  execute<MAP, P, C>(routes, payload, context, true, onStart, onError).then(
    out => {
      onEnd(payload.no, out);
    }
  );
