import * as React from "react";
import { Link } from "../component/Link";
export const make = (ReactContext) => {
    const Wrap = (props, ref) => Link({ ...props, ReactContext }, ref);
    return React.memo(React.forwardRef(Wrap));
};
//# sourceMappingURL=reactLink.js.map