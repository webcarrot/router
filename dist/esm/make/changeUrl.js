import { ChangeType } from "../utils/enums";
import { promisfy } from "../utils/promisfy";
export const make = (routes, context, onChange) => {
    const changeUrlProvider = (id, match, output, changeType = ChangeType.REPLACE) => {
        const route = routes[id];
        const url = route.build(match, context);
        if (url) {
            const no = Date.now();
            const payload = {
                method: "GET",
                no,
                url,
                changeType,
                body: null
            };
            return promisfy(() => route.prepare(output))
                .then(Component => ({
                id,
                route,
                payload,
                match,
                output,
                Component
            }))
                .then(output => onChange(no, output));
        }
        else {
            return Promise.reject(new Error("Unknown link"));
        }
    };
    return changeUrlProvider;
};
//# sourceMappingURL=changeUrl.js.map