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
} from "../types";

import { make as makeContext } from "../make/context";
import {
  ReactContextValue,
  RouteInfo,
  ReactContextState
} from "../make/reactContextProvider/types";

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
      current: 0,
      next: 0,
      info: initialInfo,
      inProgress: false
    }
  );

  const onStart: OnStart = no => {
    dispatch({ type: "START", no });
  };

  const onEnd: OnEnd<typeof routes, P, C, CP> = (no, info) => {
    dispatch({ type: "END", no, info });
  };

  const onError: OnError = (no, error) => {
    dispatch({ type: "ERROR", no, error });
  };

  const routeContext = React.useMemo(
    () =>
      makeContext<typeof routes, P, C, CP>(
        routes,
        context,
        onStart,
        onEnd,
        onError
      ).route,
    []
  );

  const contextValue = React.useMemo(
    () => ({
      ...routeContext,
      ...state
    }),
    [routeContext, state]
  );

  return (
    <ReactContext.Provider value={contextValue}>
      {children}
    </ReactContext.Provider>
  );
};

export const ContextWrapperMemo = React.memo(ContextWrapper);
