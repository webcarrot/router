"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.make = function (routes, context) {
    var linkProvider = function (id, payload) {
        return routes[id].build(payload, context);
    };
    return linkProvider;
};
//# sourceMappingURL=index.js.map