import { ChangeType } from "../../utils/enums";
import {
  RouteInterface,
  MatchInfo,
  Output,
  Payload,
  Context,
  Method,
  RoutesMap,
  ExtractRouteMatch
} from "../../types";

export type LinkProps<
  MAP extends RouteInterface<any, P, MatchInfo, Output, C>,
  P extends Payload,
  C extends Context,
  ID extends MAP["id"] = MAP["id"]
> = {
  href?: string;
  route: ID;
  match: ExtractRouteMatch<MAP, ID, P, C>;
  changeType?: ChangeType;
} & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;
