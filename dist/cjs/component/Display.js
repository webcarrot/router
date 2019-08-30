"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.Display = ({ ReactContext, ...rest }) => {
    const { info } = React.useContext(ReactContext);
    const { Component, match, output, route } = info();
    if (Component) {
        return (React.createElement(Component, Object.assign({}, rest, { route: route, match: match, output: output })));
    }
    else {
        return null;
    }
};
exports.DisplayMemo = React.memo(exports.Display);
//# sourceMappingURL=Display.js.map