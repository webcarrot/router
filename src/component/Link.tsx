import * as React from "react";

import { Context, RouteInterface, ExtractRouteMatch } from "../types";

import { ReactContextValue } from "../make/reactContextProvider/types";
import { ChangeType } from "../utils/enums";

type RouteProps<
  R extends RouteInterface<any, any, any, C>,
  C extends Context,
  ID = R["id"]
> = {
  route: ID;
  match: ExtractRouteMatch<R, ID, C>;
};

export const Link = <
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context,
  ID extends MAP["id"]
>(
  {
    route,
    match,
    ReactContext,
    onClick,
    href,
    changeType = ChangeType.PUSH,
    ...rest
  }: RouteProps<MAP, C, ID> & {
    changeType?: ChangeType;
    children?: React.ReactNode;
    ReactContext: React.Context<ReactContextValue<MAP, C>>;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>,
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
