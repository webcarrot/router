"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Link_1 = require("../component/Link");
exports.make = (ReactContext) => React.memo(React.forwardRef((props, ref) => Link_1.Link({ ...props, ReactContext }, ref)));
//# sourceMappingURL=reactLink.js.map