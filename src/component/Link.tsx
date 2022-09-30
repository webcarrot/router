import {
  ReactNode,
  useCallback,
  useContext,
  ForwardedRef,
  Context as RContext,
  AnchorHTMLAttributes,
  MouseEvent as RMouseEvent,
} from "react";

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

export function Link<
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
    target,
    ...rest
  }: RouteProps<MAP, C, ID> & {
    changeType?: ChangeType;
    children?: ReactNode;
    ReactContext: RContext<ReactContextValue<MAP, C>>;
  } & AnchorHTMLAttributes<HTMLAnchorElement>,
  ref?: ForwardedRef<"a">
) {
  const { makeLink, navigate } = useContext(ReactContext);

  const handleClick = useCallback(
    (ev: RMouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (onClick) {
        onClick(ev);
      }
      if (!ev.defaultPrevented && !target) {
        navigate(route, { match, changeType });
        ev.preventDefault();
      }
    },
    [route, match, target]
  );

  const link = makeLink(route, match);

  return (
    <a
      {...rest}
      href={link || href}
      onClick={handleClick}
      target={target}
      ref={ref as any}
    />
  );
}
