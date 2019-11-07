import * as React from "react";

import {
  Payload,
  Context,
  OnStart,
  OnError,
  OnEnd,
  RoutesMap
} from "../../types";

import { make as makeContext } from "../../make/context";
import {
  ReactContextValue,
  RouteInfo,
  ReactContextInfo
} from "../../make/reactContextProvider/types";

import { compare } from "../../utils/compare";

import { NAVIGATION_MODE } from "../../utils/constants";
import { NavigationMode, ChangeType } from "../../utils/enums";
import { ReactContextState, HistoryState } from "./types";
import { isRedirect } from "../../utils/isRedirect";

export const ContextWrapper = <
  MAP extends RoutesMap<MAP, P, C>,
  P extends Payload,
  C extends Context
>({
  routes,
  context,
  initialInfo,
  ReactContext,
  children
}: {
  routes: MAP;
  context: C;
  initialInfo: RouteInfo<typeof routes, P, C>;
  ReactContext: React.Context<ReactContextValue<typeof routes, P, C>>;
  children: React.ReactNode;
}) => {
  type ReducerActions =
    | {
        type: "START";
        no: number;
      }
    | {
        type: "END";
        no: number;
        info: RouteInfo<typeof routes, P, C>;
      }
    | {
        type: "ERROR";
        no: number;
        error: any;
      }
    | {
        type: "CHANGE";
        no: number;
        info: RouteInfo<typeof routes, P, C>;
      };

  const [state, dispatch] = React.useReducer<
    React.Reducer<ReactContextState<typeof routes, P, C>, ReducerActions>
  >(
    (state, action) => {
      switch (action.type) {
        case "START":
          if (action.no > state.next) {
            return {
              ...state,
              next: action.no,
              inProgress: true
            };
          } else {
            break;
          }
        case "END":
          if (action.no === state.next) {
            return {
              ...state,
              current: action.no,
              info: action.info,
              error: null,
              inProgress: false
            };
          } else {
            break;
          }
        case "CHANGE": {
          return {
            ...state,
            current: action.no,
            info: action.info,
            error: null,
            inProgress: false
          };
        }
        case "ERROR":
          if (action.no === state.next) {
            return {
              ...state,
              current: action.no,
              error: action.error,
              inProgress: false
            };
          } else {
            break;
          }
      }
      return state;
    },
    {
      firstLoad: true,
      current: 0,
      next: 0,
      info: initialInfo,
      inProgress: false
    }
  );

  React.useEffect(() => {
    if (NAVIGATION_MODE === NavigationMode.MODERN) {
      if (!state.inProgress && state.current > 0) {
        const historyState: HistoryState<typeof routes, P, C> = {
          id: state.info.id,
          match: state.info.match
        };
        const { title, url } = state.info.output;
        document.title = title;
        switch (state.info.payload.changeType) {
          case ChangeType.PUSH:
            history.pushState(historyState, title, url);
            break;
          case ChangeType.REPLACE:
            history.replaceState(historyState, title, url);
            break;
        }
      }
    }
  }, [state.inProgress, state.current]);

  const routeContext = React.useMemo(() => {
    const onStart: OnStart = no => {
      dispatch({ type: "START", no });
      if (NAVIGATION_MODE === NavigationMode.LEGACY) {
        return false;
      }
    };
    const onEnd: OnEnd<typeof routes, P, C> = (no, info) => {
      if (isRedirect(info.output.status)) {
        routeContext.navigateToUrl({
          url: info.output.url,
          changeType: info.payload.changeType,
          method: "GET",
          no: Date.now()
        } as P);
      } else {
        dispatch({ type: "END", no, info });
      }
    };
    const onError: OnError = (no, error) => {
      dispatch({ type: "ERROR", no, error });
    };

    const onChangeUrl: OnEnd<typeof routes, P, C> = (no, info) => {
      dispatch({ type: "CHANGE", no, info });
    };

    const routeContext = makeContext<typeof routes, P, C>(
      routes,
      context,
      onStart,
      onEnd,
      onError,
      onChangeUrl
    ).route;

    return routeContext;
  }, [context]);

  const reactRouteContext = React.useMemo<
    ReactContextInfo<typeof routes, P, C>
  >(
    () => ({
      error: () => state.error,
      info: () => state.info,
      inProgress: () => state.inProgress,
      isCurrent: (id, match) =>
        state.info.id === id && (!match || compare(match, state.info.match))
    }),
    [state]
  );

  const contextValue = React.useMemo<ReactContextValue<typeof routes, P, C>>(
    () => ({
      ...routeContext,
      ...reactRouteContext
    }),
    [routeContext, reactRouteContext]
  );

  React.useEffect(() => {
    if (NAVIGATION_MODE === NavigationMode.MODERN) {
      const handlePopState = (ev: PopStateEvent) => {
        const state: HistoryState<typeof routes, P, C> = ev.state || {
          id: initialInfo.id,
          match: initialInfo.match
        };
        const { id, match } = state;
        contextValue.navigate(id, {
          match: match as any,
          changeType: ChangeType.HISTORY
        });
      };
      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }
  }, [contextValue]);

  return (
    <ReactContext.Provider value={contextValue}>
      {children}
    </ReactContext.Provider>
  );
};

export const ContextWrapperMemo = React.memo(
  ContextWrapper
) as typeof ContextWrapper;
