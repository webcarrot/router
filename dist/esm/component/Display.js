import * as React from "react";
export const Display = ({ ReactContext }) => {
    const { info } = React.useContext(ReactContext);
    const { Component, match, output, route } = info;
    return React.createElement(Component, { match: match, output: output, route: route });
};
//# sourceMappingURL=Display.js.map