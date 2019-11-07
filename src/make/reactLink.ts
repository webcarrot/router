import * as React from "react";

import { Payload, Context, RoutesMap } from "../types";

import { ReactContextValue } from "../make/reactContextProvider/types";
import { Link } from "../component/Link";
import { LinkProps } from "../component/Link/types";

export const make = <
  MAP extends RoutesMap<MAP, P, C>,
  P extends Payload,
  C extends Context
>(
  ReactContext: React.Context<ReactContextValue<MAP, P, C>>
) => {
  const Wrap = <ID extends keyof MAP>(
    props: LinkProps<MAP, P, C, ID>,
    ref?: any
  ) => Link({ ...props, ReactContext }, ref);
  return React.memo(React.forwardRef(Wrap)) as typeof Wrap;
};
