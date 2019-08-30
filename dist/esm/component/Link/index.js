import * as React from "react";
import { ChangeType } from "../../utils/enums";
export const Link = ({ route, match, ReactContext, onClick, href, changeType = ChangeType.PUSH, ...rest }, ref) => {
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