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
          if (action.no === state.current) {
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
          if (action.no === state.current) {
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

  const onStart: OnStart = React.useCallback(no => {
    dispatch({ type: "START", no });
    if (NAVIGATION_MODE === NavigationMode.LEGACY) {
      return false;
    }
  }, []);

  const onEnd: OnEnd<typeof routes, P, C, CP> = React.useCallback(
    (no, info) => {
      dispatch({ type: "END", no, info });
    },
    []
  );

  const onError: OnError = React.useCallback(
    (no, error) => {
      dispatch({ type: "ERROR", no, error });
    },
    [state.current]
  );

  React.useEffect(() => {
    if (NAVIGATION_MODE === NavigationMode.MODERN) {
      if (!state.inProgress && state.current > 0) {
        const historyState: HistoryState<typeof routes, P, C, CP> = {
          id: state.info.id,
          match: state.info.match
        };
        switch (state.info.payload.changeType) {
          case ChangeType.PUSH:
            history.pushState(
              historyState,
              (state.info.output as any).title,
              state.info.output.url
            );
            break;
          case ChangeType.REPLACE:
            history.replaceState(
              historyState,
              (state.info.output as any).title,
              state.info.output.url
            );
            break;
        }
      }
    }
  }, [state.inProgress]);

  const routeContext = React.useMemo(
    () =>
      makeContext<typeof routes, P, C, CP>(
        routes,
        context,
        onStart,
        onEnd,
        onError
      ).route,
    [context, onStart, onEnd, onError]
  );

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
        if (ev.state) {
          const { id, match } = ev.state as HistoryState<
            typeof routes,
            P,
            C,
            CP
          >;
          contextValue.navigate(
            id,
            match as any,
            true,
            "GET",
            Date.now(),
            ChangeType.HISTORY
          );
        }
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
