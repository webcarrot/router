import * as React from "react";
import { make as makeContext } from "../make/context";
import { compare } from "../utils/compare";
import { NAVIGATION_MODE } from "../utils/constants";
import { NavigationMode, ChangeType } from "../utils/enums";
import { isRedirect } from "../utils/isRedirect";
export const ContextProvider = React.memo(({ routes, context, initialInfo, ReactContext, children }) => {
    const [state, dispatch] = React.useReducer((state, action) => {
        switch (action.type) {
            case "START":
                if (action.no > state.next) {
                    return {
                        ...state,
                        next: action.no,
                        inProgress: true
                    };
                }
                else {
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
                }
                else {
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
                }
                else {
                    break;
                }
        }
        return state;
    }, {
        firstLoad: true,
        current: 0,
        next: 0,
        info: initialInfo,
        inProgress: false
    });
    React.useEffect(() => {
        if (NAVIGATION_MODE === NavigationMode.MODERN) {
            if (!state.inProgress && state.current > 0) {
                const historyState = {
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
        const onStart = no => {
            dispatch({ type: "START", no });
            if (NAVIGATION_MODE === NavigationMode.LEGACY) {
                return false;
            }
        };
        const onEnd = (no, info) => {
            if (isRedirect(info.output.status)) {
                routeContext.navigateToUrl({
                    url: info.output.url,
                    changeType: info.payload.changeType,
                    method: "GET",
                    no: Date.now()
                });
            }
            else {
                dispatch({ type: "END", no, info });
            }
        };
        const onError = (no, error) => {
            dispatch({ type: "ERROR", no, error });
        };
        const onChangeUrl = (no, info) => {
            dispatch({ type: "CHANGE", no, info });
        };
        const routeContext = makeContext(routes, context, onStart, onEnd, onError, onChangeUrl).route;
        return routeContext;
    }, [context]);
    const reactRouteContext = React.useMemo(() => ({
        error: () => state.error,
        info: () => state.info,
        inProgress: () => state.inProgress,
        isCurrent: (id, match) => state.info.id === id && (!match || compare(match, state.info.match))
    }), [state]);
    const contextValue = React.useMemo(() => ({
        ...routeContext,
        ...reactRouteContext
    }), [routeContext, reactRouteContext]);
    React.useEffect(() => {
        if (NAVIGATION_MODE === NavigationMode.MODERN) {
            const handlePopState = (ev) => {
                const state = ev.state || {
                    id: initialInfo.id,
                    match: initialInfo.match
                };
                const { id, match } = state;
                contextValue.navigate(id, {
                    match: match,
                    changeType: ChangeType.HISTORY
                });
            };
            window.addEventListener("popstate", handlePopState);
            return () => window.removeEventListener("popstate", handlePopState);
        }
    }, [contextValue]);
    return (React.createElement(ReactContext.Provider, { value: contextValue }, children));
});
//# sourceMappingURL=ContextProvider.js.map