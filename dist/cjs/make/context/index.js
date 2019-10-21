"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = require("./../link");
const navigate_1 = require("./../navigate");
const navigateToUrl_1 = require("./../navigateToUrl");
const __1 = require("..");
exports.make = (routes, context, onStart, onEnd, onError) => {
    const routeContext = {};
    const fullContext = { ...context, route: routeContext };
    routeContext.makeLink = link_1.make(routes, fullContext);
    routeContext.navigate = navigate_1.make(routes, fullContext, onStart, onEnd, onError);
    routeContext.navigateToUrl = navigateToUrl_1.make(routes, fullContext, onStart, onEnd, onError);
    routeContext.changeUrl = __1.makeChangeUrl(routes, fullContext, onStart, onEnd, onError);
    return fullContext;
};
//# sourceMappingURL=index.js.map