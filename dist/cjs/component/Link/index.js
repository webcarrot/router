"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const enums_1 = require("../../utils/enums");
exports.Link = ({ route, match, ReactContext, onClick, href, changeType = enums_1.ChangeType.PUSH, ...rest }, ref) => {
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
exports.LinkMemo = React.memo(React.forwardRef(exports.Link));
//# sourceMappingURL=index.js.map