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
  MAP extends RoutesMap<MAP, P, C>,
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
  MAP extends RoutesMap<MAP, P, C>,
  P extends Payload,
  C extends Context
> {
  id: Extract<keyof MAP, string>;
  match: MatchInfo;
}
