"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRedirect = (status) => {
    switch (status) {
        case 300:
        case 301:
        case 302:
        case 303:
        case 304:
        case 305:
        case 306:
        case 307:
        case 308:
            return true;
        default:
            return false;
    }
};
//# sourceMappingURL=isRedirect.js.map