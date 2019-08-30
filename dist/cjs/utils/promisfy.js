"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promisfy = (action) => {
    try {
        const value = action();
        if (value instanceof Promise) {
            return value;
        }
        else {
            return Promise.resolve(value);
        }
    }
    catch (err) {
        Promise.reject(err);
    }
};
//# sourceMappingURL=promisfy.js.map