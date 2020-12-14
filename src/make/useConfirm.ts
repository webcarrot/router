import * as React from "react";

import { Context, RouteInterface } from "../types";

import { ReactContextValue } from "../make/reactContextProvider/types";
import { useConfirm } from "../component/useConfirm";

export const make = <
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context
>(
  ReactContext: React.Context<ReactContextValue<MAP, C>>
) => (onConfirm: (() => Promise<boolean>) | null) =>
  useConfirm(onConfirm, ReactContext);
