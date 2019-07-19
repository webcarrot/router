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
import { make as makeLinkProvider, LinkPayload } from "./link";
import { execute } from "../utils/execute";

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
  const linkProvider = makeLinkProvider<typeof routes, P, C, CP>(
    routes,
    context
  );

  type NavigateProvider<D extends MAP> = {
    <N extends keyof D>(
      id: N,
      payload: LinkPayload<MatchInfo, C, D[N]["build"]>,
      prepare: boolean,
      method: "POST",
      body: any
    ): Promise<void>;
    <N extends keyof D>(
      id: N,
      payload: LinkPayload<MatchInfo, C, D[N]["build"]>,
      prepare: boolean,
      method: "GET"
    ): Promise<void>;
  };

  const navigateProvider: NavigateProvider<typeof routes> = async (
    id: any,
    payload: any,
    prepare: any = true,
    method: any = "GET",
    body?: any
  ) => {
    const url = linkProvider(id, payload);
    if (url) {
      const payload: P =
        method === "POST"
          ? ({
              method: "POST",
              url,
              body
            } as P)
          : ({
              method: "GET",
              url
            } as P);
      const output = await execute<typeof routes, P, C, CP>(
        routes,
        payload,
        context,
        prepare,
        onStart,
        onError
      );
      if (onEnd) {
        onEnd(id, output);
      }
    } else {
      throw new Error("Unknown link");
    }
  };

  return navigateProvider;
};
