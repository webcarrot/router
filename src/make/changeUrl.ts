import {
  Payload,
  Output,
  Context,
  OnEnd,
  RoutesMap,
  RouteInterface,
  ExtractRouteMatch,
  ExtractRouteOutput,
} from "../types";
import { ChangeType } from "../utils/enums";
import { FullContext } from "./context/types";
import { promisfy } from "../utils/promisfy";

export const make = <
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context = Context
>(
  routes: RoutesMap<MAP>,
  context: FullContext<MAP, C>,
  onChange: OnEnd<MAP, C>
) => {
  const changeUrlProvider = <ID extends MAP["id"]>(
    id: ID,
    match: ExtractRouteMatch<MAP, ID, C>,
    output: ExtractRouteOutput<MAP, ID, C>,
    changeType: ChangeType = ChangeType.REPLACE
  ) => {
    const route = routes[id];
    const url = route.build(match, context);
    if (url) {
      const no = Date.now();
      const payload: Payload = {
        method: "GET",
        no,
        url,
        changeType,
        body: null,
      } as Payload;
      return promisfy(() => route.prepare({ ...output, url } as Output))
        .then((Component) => ({
          id,
          route,
          payload,
          match,
          output,
          Component,
        }))
        .then((output) => onChange(no, output as any));
    } else {
      return Promise.reject(new Error("Unknown link"));
    }
  };

  return changeUrlProvider;
};
