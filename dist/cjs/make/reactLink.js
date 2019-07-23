"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Link_1 = require("../component/Link");
exports.make = function (ReactContext) {
    var Wrap = function (props, ref) { return Link_1.Link(__assign({}, props, { ReactContext: ReactContext }), ref); };
    return React.memo(React.forwardRef(Wrap));
};
//# sourceMappingURL=reactLink.js.map