import {
  Context,
  RoutesMap,
  RouteInterface,
  ExtractRouteMatch,
} from "../../types";
import { FullContext } from "..";

export function make<
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context = Context
>(routes: RoutesMap<MAP>, context: FullContext<MAP, C>) {
  return <ID extends MAP["id"]>(
    id: ID,
    payload: ExtractRouteMatch<MAP, ID, C>
  ) => routes[id].build(payload, context);
}
