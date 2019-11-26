import * as React from "react";

import { Payload, Context, RouteInterface, MatchInfo, Output } from "../types";

import { ReactContextValue } from "../make/reactContextProvider/types";
import { Link } from "../component/Link";
import { LinkProps } from "../component/Link/types";

export const make = <
  MAP extends RouteInterface<any, P, MatchInfo, Output, C>,
  P extends Payload,
  C extends Context
>(
  ReactContext: React.Context<ReactContextValue<MAP, P, C>>
) =>
  React.memo(
    React.forwardRef((props: LinkProps<MAP, P, C>, ref?: any) =>
      Link({ ...props, ReactContext }, ref)
    )
  );
