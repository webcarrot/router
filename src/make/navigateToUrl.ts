import {
  RouteInterface,
  Payload,
  Output,
  MatchInfo,
  Context,
  OnStart,
  OnError,
  OnEnd
} from "../types";
import { execute } from "../utils";
import { FullContext } from "./context/types";

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
