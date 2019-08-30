import * as React from "react";
export const Display = ({ ReactContext, ...rest }) => {
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