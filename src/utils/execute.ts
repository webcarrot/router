import {
  RouteInterface,
  Payload,
  Output,
  ComponentProps,
  MatchInfo,
  Context,
  OnStart,
  OnError,
  Retrun
} from "../types";

export const execute = <
  MAP extends {
    [key: string]: RouteInterface<
      Extract<keyof MAP, string>,
      P,
      MatchInfo,
      Output,
      C,
      CP
    >;
  },
  P extends Payload = Payload,
  C extends Context = Context,
  CP extends ComponentProps = ComponentProps
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
    Retrun<typeof routes[keyof MAP]["execute"]>,
    false
  >;
  return Object.keys(routes)
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
