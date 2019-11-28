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
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context
> = { id: MAP["id"] } & Exclude<Unpacked<ReturnType<MAP["execute"]>>, false>;

export type ReactContextInfo<
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context
> = {
  error: () => any;
  info: () => RouteInfo<MAP, C>;
  inProgress: () => boolean;
  isCurrent: (id: Extract<keyof MAP, string>, params?: MatchInfo) => boolean;
};

export type ReactContextValue<
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context
> = RouteContext<MAP, C> & ReactContextInfo<MAP, C>;
