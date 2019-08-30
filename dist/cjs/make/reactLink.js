"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Link_1 = require("../component/Link");
exports.make = (ReactContext) => {
    const Wrap = (props, ref) => Link_1.Link({ ...props, ReactContext }, ref);
    return React.memo(React.forwardRef(Wrap));
};
//# sourceMappingURL=reactLink.js.map