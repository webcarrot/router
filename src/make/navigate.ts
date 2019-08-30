import {
  RouteInterface,
  Payload,
  Output,
  ComponentProps,
  MatchInfo,
  Context,
  OnStart,
  OnError,
  OnEnd
} from "../types";
import { LinkMatch } from "./link/types";
import { ChangeType } from "../utils/enums";

export const make = <
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
  context: C,
  onStart?: OnStart,
  onEnd?: OnEnd<typeof routes, P, C, CP>,
  onError?: OnError
) => {
  type NavigateProvider<D extends MAP> = {
    <N extends keyof D>(
      id: N,
      data: {
        match: LinkMatch<D[N]["build"], C>;
        prepare?: boolean;
        method: "POST";
        no?: number;
        changeType?: ChangeType;
      }
    ): Promise<void>;
    <N extends keyof D>(
      id: N,
      data: {
        match: LinkMatch<D[N]["build"], C>;
        prepare?: boolean;
        method?: "GET";
        no?: number;
        changeType?: ChangeType;
      }
    ): Promise<void>;
  };

  const navigateProvider: NavigateProvider<typeof routes> = (
    id: any,
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
      return route
        .execute(
          new URL(`route:${payload.url}`),
          payload,
          context,
          prepare,
          onStart,
          onError
        )
        .then(output => {
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

  return navigateProvider;
};
