import * as React from "react";
import { make as makeContext } from "../../make/context";
import { compare } from "../../utils/compare";
import { NAVIGATION_MODE } from "../../utils/constants";
import { NavigationMode, ChangeType } from "../../utils/enums";
export const ContextWrapper = ({ routes, context, initialInfo, ReactContext, children }) => {
    const [state, dispatch] = React.useReducer((state, action) => {
        switch (action.type) {
            case "START":
                if (action.no > state.next) {
                    return Object.assign({}, state, { next: action.no, inProgress: true });
                }
                else {
                    break;
                }
            case "END":
                if (action.no === state.next) {
                    return Object.assign({}, state, { current: action.no, info: action.info, error: null, inProgress: false });
                }
                else {
                    break;
                }
            case "ERROR":
                if (action.no === state.next) {
                    return Object.assign({}, state, { current: action.no, error: action.error, inProgress: false });
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
    const onStart = React.useCallback(no => {
        dispatch({ type: "START", no });
        if (NAVIGATION_MODE === NavigationMode.LEGACY) {
            return false;
        }
    }, []);
    const onEnd = React.useCallback((no, info) => {
        dispatch({ type: "END", no, info });
    }, []);
    const onError = React.useCallback((no, error) => {
        dispatch({ type: "ERROR", no, error });
    }, [state.current]);
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
    }, [state.inProgress]);
    const routeContext = React.useMemo(() => makeContext(routes, context, onStart, onEnd, onError).route, [context, onStart, onEnd, onError]);
    const reactRouteContext = React.useMemo(() => ({
        error: () => state.error,
        info: () => state.info,
        inProgress: () => state.inProgress,
        isCurrent: (id, match) => state.info.id === id && (!match || compare(match, state.info.match))
    }), [state]);
    const contextValue = React.useMemo(() => (Object.assign({}, routeContext, reactRouteContext)), [routeContext, reactRouteContext]);
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
                    method: "GET",
                    changeType: ChangeType.HISTORY
                });
            };
            window.addEventListener("popstate", handlePopState);
            return () => window.removeEventListener("popstate", handlePopState);
        }
    }, [contextValue]);
    return (React.createElement(ReactContext.Provider, { value: contextValue }, children));
};
export const ContextWrapperMemo = React.memo(ContextWrapper);
//# sourceMappingURL=index.js.map