import * as React from "react";
import { Link } from "../component/Link";
export const make = (ReactContext) => {
    const Wrap = (props) => Link(Object.assign({}, props, { ReactContext }));
    return React.memo(Wrap);
};
//# sourceMappingURL=reactLink.js.map