import {
  RouteInterface,
  Payload,
  Output,
  ComponentProps,
  MatchInfo,
  Context,
  OnStart,
  OnError,
  OnEnd,
  Method
} from "../types";
import { make as makeLinkProvider } from "./link";
import { LinkMatch } from "./link/types";
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

  const navigateProvider: NavigateProvider<typeof routes> = async (
    id: any,
    {
      match = {},
      prepare = true,
      method = "GET",
      no = Date.now(),
      changeType = ChangeType.PUSH
    }: {
      match?: any;
      prepare?: boolean;
      method?: Method;
      no?: number;
      changeType?: ChangeType;
    }
  ) => {
    const url = linkProvider(id, match);
    if (url) {
      const payload: P =
        method === "POST"
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
