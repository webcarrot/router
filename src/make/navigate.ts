import {
  Payload,
  Context,
  OnStart,
  OnError,
  OnEnd,
  RoutesMap,
  RouteInterface,
} from "../types";
import { ChangeType } from "../utils/enums";
import { FullContext } from "./context/types";
import { promisfy } from "../utils/promisfy";

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
  return function <ID extends MAP["id"]>(
    id: ID,
    {
      match = {},
      ignoreConfirm = false,
      prepare = true,
      no = Date.now(),
      changeType = ChangeType.PUSH,
    }: {
      match?: any;
      ignoreConfirm?: boolean;
      prepare?: boolean;
      no?: number;
      changeType?: ChangeType;
    }
  ) {
    const route = routes[id];
    const url = route.build(match, context);
    if (url) {
      const payload: Payload =
        match.method === "POST"
          ? ({
              method: "POST",
              url,
              no,
              changeType,
              body: match.body,
            } as Payload)
          : ({
              method: "GET",
              url,
              no,
              changeType,
            } as Payload);
      return promisfy(() =>
        route.execute(
          new URL(`route:${payload.url}`),
          payload,
          context,
          ignoreConfirm,
          prepare,
          onStart,
          onError
        )
      ).then((output) => {
        if (!output) {
          const error = new Error("Invalid payload");
          if (!onError || onError(no, error)) {
            throw error;
          }
        } else if (onEnd) {
          onEnd(no, output as any);
        }
      });
    } else {
      return Promise.reject(new Error("Unknown link"));
    }
  };
}
