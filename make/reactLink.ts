import * as React from "react";

import {
  RouteInterface,
  Payload,
  Output,
  ComponentProps,
  MatchInfo,
  Context
} from "../types";

import { ReactContextValue } from "../make/reactContextProvider/types";
import { Link } from "../component/Link";
import { LinkProps } from "../component/Link/types";

export const make = <
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
  CP extends ComponentProps
>(
  ReactContext: React.Context<ReactContextValue<MAP, P, C, CP>>
) => {
  const Wrap = <ID extends keyof MAP>(
    props: LinkProps<MAP, P, C, CP, ID>,
    ref?: any
  ) => Link({ ...props, ReactContext }, ref);
  return React.memo(React.forwardRef(Wrap)) as typeof Wrap;
};
