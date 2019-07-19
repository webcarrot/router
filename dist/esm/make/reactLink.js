import * as React from "react";
import { Link } from "../component/Link";
export const make = (ReactContext) => {
    return React.memo((props) => Link(Object.assign({}, props, { ReactContext })));
};
//# sourceMappingURL=reactLink.js.map