import {
  RouteInterface,
  MatchInfo,
  Output,
  Payload,
  Context,
  ComponentProps
} from "../../types";
import { RouteInfo } from "../../make/reactContextProvider/types";

export type ReactContextState<
  MAP extends {
    [key: string]: RouteInterface<
      Extract<keyof MAP, string>,
      P,
      MatchInfo,
      Output,
      C,
      CP
    >;
  },
  P extends Payload,
  C extends Context,
  CP extends ComponentProps
> = {
  error?: any;
  firstLoad: boolean;
  current: number;
  next: number;
  info: RouteInfo<MAP, P, C, CP>;
  inProgress: boolean;
};

export type HistoryState<
  MAP extends {
    [key: string]: RouteInterface<
      Extract<keyof MAP, string>,
      P,
      MatchInfo,
      Output,
      C,
      CP
    >;
  },
  P extends Payload,
  C extends Context,
  CP extends ComponentProps
> = {
  id: Extract<keyof MAP, string>;
  match: MatchInfo;
};
