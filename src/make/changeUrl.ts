import {
  Payload,
  Output,
  Context,
  OnEnd,
  RoutesMap,
  RouteInterface,
  MatchInfo,
  ExtractRouteMatch,
  ExtractRouteOutput
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
  onChange?: OnEnd<MAP, P, C>
) => {
  const changeUrlProvider = <ID extends MAP["id"]>(
    id: ID,
    match: ExtractRouteMatch<MAP, ID, P, C>,
    output: ExtractRouteOutput<MAP, ID, P, C>,
    changeType: ChangeType = ChangeType.REPLACE
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
