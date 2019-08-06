import { LinkMatch } from "../../make/link/types";
import { ChangeType } from "../../utils/enums";
import {
  RouteInterface,
  MatchInfo,
  Output,
  Payload,
  Context,
  ComponentProps,
  Method
} from "../../types";

export interface LinkProps<
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
  CP extends ComponentProps,
  ID extends keyof MAP
>
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  href?: string;
  route: ID;
  match: LinkMatch<MAP[ID]["build"], C>;
  changeType?: ChangeType;
}
