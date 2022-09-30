import {
  Payload,
  Context,
  OnStart,
  OnError,
  OnEnd,
  RoutesMap,
  RouteInterface,
} from "../types";
import { execute } from "../utils";
import { FullContext } from "./context/types";

export function make<
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context = Context
>(
  routes: RoutesMap<MAP>,
  context: FullContext<MAP, C>,
  onStart?: OnStart,
  onEnd?: OnEnd<MAP, C>,
  onError?: OnError
) {
  return function (payload: Payload) {
    return execute<MAP, C>(
      routes,
      payload,
      context,
      true,
      true,
      onStart,
      onError
    ).then((out) => {
      if (onEnd) {
        onEnd(payload.no, out);
      }
    });
  };
}
