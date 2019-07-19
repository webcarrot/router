import { MatchInfo, Context, Build } from "../../types";

export type LinkPayload<
  M extends MatchInfo,
  C extends Context,
  T extends Build<M, C>
> = T extends (p: infer LP, c: C) => any ? LP : never;
