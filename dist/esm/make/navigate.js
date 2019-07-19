import { make as makeLinkProvider } from "./link";
import { execute } from "../utils/execute";
export const make = (routes, context, onStart, onEnd, onError) => {
    const linkProvider = makeLinkProvider(routes, context);
    const navigateProvider = async (id, payload, prepare = true, method = "GET", body) => {
        const url = linkProvider(id, payload);
        if (url) {
            const payload = method === "POST"
                ? {
                    method: "POST",
                    url,
                    body
                }
                : {
                    method: "GET",
                    url
                };
            const output = await execute(routes, payload, context, prepare, onStart, onError);
            if (onEnd) {
                onEnd(id, output);
            }
        }
        else {
            throw new Error("Unknown link");
        }
    };
    return navigateProvider;
};
//# sourceMappingURL=navigate.js.map