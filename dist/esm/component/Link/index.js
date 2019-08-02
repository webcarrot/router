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
import { ChangeType } from "../../utils/enums";
export const Link = (_a, ref) => {
    var { route, match, ReactContext, onClick, href, changeType = ChangeType.PUSH } = _a, rest = __rest(_a, ["route", "match", "ReactContext", "onClick", "href", "changeType"]);
    const { makeLink, navigate } = React.useContext(ReactContext);
    const handleClick = React.useCallback((ev) => {
        if (onClick) {
            onClick(ev);
        }
        if (!ev.defaultPrevented) {
            navigate(route, { match, changeType });
            ev.preventDefault();
        }
    }, [route, match]);
    const link = makeLink(route, match);
    return React.createElement("a", Object.assign({}, rest, { href: link || href, onClick: handleClick, ref: ref }));
};
export const LinkMemo = React.memo(React.forwardRef(Link));
//# sourceMappingURL=index.js.map