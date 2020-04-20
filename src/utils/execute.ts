import {
  Payload,
  Context,
  OnStart,
  OnError,
  RoutesMap,
  RouteInterface,
  ExtractRouteFullOutput,
} from "../types";
import { FullContext } from "..";

export const execute = <
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context = Context
>(
  routes: RoutesMap<MAP>,
  payload: Payload,
  context: FullContext<MAP, C>,
  prepare: boolean = true,
  onStart?: OnStart,
  onError?: OnError
) => {
  const url = new URL(`route:${payload.url}`);
  type ReturnValue = ExtractRouteFullOutput<MAP, MAP["id"], C>;
  return (Object.keys(routes) as ReadonlyArray<MAP["id"]>)
    .reduce<Promise<ReturnValue>>(
      (out, id) =>
        out.then((result) => {
          if (result) {
            return result;
          } else {
            const route = routes[id];
            return route.execute(
              url,
              payload,
              context,
              prepare,
              onStart,
              onError
            ) as Promise<ReturnValue>;
          }
        }),
      Promise.resolve<ReturnValue>(null)
    )
    .then((result) => {
      if (!result) {
        throw new Error("No route found");
      } else {
        return result;
      }
    });
};
