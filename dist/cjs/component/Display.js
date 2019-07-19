"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.Display = function (_a) {
    var ReactContext = _a.ReactContext;
    var info = React.useContext(ReactContext).info;
    var Component = info.Component, match = info.match, output = info.output, route = info.route;
    return React.createElement(Component, { match: match, output: output, route: route });
};
//# sourceMappingURL=Display.js.map