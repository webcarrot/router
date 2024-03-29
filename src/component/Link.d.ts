import {
  RefAttributes,
  ReactNode,
  Context as RContext,
  AnchorHTMLAttributes,
} from "react";
import {
  RouteInterface,
  ExtractRouteMatch,
  ExtractRoute,
  Context,
} from "../types";
import { ChangeType } from "../utils/enums";
import { ReactContextValue } from "../make/reactContextProvider/types";

type RouteProps<
  R extends RouteInterface<any, any, any, C>,
  C extends Context,
  ID = R["id"]
> = {
  route: ID;
  match: ExtractRouteMatch<R, ID, C>;
};

export declare const Link: <
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context,
  ID extends MAP["id"]
>(
  props: RouteProps<ExtractRoute<ID, MAP>, C, ID> & {
    changeType?: ChangeType;
    children?: ReactNode;
    ReactContext: RContext<ReactContextValue<MAP, C>>;
  } & AnchorHTMLAttributes<HTMLAnchorElement> &
    RefAttributes<"a">
) => JSX.Element;
