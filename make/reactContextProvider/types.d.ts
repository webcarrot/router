import {
  RouteInterface,
  Payload,
  Output,
  ComponentProps,
  MatchInfo,
  Context,
  OnStart,
  OnError,
  OnEnd,
  Unpacked
} from "../../types";

import { RouteContext } from "../context/types";

export type RouteInfo<
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
> = Exclude<
  Unpacked<ReturnType<MAP[Extract<keyof MAP, string>]["execute"]>>,
  false
>;

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
  current: number;
  next: number;
  info: RouteInfo<MAP, P, C, CP>;
  inProgress: boolean;
};

export type ReactContextValue<
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
> = RouteContext<MAP, P, C, CP> & ReactContextState<MAP, P, C, CP>;
