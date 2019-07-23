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
>({
  route,
  payload,
  ReactContext,
  onClick,
  href,
  changeType = ChangeType.PUSH,
  ...rest
}: LinkProps<MAP, P, C, CP, ID> & {
  ReactContext: React.Context<ReactContextValue<MAP, P, C, CP>>;
}) => {
  const { makeLink, navigate } = React.useContext(ReactContext);

  const handleClick = React.useCallback(
    (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (onClick) {
        onClick(ev);
      }
      if (!ev.defaultPrevented) {
        navigate(route, payload, true, "GET", Date.now(), changeType);
        ev.preventDefault();
      }
    },
    [route, payload]
  );

  const link = makeLink(route, payload);

  return <a {...rest} href={link || href} onClick={handleClick} />;
};

export const LinkMemo = React.memo(Link) as typeof Link;
