import * as React from "react";

import {
  Payload,
  Context,
  OnStart,
  OnError,
  OnEnd,
  RoutesMap,
  RouteInterface,
  ExtractRouteFullOutput,
} from "../types";

import { make as makeContext } from "../make/context";
import {
  ReactContextValue,
  ReactContextInfo,
} from "../make/reactContextProvider/types";

import { compare } from "../utils/compare";

import { NAVIGATION_MODE } from "../utils/constants";
import { NavigationMode, ChangeType } from "../utils/enums";
import { isRedirect } from "../utils/isRedirect";

interface ReactContextState<
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context
> {
  error?: any;
  firstLoad: boolean;
  current: number;
  next: number;
  info: ExtractRouteFullOutput<MAP, MAP["id"], C>;
  inProgress: boolean;
}

interface HistoryState {
  url: string;
}

export const ContextProvider = React.memo(
  <MAP extends RouteInterface<any, any, any, C>, C extends Context>({
    routes,
    context,
    initialInfo,
    ReactContext,
    children,
  }: {
    routes: RoutesMap<MAP>;
    context: C;
    initialInfo: ExtractRouteFullOutput<MAP, MAP["id"], C>;
    ReactContext: React.Context<ReactContextValue<MAP, C>>;
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
          info: ExtractRouteFullOutput<MAP, MAP["id"], C>;
        }
      | {
          type: "ERROR";
          no: number;
          error: any;
        }
      | {
          type: "CHANGE";
          no: number;
          info: ExtractRouteFullOutput<MAP, MAP["id"], C>;
        };

    const confirmRef = React.useRef<ReadonlyArray<() => Promise<boolean>>>(
      null
    );

    const [state, dispatch] = React.useReducer<
      React.Reducer<ReactContextState<MAP, C>, ReducerActions>
    >(
      (state, action) => {
        switch (action.type) {
          case "START":
            if (action.no > state.next) {
              return {
                ...state,
                next: action.no,
                inProgress: true,
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
                inProgress: false,
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
              inProgress: false,
            };
          }
          case "ERROR":
            if (action.no === state.next) {
              return {
                ...state,
                current: action.no,
                error: action.error,
                inProgress: false,
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
        inProgress: false,
      }
    );

    React.useEffect(() => {
      if (NAVIGATION_MODE === NavigationMode.MODERN) {
        if (!state.inProgress && state.current > 0) {
          const { title, url } = state.info.output;
          const historyState: HistoryState = {
            url,
          };
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
      const onStart: OnStart = (no, ignoreConfirm) =>
        new Promise<boolean>((resolve, reject) => {
          if (NAVIGATION_MODE === NavigationMode.LEGACY) {
            resolve(false);
          } else if (!ignoreConfirm && confirmRef.current) {
            Promise.all(confirmRef.current.map((cb) => cb())).then(
              (allow: ReadonlyArray<boolean>) => {
                if (!allow.includes(false)) {
                  dispatch({ type: "START", no });
                  resolve(true);
                } else {
                  resolve(false);
                }
              },
              reject
            );
          } else {
            dispatch({ type: "START", no });
            resolve(true);
          }
        });
      const onEnd: OnEnd<MAP, C> = (no, info) => {
        if (isRedirect(info.output.status)) {
          routeContext.navigateToUrl({
            url: info.output.url,
            changeType: info.payload.changeType,
            method: "GET",
            no: Date.now(),
          } as Payload);
        } else {
          dispatch({ type: "END", no, info });
        }
      };
      const onError: OnError = (no, error) => {
        dispatch({ type: "ERROR", no, error });
      };

      const onChangeUrl: OnEnd<MAP, C> = (no, info) => {
        dispatch({ type: "CHANGE", no, info });
      };

      const routeContext = makeContext<MAP, C>(
        routes,
        context,
        onStart,
        onEnd,
        onError,
        onChangeUrl
      ).route;

      return routeContext;
    }, [context]);

    const reactRouteContext = React.useMemo<ReactContextInfo<MAP, C>>(
      () => ({
        error: () => state.error,
        info: () => state.info,
        inProgress: () => state.inProgress,
        isCurrent: (id, match) =>
          state.info.id === id && (!match || compare(match, state.info.match)),
        confirm: (cb) => {
          confirmRef.current = [...(confirmRef.current || []), cb];
          return () => {
            if (confirmRef.current && confirmRef.current.includes(cb)) {
              if (confirmRef.current.length > 1) {
                confirmRef.current = confirmRef.current.filter((v) => v !== cb);
              } else {
                confirmRef.current = null;
              }
            }
          };
        },
      }),
      [state]
    );

    const contextValue = React.useMemo<ReactContextValue<MAP, C>>(
      () => ({
        ...routeContext,
        ...reactRouteContext,
      }),
      [routeContext, reactRouteContext]
    );

    React.useEffect(() => {
      if (NAVIGATION_MODE === NavigationMode.MODERN) {
        const handlePopState = (ev: PopStateEvent) => {
          const state: HistoryState = ev.state || {
            url: initialInfo.output.url,
            title: initialInfo.output.title,
          };
          contextValue.navigateToUrl({
            url: state.url,
            method: "GET",
            no: Date.now(),
            changeType: ChangeType.HISTORY,
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
  }
);
