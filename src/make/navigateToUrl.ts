import {
  Payload,
  Context,
  OnStart,
  OnError,
  OnEnd,
  RoutesMap,
  RouteInterface,
  MatchInfo,
  Output
} from "../types";
import { execute } from "../utils";
import { FullContext } from "./context/types";

export const make = <
  MAP extends RouteInterface<any, P, MatchInfo, Output, C>,
  P extends Payload = Payload,
  C extends Context = Context
>(
  routes: RoutesMap<MAP, P, C>,
  context: FullContext<MAP, P, C>,
  onStart?: OnStart,
  onEnd?: OnEnd<MAP, P, C>,
  onError?: OnError
) => (payload: P) =>
  execute<MAP, P, C>(routes, payload, context, true, onStart, onError).then(
    out => {
      onEnd(payload.no, out);
    }
  );
