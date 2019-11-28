import { ChangeType } from "../utils/enums";
import { promisfy } from "../utils/promisfy";
export const make = (routes, context, onStart, onEnd, onError) => (id, { match = {}, prepare = true, no = Date.now(), changeType = ChangeType.PUSH }) => {
    const route = routes[id];
    const url = route.build(match, context);
    if (url) {
        const payload = match.method === "POST"
            ? {
                method: "POST",
                url,
                no,
                changeType,
                body: match.body
            }
            : {
                method: "GET",
                url,
                no,
                changeType
            };
        return promisfy(() => route.execute(new URL(`route:${payload.url}`), payload, context, prepare, onStart, onError)).then(output => {
            if (!output) {
                const error = new Error("Invalid payload");
                if (!onError || onError(no, error)) {
                    throw error;
                }
            }
            else if (onEnd) {
                onEnd(no, output);
            }
        });
    }
    else {
        return Promise.reject(new Error("Unknown link"));
    }
};
//# sourceMappingURL=navigate.js.map