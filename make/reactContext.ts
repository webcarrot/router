import {
  RouteInterface,
  Payload,
  Output,
  ComponentProps,
  MatchInfo,
  Context,
  OnStart,
  OnError
} from "../types";

export const make = <
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
  P extends Payload,
  C extends Context
>(
  routes: MAP,
  context: C,
  onStart: OnStart,
  onError: OnError
) => {
  console.log(routes, context, onStart, onError);
};
