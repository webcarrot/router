import {
  Context,
  RoutesMap,
  RouteInterface,
  ExtractRouteMatch
} from "../../types";
import { FullContext } from "..";

export const make = <
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context = Context
>(
  routes: RoutesMap<MAP>,
  context: FullContext<MAP, C>
) => <ID extends MAP["id"]>(id: ID, payload: ExtractRouteMatch<MAP, ID, C>) =>
  routes[id].build(payload, context);
