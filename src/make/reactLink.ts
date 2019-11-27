import * as React from "react";

import { Context, RouteInterface } from "../types";

import { ReactContextValue } from "../make/reactContextProvider/types";
import { Link } from "../component/Link";

export const make = <
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context
>(
  ReactContext: React.Context<ReactContextValue<MAP, C>>
) =>
  React.memo(
    React.forwardRef<"a", any>((props, ref) =>
      Link({ ...props, ReactContext }, ref)
    )
  );
