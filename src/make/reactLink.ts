import * as React from "react";

import { RouteInterface, Payload, Output, MatchInfo, Context } from "../types";

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
      C
    >;
  },
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
