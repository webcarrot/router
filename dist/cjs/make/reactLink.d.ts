import {
  MemoExoticComponent,
  ForwardRefExoticComponent,
  RefAttributes
} from "react";

import {
  Context,
  RouteInterface,
  ExtractRouteMatch,
  Unpacked,
  RoutesMap,
  ExtractRoute
} from "../types";

import { ReactContextValue } from "./reactContextProvider/types";
import { ChangeType } from "../utils/enums";

export type RouteProps<
  R extends RouteInterface<any, any, any, C>,
  C extends Context,
  ID = R["id"]
> = {
  route: ID;
  match: ExtractRouteMatch<R, ID, C>;
};

export declare const make: <
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context
>(
  ReactContext: React.Context<ReactContextValue<MAP, C>>
) => <ID extends MAP["id"]>(
  props: RouteProps<ExtractRoute<ID, MAP>, C, ID> & {
    changeType?: ChangeType;
    children?: React.ReactNode;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement> &
    RefAttributes<"a">
) => JSX.Element;
