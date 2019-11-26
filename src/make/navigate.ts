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
import { ChangeType } from "../utils/enums";
import { FullContext } from "./context/types";
import { promisfy } from "../utils/promisfy";

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
) => <ID extends MAP["id"]>(
  id: ID,
  {
    match = {},
    prepare = true,
    no = Date.now(),
    changeType = ChangeType.PUSH
  }: {
    match?: any;
    prepare?: boolean;
    no?: number;
    changeType?: ChangeType;
  }
) => {
  const route = routes[id];
  const url = route.build(match, context);
  if (url) {
    const payload: P =
      match.method === "POST"
        ? ({
            method: "POST",
            url,
            no,
            changeType,
            body: match.body
          } as P)
        : ({
            method: "GET",
            url,
            no,
            changeType
          } as P);
    return promisfy(() =>
      route.execute(
        new URL(`route:${payload.url}`),
        payload,
        context,
        prepare,
        onStart,
        onError
      )
    ).then(output => {
      if (!output) {
        const error = new Error("Invalid payload");
        if (!onError || onError(no, error)) {
          throw error;
        }
      } else if (onEnd) {
        // FIXME
        onEnd(no, output as any);
      }
    });
  } else {
    return Promise.reject(new Error("Unknown link"));
  }
};
