import {
  RouteInterface,
  MatchInfo,
  Output,
  Payload,
  Context,
  RoutesMap
} from "../../types";
import { RouteInfo } from "../../make/reactContextProvider/types";

export interface ReactContextState<
  MAP extends RouteInterface<any, P, MatchInfo, Output, C>,
  P extends Payload,
  C extends Context
> {
  error?: any;
  firstLoad: boolean;
  current: number;
  next: number;
  info: RouteInfo<MAP, P, C>;
  inProgress: boolean;
}

export interface HistoryState<
  MAP extends RouteInterface<any, P, MatchInfo, Output, C>,
  P extends Payload,
  C extends Context
> {
  id: MAP["id"];
  match: MatchInfo;
}
