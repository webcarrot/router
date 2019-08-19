import * as React from "react";

import {
  RouteInterface,
  Payload,
  Output,
  ComponentProps,
  MatchInfo,
  Context,
  OnStart,
  OnError,
  OnEnd
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
import { isRedirect } from "@webcarrot/router/utils";

export const ContextWrapper = <
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
>({
  routes,
  context,
  initialInfo,
  ReactContext,
  children
}: {
  routes: MAP;
  context: C;
  initialInfo: RouteInfo<typeof routes, P, C, CP>;
  ReactContext: React.Context<ReactContextValue<typeof routes, P, C, CP>>;
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
        info: RouteInfo<typeof routes, P, C, CP>;
      }
    | {
        type: "ERROR";
        no: number;
        error: any;
      };

  const [state, dispatch] = React.useReducer<
    React.Reducer<ReactContextState<typeof routes, P, C, CP>, ReducerActions>
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
        const historyState: HistoryState<typeof routes, P, C, CP> = {
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
  }, [state.inProgress]);

  const routeContext = React.useMemo(() => {
    const onStart: OnStart = no => {
      dispatch({ type: "START", no });
      if (NAVIGATION_MODE === NavigationMode.LEGACY) {
        return false;
      }
    };
    const onEnd: OnEnd<typeof routes, P, C, CP> = (no, info) => {
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
    const routeContext = makeContext<typeof routes, P, C, CP>(
      routes,
      context,
      onStart,
      onEnd,
      onError
    ).route;

    return routeContext;
  }, [context]);

  const reactRouteContext = React.useMemo<
    ReactContextInfo<typeof routes, P, C, CP>
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

  const contextValue = React.useMemo<
    ReactContextValue<typeof routes, P, C, CP>
  >(
    () => ({
      ...routeContext,
      ...reactRouteContext
    }),
    [routeContext, reactRouteContext]
  );

  React.useEffect(() => {
    if (NAVIGATION_MODE === NavigationMode.MODERN) {
      const handlePopState = (ev: PopStateEvent) => {
        const state: HistoryState<typeof routes, P, C, CP> = ev.state || {
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
