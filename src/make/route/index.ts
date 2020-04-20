import {
  Action,
  Prepare,
  Output,
  Payload,
  RouteInterface,
  MatchInfo,
  Context,
  OnStart,
  OnError,
  Build,
  Match,
  Execute,
} from "../../types";
import { isRedirect } from "../../utils/isRedirect";
import { promisfy } from "../../utils/promisfy";
import { RouteInit } from "./types";

export const make = <
  ID,
  M extends MatchInfo,
  O extends Output,
  C extends Context
>(
  id: ID,
  match: Match<M, C>,
  build: Build<M, C>,
  init: RouteInit<ID, M, O, C>
): RouteInterface<ID, M, O, C> => {
  let _initialization: Promise<void>;
  let _prepare: Prepare<ID, M, O, C>;
  let _action: Action<M, O, C>;

  const initialization = () => {
    if (!_initialization) {
      _initialization = promisfy(init).then((config) => {
        _prepare = config.prepare;
        _action = config.action;
      });
    }
    return _initialization;
  };

  const prepare = (output: O) => initialization().then(() => _prepare(output));

  const action = (props: Payload, match: M, context: C) =>
    initialization().then(() => _action(props, match, context));

  const execute: Execute<ID, M, O, C> = (
    url: URL,
    payload: Payload,
    context: C,
    doPrepare: boolean = true,
    onStart: OnStart,
    onError: OnError
  ) =>
    promisfy(() => match(url, payload, context))
      .then((m) => {
        if (m) {
          if (onStart && onStart(payload.no) === false) {
            return;
          }
          return action(payload, m, context).then((o: O) =>
            (!doPrepare || isRedirect(o.status)
              ? Promise.resolve(null)
              : prepare(o)
            ).then((Component) => ({
              id,
              route,
              payload,
              match: m,
              output: o,
              Component,
            }))
          );
        }
      })
      .catch((err) => {
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
    execute,
  };

  return route;
};
