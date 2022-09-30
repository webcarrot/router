import { Context as RContext } from "react";

import { Context, RouteInterface } from "../types";

import { ReactContextValue } from "../make/reactContextProvider/types";
import { useConfirm } from "../component/useConfirm";

export function make<
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context
>(ReactContext: RContext<ReactContextValue<MAP, C>>) {
  return (onConfirm: (() => Promise<boolean>) | null) =>
    useConfirm(onConfirm, ReactContext);
}
