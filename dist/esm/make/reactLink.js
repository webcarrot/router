import * as React from "react";
import { Link } from "../component/Link";
export const make = (ReactContext) => React.memo(React.forwardRef((props, ref) => Link({ ...props, ReactContext }, ref)));
//# sourceMappingURL=reactLink.js.map