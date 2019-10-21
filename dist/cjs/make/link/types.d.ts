import {
  MatchInfo,
  Context,
  Build,
  Payload,
  Action,
  Output,
  PostPayload,
  ExecuteOutput,
  Method
} from "../../types";

export type LinkMatch<
  T extends Build<M, C>,
  C extends Context = Context,
  M extends MatchInfo = MatchInfo
> = T extends (p: infer LP, c: C) => any ? LP & { method?: Method } : never;
