"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var constants_1 = require("./constants");
exports.handleArray = function (payload, required, nullable, _, defaultValue, type) {
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
    if (payload instanceof Array) {
        return payload.map(function (v) { return type(v); });
    }
    else {
        throw new Error(constants_1.ERR_INVALID_VALUE);
    }
};
exports.makeArray = function (type) { return function (payload, required, nullable, convert, defaultValue) { return exports.handleArray(payload, required, nullable, convert, defaultValue, type); }; };
exports.array = function (type) {
    return make_1.make(exports.makeArray(type));
};
//# sourceMappingURL=array.js.map