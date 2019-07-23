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
import { make as makeLinkProvider } from "./link";
import { LinkPayload } from "./link/types";
import { execute } from "../utils/execute";
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
      no: number,
      changeType: ChangeType,
      body: any
    ): Promise<void>;
    <N extends keyof D>(
      id: N,
      payload: LinkPayload<MatchInfo, C, D[N]["build"]>,
      prepare: boolean,
      method: "GET",
      no: number,
      changeType: ChangeType
    ): Promise<void>;
  };

  const navigateProvider: NavigateProvider<typeof routes> = async (
    id: any,
    payload: any,
    prepare: any = true,
    method: any = "GET",
    no: number,
    changeType: ChangeType = ChangeType.PUSH,
    body?: any
  ) => {
    const url = linkProvider(id, payload);
    if (url) {
      const payload: P =
        method === "POST"
          ? ({
              method: "POST",
              url,
              no,
              changeType,
              body
            } as P)
          : ({
              method: "GET",
              url,
              no,
              changeType
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
        onEnd(no, output);
      }
    } else {
      throw new Error("Unknown link");
    }
  };

  return navigateProvider;
};
