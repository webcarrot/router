"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
exports.make = (routes, context, onStart, onEnd, onError) => (payload) => utils_1.execute(routes, payload, context, true, onStart, onError).then(out => {
    onEnd(payload.no, out);
});
//# sourceMappingURL=navigateToUrl.js.map