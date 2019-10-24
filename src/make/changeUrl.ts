import {
  RouteInterface,
  Payload,
  Output,
  MatchInfo,
  Context,
  OnEnd,
  Unpacked
} from "../types";
import { ChangeType } from "../utils/enums";
import { FullContext } from "./context/types";
import { promisfy } from "../utils/promisfy";

export const make = <
  MAP extends {
    [key: string]: RouteInterface<
      Extract<keyof MAP, string>,
      P,
      MatchInfo,
      Output,
      C
    >;
  },
  P extends Payload = Payload,
  C extends Context = Context
>(
  routes: MAP,
  context: FullContext<MAP, P, C>,
  onChange?: OnEnd<typeof routes, P, C>
) => {
  type ChangeUrlProvider<D extends MAP> = {
    <N extends keyof D>(
      id: N,
      match: Exclude<Unpacked<ReturnType<D[N]["match"]>>, false>,
      out: Unpacked<ReturnType<D[N]["action"]>>,
      changeType?: ChangeType
    ): Promise<void>;
  };

  const changeUrlProvider: ChangeUrlProvider<typeof routes> = (
    id,
    match,
    output,
    changeType = ChangeType.REPLACE
  ) => {
    const route = routes[id];
    const url = route.build(match, context);
    if (url) {
      const no = Date.now();
      const payload: P = {
        method: "GET",
        no,
        url,
        changeType,
        body: null
      } as P;
      return promisfy(() => route.prepare(output as Output))
        .then(Component => ({
          id,
          route,
          payload,
          match,
          output,
          Component
        }))
        .then(output => onChange(no, output as any));
    } else {
      return Promise.reject(new Error("Unknown link"));
    }
  };

  return changeUrlProvider;
};
