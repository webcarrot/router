"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.make = (routes, context) => {
    const linkProvider = (id, payload) => routes[id].build(payload, context);
    return linkProvider;
};
//# sourceMappingURL=index.js.map