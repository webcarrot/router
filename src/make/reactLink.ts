import {
  memo,
  forwardRef,
  Context as RContext,
  RefAttributes,
  ReactNode,
} from "react";

import {
  Context,
  ExtractRoute,
  ExtractRouteMatch,
  RouteInterface,
} from "../types";

import { ReactContextValue } from "../make/reactContextProvider/types";
import { Link } from "../component/Link";
import { ChangeType } from "../utils/enums";

export type RouteProps<
  R extends RouteInterface<any, any, any, C>,
  C extends Context,
  ID = R["id"]
> = {
  route: ID;
  match: ExtractRouteMatch<R, ID, C>;
};

export function make<
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context
>(ReactContext: RContext<ReactContextValue<MAP, C>>) {
  return memo(
    forwardRef<"a", any>((props, ref) => Link({ ...props, ReactContext }, ref))
  ) as <ID extends MAP["id"]>(
    props: RouteProps<ExtractRoute<ID, MAP>, C, ID> & {
      changeType?: ChangeType;
      children?: ReactNode;
    } & React.AnchorHTMLAttributes<HTMLAnchorElement> &
      RefAttributes<"a">
  ) => JSX.Element;
}
