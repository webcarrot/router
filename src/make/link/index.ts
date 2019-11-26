import {
  Payload,
  Context,
  RoutesMap,
  RouteInterface,
  MatchInfo,
  Output,
  ExtractRouteMatch
} from "../../types";

export const make = <
  MAP extends RouteInterface<any, P, MatchInfo, Output, C>,
  P extends Payload = Payload,
  C extends Context = Context
>(
  routes: RoutesMap<MAP, P, C>,
  context: C
) => <ID extends MAP["id"]>(
  id: ID,
  payload: ExtractRouteMatch<MAP, ID, P, C>
) => routes[id].build(payload, context);
