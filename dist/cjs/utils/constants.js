"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
let NAVIGATION_MODE;
exports.NAVIGATION_MODE = NAVIGATION_MODE;
if (typeof history !== "undefined") {
    if (history.pushState) {
        exports.NAVIGATION_MODE = NAVIGATION_MODE = enums_1.NavigationMode.MODERN;
    }
    else {
        exports.NAVIGATION_MODE = NAVIGATION_MODE = enums_1.NavigationMode.LEGACY;
    }
}
else {
    exports.NAVIGATION_MODE = NAVIGATION_MODE = enums_1.NavigationMode.NONE;
}
//# sourceMappingURL=constants.js.map