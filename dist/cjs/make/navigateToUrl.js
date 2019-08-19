"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
exports.make = function (routes, context, onStart, onEnd, onError) { return function (payload) {
    return utils_1.execute(routes, payload, context, true, onStart, onError).then(function (out) {
        onEnd(payload.no, out);
    });
}; };
//# sourceMappingURL=navigateToUrl.js.map