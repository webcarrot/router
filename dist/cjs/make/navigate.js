"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../utils/enums");
exports.make = (routes, context, onStart, onEnd, onError) => {
    const navigateProvider = (id, { match = {}, prepare = true, no = Date.now(), changeType = enums_1.ChangeType.PUSH }) => {
        const route = routes[id];
        const url = route.build(match, context);
        if (url) {
            const payload = match.method === "POST"
                ? {
                    method: "POST",
                    url,
                    no,
                    changeType,
                    body: match.body
                }
                : {
                    method: "GET",
                    url,
                    no,
                    changeType
                };
            return route
                .execute(new URL(`route:${payload.url}`), payload, context, prepare, onStart, onError)
                .then(output => {
                if (!output) {
                    const error = new Error("Invalid payload");
                    if (!onError || onError(no, error)) {
                        throw error;
                    }
                }
                else if (onEnd) {
                    onEnd(no, output);
                }
            });
        }
        else {
            return Promise.reject(new Error("Unknown link"));
        }
    };
    return navigateProvider;
};
//# sourceMappingURL=navigate.js.map