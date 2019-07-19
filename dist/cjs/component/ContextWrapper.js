"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var context_1 = require("../make/context");
exports.ContextWrapper = function (_a) {
    var routes = _a.routes, context = _a.context, initialInfo = _a.initialInfo, ReactContext = _a.ReactContext, children = _a.children;
    var _b = React.useReducer(function (state, action) {
        switch (action.type) {
            case "START":
                if (action.no > state.next) {
                    return __assign({}, state, { next: action.no, inProgress: true });
                }
                else {
                    break;
                }
            case "END":
                if (action.no === state.current) {
                    return __assign({}, state, { current: action.no, info: action.info, error: null, inProgress: false });
                }
                else {
                    break;
                }
            case "ERROR":
                if (action.no === state.current) {
                    return __assign({}, state, { current: action.no, error: action.error, inProgress: false });
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
    }), state = _b[0], dispatch = _b[1];
    var onStart = function (no) {
        dispatch({ type: "START", no: no });
    };
    var onEnd = function (no, info) {
        dispatch({ type: "END", no: no, info: info });
    };
    var onError = function (no, error) {
        dispatch({ type: "ERROR", no: no, error: error });
    };
    var routeContext = React.useMemo(function () {
        return context_1.make(routes, context, onStart, onEnd, onError)
            .route;
    }, []);
    var contextValue = React.useMemo(function () { return (__assign({}, routeContext, state)); }, [routeContext, state]);
    return (React.createElement(ReactContext.Provider, { value: contextValue }, children));
};
//# sourceMappingURL=ContextWrapper.js.map