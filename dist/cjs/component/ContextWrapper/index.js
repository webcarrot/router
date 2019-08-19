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
var context_1 = require("../../make/context");
var compare_1 = require("../../utils/compare");
var constants_1 = require("../../utils/constants");
var enums_1 = require("../../utils/enums");
var isRedirect_1 = require("../../utils/isRedirect");
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
                if (action.no === state.next) {
                    return __assign({}, state, { current: action.no, info: action.info, error: null, inProgress: false });
                }
                else {
                    break;
                }
            case "ERROR":
                if (action.no === state.next) {
                    return __assign({}, state, { current: action.no, error: action.error, inProgress: false });
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
    }), state = _b[0], dispatch = _b[1];
    React.useEffect(function () {
        if (constants_1.NAVIGATION_MODE === enums_1.NavigationMode.MODERN) {
            if (!state.inProgress && state.current > 0) {
                var historyState = {
                    id: state.info.id,
                    match: state.info.match
                };
                var _a = state.info.output, title = _a.title, url = _a.url;
                document.title = title;
                switch (state.info.payload.changeType) {
                    case enums_1.ChangeType.PUSH:
                        history.pushState(historyState, title, url);
                        break;
                    case enums_1.ChangeType.REPLACE:
                        history.replaceState(historyState, title, url);
                        break;
                }
            }
        }
    }, [state.inProgress]);
    var routeContext = React.useMemo(function () {
        var onStart = function (no) {
            dispatch({ type: "START", no: no });
            if (constants_1.NAVIGATION_MODE === enums_1.NavigationMode.LEGACY) {
                return false;
            }
        };
        var onEnd = function (no, info) {
            if (isRedirect_1.isRedirect(info.output.status)) {
                routeContext.navigateToUrl({
                    url: info.output.url,
                    changeType: info.payload.changeType,
                    method: "GET",
                    no: Date.now()
                });
            }
            else {
                dispatch({ type: "END", no: no, info: info });
            }
        };
        var onError = function (no, error) {
            dispatch({ type: "ERROR", no: no, error: error });
        };
        var routeContext = context_1.make(routes, context, onStart, onEnd, onError).route;
        return routeContext;
    }, [context]);
    var reactRouteContext = React.useMemo(function () { return ({
        error: function () { return state.error; },
        info: function () { return state.info; },
        inProgress: function () { return state.inProgress; },
        isCurrent: function (id, match) {
            return state.info.id === id && (!match || compare_1.compare(match, state.info.match));
        }
    }); }, [state]);
    var contextValue = React.useMemo(function () { return (__assign({}, routeContext, reactRouteContext)); }, [routeContext, reactRouteContext]);
    React.useEffect(function () {
        if (constants_1.NAVIGATION_MODE === enums_1.NavigationMode.MODERN) {
            var handlePopState_1 = function (ev) {
                var state = ev.state || {
                    id: initialInfo.id,
                    match: initialInfo.match
                };
                var id = state.id, match = state.match;
                contextValue.navigate(id, {
                    match: match,
                    changeType: enums_1.ChangeType.HISTORY
                });
            };
            window.addEventListener("popstate", handlePopState_1);
            return function () { return window.removeEventListener("popstate", handlePopState_1); };
        }
    }, [contextValue]);
    return (React.createElement(ReactContext.Provider, { value: contextValue }, children));
};
exports.ContextWrapperMemo = React.memo(exports.ContextWrapper);
//# sourceMappingURL=index.js.map