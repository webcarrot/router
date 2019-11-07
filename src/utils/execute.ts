import {
  Payload,
  Context,
  OnStart,
  OnError,
  Retrun,
  RoutesMap
} from "../types";

export const execute = <
  MAP extends RoutesMap<MAP, P, C>,
  P extends Payload = Payload,
  C extends Context = Context
>(
  routes: MAP,
  payload: P,
  context: C,
  prepare: boolean = true,
  onStart?: OnStart,
  onError?: OnError
) => {
  const url = new URL(`route:${payload.url}`);
  type ReturnValue = Exclude<
    Retrun<typeof routes[keyof typeof routes]["execute"]>,
    false
  >;
  return ((Object.keys(routes) as unknown) as ReadonlyArray<keyof MAP>)
    .reduce<Promise<ReturnValue>>(
      (out, id: keyof MAP) =>
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
