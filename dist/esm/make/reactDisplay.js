import * as React from "react";
import { Display } from "../component";
export const make = (ReactContext) => {
    return React.memo((props) => Display(Object.assign({}, props, { ReactContext })));
};
//# sourceMappingURL=reactDisplay.js.map