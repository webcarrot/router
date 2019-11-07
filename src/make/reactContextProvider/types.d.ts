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
  RoutesMap
} from "../../types";

import { RouteContext } from "../context/types";

export type RouteInfo<
  MAP extends RoutesMap<MAP, P, C>,
  P extends Payload,
  C extends Context
> = Exclude<
  Unpacked<ReturnType<MAP[Extract<keyof MAP, string>]["execute"]>>,
  false
>;

export type ReactContextInfo<
  MAP extends RoutesMap<MAP, P, C>,
  P extends Payload,
  C extends Context
> = {
  error: () => any;
  info: () => RouteInfo<MAP, P, C>;
  inProgress: () => boolean;
  isCurrent: (id: Extract<keyof MAP, string>, params?: MatchInfo) => boolean;
};

export type ReactContextValue<
  MAP extends RoutesMap<MAP, P, C>,
  P extends Payload,
  C extends Context
> = RouteContext<MAP, P, C> & ReactContextInfo<MAP, P, C>;
