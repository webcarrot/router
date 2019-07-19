import { Key, PathFunction } from "path-to-regexp";

import { Match, Build, Payload, MatchInfo, Context } from "../../types";

export type MatchParams = { [key: string]: string | string[] };

export type Path<P extends Payload, M extends MatchInfo, C extends Context> =
  | string
  | RegExp
  | {
      match?: Match<P, M, C> | string | RegExp | Array<string | RegExp>;
      build?: Build<M, C> | string;
    };

export type RoutePath<
  P extends Payload,
  M extends MatchInfo,
  C extends Context
> = Path<P, M, C> | Array<Path<P, M, C>>;
