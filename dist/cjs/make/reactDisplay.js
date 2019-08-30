"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const component_1 = require("../component");
exports.make = (ReactContext) => React.memo((props) => component_1.Display({ ...props, ReactContext }));
//# sourceMappingURL=reactDisplay.js.map