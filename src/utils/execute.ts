import {
  Payload,
  Context,
  OnStart,
  OnError,
  RoutesMap,
  RouteInterface,
  MatchInfo,
  Output
} from "../types";
import { RouteInfo } from "../make/reactContextProvider/types";

export const execute = <
  MAP extends RouteInterface<any, P, MatchInfo, Output, C>,
  P extends Payload = Payload,
  C extends Context = Context
>(
  routes: RoutesMap<MAP, P, C>,
  payload: P,
  context: C,
  prepare: boolean = true,
  onStart?: OnStart,
  onError?: OnError
) => {
  const url = new URL(`route:${payload.url}`);
  type ReturnValue = RouteInfo<MAP, P, C>;
  return (Object.keys(routes) as ReadonlyArray<MAP["id"]>)
    .reduce<Promise<ReturnValue>>(
      (out, id) =>
        out.then(result => {
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
    .then(result => {
      if (!result) {
        throw new Error("No route found");
      } else {
        return result;
      }
    });
};
