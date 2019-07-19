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
var link_1 = require("./../link");
var navigate_1 = require("./../navigate");
exports.make = function (routes, context, onStart, onEnd, onError) {
    var routeContext = {};
    var fullContext = __assign({}, context, { route: routeContext });
    routeContext.makeLink = link_1.make(routes, fullContext);
    routeContext.navigate = navigate_1.make(routes, fullContext, onStart, onEnd, onError);
    return fullContext;
};
//# sourceMappingURL=index.js.map