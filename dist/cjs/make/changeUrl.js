"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../utils/enums");
const promisfy_1 = require("../utils/promisfy");
exports.make = (routes, context, onChange) => {
    const changeUrlProvider = (id, match, output, changeType = enums_1.ChangeType.REPLACE) => {
        const route = routes[id];
        const url = route.build(match, context);
        if (url) {
            const no = Date.now();
            const payload = {
                method: "GET",
                no,
                url,
                changeType,
                body: null
            };
            return promisfy_1.promisfy(() => route.prepare(output))
                .then(Component => ({
                id,
                route,
                payload,
                match,
                output,
                Component
            }))
                .then(output => onChange(no, output));
        }
        else {
            return Promise.reject(new Error("Unknown link"));
        }
    };
    return changeUrlProvider;
};
//# sourceMappingURL=changeUrl.js.map