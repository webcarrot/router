import {
  Payload,
  Context,
  OnStart,
  OnError,
  OnEnd,
  RoutesMap,
  RouteInterface
} from "../types";
import { execute } from "../utils";
import { FullContext } from "./context/types";

export const make = <
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context = Context
>(
  routes: RoutesMap<MAP>,
  context: FullContext<MAP, C>,
  onStart?: OnStart,
  onEnd?: OnEnd<MAP, C>,
  onError?: OnError
) => (payload: Payload) =>
  execute<MAP, C>(routes, payload, context, true, onStart, onError).then(
    out => {
      onEnd(payload.no, out);
    }
  );
