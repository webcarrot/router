"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.make = function (fn) {
    var required = false;
    var nullable = false;
    var convert = false;
    var defaultValue;
    var handler = (function (payload) {
        return fn(payload, required, nullable, convert, defaultValue);
    });
    Object.defineProperties(handler, {
        r: {
            get: function () {
                required = true;
                return handler;
            }
        },
        n: {
            get: function () {
                nullable = true;
                return handler;
            }
        },
        c: {
            get: function () {
                convert = true;
                return handler;
            }
        },
        d: {
            value: function (defaultValue) {
                defaultValue = defaultValue;
                return handler;
            }
        }
    });
    return handler;
};
//# sourceMappingURL=make.js.map