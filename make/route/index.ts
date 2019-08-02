import {
  Action,
  Prepare,
  Output,
  Payload,
  RouteInterface,
  MatchInfo,
  ComponentProps,
  Context,
  OnStart,
  OnError
} from "../../types";
import { RouteMatchProvider } from "../match/types";
import { make as makeMatch } from "../match";
import { isRedirect } from "../../utils/isRedirect";
import { RouteInit } from "./types";

export const make = <
  ID extends string,
  P extends Payload,
  M extends MatchInfo,
  O extends Output,
  C extends Context,
  CP extends ComponentProps
>(
  id: ID,
  path: RouteMatchProvider<P, M, C>,
  init: RouteInit<ID, P, M, O, C, CP>
): RouteInterface<ID, P, M, O, C, CP> => {
  const { match, build } = makeMatch<P, M, C>(path);
  let _initialization: Promise<void>;
  let _prepare: Prepare<ID, P, M, O, C, CP>;
  let _action: Action<P, M, O, C>;

  const initialization = () => {
    if (!_initialization) {
      _initialization = init().then(config => {
        _prepare = config.prepare;
        _action = config.action;
      });
    }
    return _initialization;
  };

  const prepare = (output: O) => initialization().then(() => _prepare(output));

  const action = (props: P, match: M, context: C) =>
    initialization().then(() => _action(props, match, context));

  const execute = async (
    url: URL,
    payload: P,
    context: C,
    doPrepare: boolean = true,
    onStart?: OnStart,
    onError?: OnError
  ) => {
    try {
      const m = await match(url, payload, context);
      if (m) {
        if (onStart && onStart(payload.no) === false) {
          return;
        }
        const o = (await action(payload, m, context)) as O;
        const Component =
          !doPrepare || isRedirect(o.status) ? null : await prepare(o);
        return {
          id,
          route,
          payload,
          match: m,
          output: o,
          Component
        };
      }
    } catch (err) {
      if (onError && onError(payload.no, err)) {
        throw err;
      }
    }
    return null;
  };

  const route = {
    id,
    match,
    build,
    prepare,
    action,
    execute
  };

  return route;
};
