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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enums_1 = require("../../utils/enums");
exports.Link = function (_a, ref) {
    var route = _a.route, match = _a.match, ReactContext = _a.ReactContext, onClick = _a.onClick, href = _a.href, _b = _a.changeType, changeType = _b === void 0 ? enums_1.ChangeType.PUSH : _b, rest = __rest(_a, ["route", "match", "ReactContext", "onClick", "href", "changeType"]);
    var _c = React.useContext(ReactContext), makeLink = _c.makeLink, navigate = _c.navigate;
    var handleClick = React.useCallback(function (ev) {
        if (onClick) {
            onClick(ev);
        }
        if (!ev.defaultPrevented) {
            navigate(route, { match: match, changeType: changeType });
            ev.preventDefault();
        }
    }, [route, match]);
    var link = makeLink(route, match);
    return React.createElement("a", __assign({}, rest, { href: link || href, onClick: handleClick, ref: ref }));
};
exports.LinkMemo = React.memo(React.forwardRef(exports.Link));
//# sourceMappingURL=index.js.map