"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlainObject = function (e) {
    return e !== null && typeof e === "object" && e.constructor === Object;
};
exports.compare = function (a, b) {
    if (a === b) {
        return true;
    }
    else if (a instanceof Array) {
        if (!(b instanceof Array) || a.length !== b.length) {
            return false;
        }
        return a.findIndex(function (v, no) { return !exports.compare(v, b[no]); }) === -1;
    }
    else if (exports.isPlainObject(a)) {
        if (!exports.isPlainObject(b)) {
            return false;
        }
        return (Object.keys(a).findIndex(function (k) { return !exports.compare(a[k], b[k]); }) ===
            -1);
    }
    else {
        return false;
    }
};
//# sourceMappingURL=compare.js.map