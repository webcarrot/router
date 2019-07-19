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
      ComponentProps
    >;
  },
  P extends Payload,
  C extends Context
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
      ComponentProps
    >;
  },
  P extends Payload,
  C extends Context
> = {
  error?: any;
  current: number;
  next: number;
  info: RouteInfo<MAP, P, C>;
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
      ComponentProps
    >;
  },
  P extends Payload,
  C extends Context
> = RouteContext<MAP, P, C> & ReactContextState<MAP, P, C>;
