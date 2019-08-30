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
  OnError,
  Build,
  Match,
  Execute
} from "../../types";
import { isRedirect } from "../../utils/isRedirect";
import { promisfy } from "../../utils/promisfy";
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
  match: Match<P, M, C>,
  build: Build<M, C>,
  init: RouteInit<ID, P, M, O, C, CP>
): RouteInterface<ID, P, M, O, C, CP> => {
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

  const execute: Execute<ID, P, M, O, C, CP> = (
    url: URL,
    payload: P,
    context: C,
    doPrepare: boolean = true,
    onStart?: OnStart,
    onError?: OnError
  ) =>
    promisfy(() => match(url, payload, context))
      .then(m => {
        if (m) {
          if (onStart && onStart(payload.no) === false) {
            return;
          }
          return action(payload, m, context).then((o: O) =>
            (!doPrepare || isRedirect(o.status)
              ? Promise.resolve(null)
              : prepare(o)
            ).then(Component => ({
              id,
              route,
              payload,
              match: m,
              output: o,
              Component
            }))
          );
        }
      })
      .catch(err => {
        if (onError && onError(payload.no, err)) {
          throw err;
        }
        return null;
      });

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
