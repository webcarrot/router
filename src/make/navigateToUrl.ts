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
import { execute } from "../utils";

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
) => (payload: P) =>
  execute<MAP, P, C, CP>(routes, payload, context, true, onStart, onError).then(
    out => {
      onEnd(payload.no, out);
    }
  );
