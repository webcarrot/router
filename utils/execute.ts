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

export const execute = async <
  MAP extends {
    [key: string]: RouteInterface<
      Extract<keyof MAP, string>,
      P,
      MatchInfo,
      Output,
      C,
      ComponentProps
    >;
  },
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
  for (let id in routes) {
    const route = routes[id];
    const output = await route.execute(
      url,
      payload,
      context,
      prepare,
      onStart,
      onError
    );
    if (output) {
      type Return = Exclude<Retrun<typeof route["execute"]>, false>;
      return output as Return;
    }
  }
  throw new Error("No route found");
};
