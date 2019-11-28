import {
  RouteInterface,
  Payload,
  Output,
  MatchInfo,
  Context,
  OnStart,
  OnError,
  OnEnd,
  Unpacked,
  RoutesMap,
  ExtractRouteFullOutput
} from "../../types";

import { RouteContext } from "../context/types";

export type ReactContextInfo<
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context
> = {
  error: () => any;
  info: <ID extends MAP["id"]>() => ExtractRouteFullOutput<MAP, ID, C>;
  inProgress: () => boolean;
  isCurrent: <ID extends MAP["id"]>(id: ID, params?: MatchInfo) => boolean;
};

export type ReactContextValue<
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context
> = RouteContext<MAP, C> & ReactContextInfo<MAP, C>;
