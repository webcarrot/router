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
import * as React from "react";
export const Display = (_a) => {
    var { ReactContext } = _a, rest = __rest(_a, ["ReactContext"]);
    const { info } = React.useContext(ReactContext);
    const { Component, match, output, route } = info();
    if (Component) {
        return (React.createElement(Component, Object.assign({}, rest, { route: route, match: match, output: output })));
    }
    else {
        return null;
    }
};
export const DisplayMemo = React.memo(Display);
//# sourceMappingURL=Display.js.map