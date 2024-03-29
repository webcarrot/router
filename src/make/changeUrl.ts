import {
  Payload,
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

export function make<
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context = Context
>(
  routes: RoutesMap<MAP>,
  context: FullContext<MAP, C>,
  onChange?: OnEnd<MAP, C>
) {
  const changeUrlProvider = <ID extends MAP["id"]>(
    id: ID,
    match: ExtractRouteMatch<MAP, ID, C>,
    baseOutput: ExtractRouteOutput<MAP, ID, C>,
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
      } as Payload;
      const output = { ...baseOutput, url };
      return promisfy(() => route.prepare(output))
        .then((Component) => ({
          id,
          route,
          payload,
          match,
          output,
          Component,
        }))
        .then((output) => {
          if (onChange) {
            onChange(no, output as any);
          }
        });
    } else {
      return Promise.reject(new Error("Unknown link"));
    }
  };

  return changeUrlProvider;
}
