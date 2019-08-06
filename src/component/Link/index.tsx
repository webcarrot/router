import * as React from "react";

import {
  RouteInterface,
  Payload,
  Output,
  ComponentProps,
  MatchInfo,
  Context
} from "../../types";

import { ReactContextValue } from "../../make/reactContextProvider/types";
import { ChangeType } from "../../utils/enums";
import { LinkProps } from "./types";

export const Link = <
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
  CP extends ComponentProps,
  ID extends keyof MAP
>(
  {
    route,
    match,
    ReactContext,
    onClick,
    href,
    changeType = ChangeType.PUSH,
    ...rest
  }: LinkProps<MAP, P, C, CP, ID> & {
    ReactContext: React.Context<ReactContextValue<MAP, P, C, CP>>;
  },
  ref?: any
) => {
  const { makeLink, navigate } = React.useContext(ReactContext);

  const handleClick = React.useCallback(
    (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (onClick) {
        onClick(ev);
      }
      if (!ev.defaultPrevented) {
        navigate(route, { match, changeType });
        ev.preventDefault();
      }
    },
    [route, match]
  );

  const link = makeLink(route, match);

  return <a {...rest} href={link || href} onClick={handleClick} ref={ref} />;
};

export const LinkMemo = React.memo(React.forwardRef(Link)) as typeof Link;
