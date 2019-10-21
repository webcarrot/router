import {
  RouteInterface,
  MatchInfo,
  Output,
  Payload,
  Context
} from "../../types";
import { RouteInfo } from "../../make/reactContextProvider/types";

export interface ReactContextState<
  MAP extends {
    [key: string]: RouteInterface<
      Extract<keyof MAP, string>,
      P,
      MatchInfo,
      Output,
      C
    >;
  },
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
  MAP extends {
    [key: string]: RouteInterface<
      Extract<keyof MAP, string>,
      P,
      MatchInfo,
      Output,
      C
    >;
  },
  P extends Payload,
  C extends Context
> {
  id: Extract<keyof MAP, string>;
  match: MatchInfo;
}
