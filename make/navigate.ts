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
      ComponentProps
    >;
  },
  P extends Payload = Payload,
  C extends Context = Context
>(
  routes: MAP,
  context: C,
  onStart?: OnStart,
  onError?: OnError
) => {
  const linkProvider = makeLinkProvider<MAP, P, C>(routes, context);

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
      await execute<typeof routes, P, C>(
        routes,
        payload,
        context,
        prepare,
        onStart,
        onError
      );
    } else {
      throw new Error("Unknown link");
    }
  };

  return navigateProvider;
};
