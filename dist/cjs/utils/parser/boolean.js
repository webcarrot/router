"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var constants_1 = require("./constants");
exports.handleBoolean = function (payload, required, nullable, convert, defaultValue) {
    if (nullable && payload === null) {
        return null;
    }
    if (payload === undefined) {
        if (required) {
            throw new Error(constants_1.ERR_NO_VALUE);
        }
        else {
            return defaultValue;
        }
    }
    if (!convert && typeof payload !== "boolean") {
        throw new Error(constants_1.ERR_INVALID_VALUE);
    }
    return !!payload;
};
exports.boolean = function () { return make_1.make(exports.handleBoolean); };
//# sourceMappingURL=boolean.js.map