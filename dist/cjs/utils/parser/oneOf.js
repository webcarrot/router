"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var constants_1 = require("./constants");
exports.handleOnOf = function (payload, required, nullable, defaultValue, types) {
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
    for (var i in types) {
        try {
            return types[i](payload);
        }
        catch (_) { }
    }
    throw new Error(constants_1.ERR_INVALID_VALUE);
};
exports.makeOnOf = function (types) { return function (payload, required, nullable, defaultValue) { return exports.handleOnOf(payload, required, nullable, defaultValue, types); }; };
exports.oneOf = function (types) { return make_1.make(exports.makeOnOf(types)); };
//# sourceMappingURL=oneOf.js.map