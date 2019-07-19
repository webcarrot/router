import * as React from "react";
import { make as makeContext } from "../make/context";
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
                if (action.no === state.current) {
                    return Object.assign({}, state, { current: action.no, info: action.info, error: null, inProgress: false });
                }
                else {
                    break;
                }
            case "ERROR":
                if (action.no === state.current) {
                    return Object.assign({}, state, { current: action.no, error: action.error, inProgress: false });
                }
                else {
                    break;
                }
        }
        return state;
    }, {
        current: 0,
        next: 0,
        info: initialInfo,
        inProgress: false
    });
    const onStart = no => {
        dispatch({ type: "START", no });
    };
    const onEnd = (no, info) => {
        dispatch({ type: "END", no, info });
    };
    const onError = (no, error) => {
        dispatch({ type: "ERROR", no, error });
    };
    const routeContext = React.useMemo(() => makeContext(routes, context, onStart, onEnd, onError).route, []);
    const contextValue = React.useMemo(() => (Object.assign({}, routeContext, state)), [routeContext, state]);
    return (React.createElement(ReactContext.Provider, { value: contextValue }, children));
};
export const ContextWrapperMemo = React.memo(ContextWrapper);
//# sourceMappingURL=ContextWrapper.js.map