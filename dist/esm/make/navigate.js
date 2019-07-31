import { make as makeLinkProvider } from "./link";
import { execute } from "../utils/execute";
import { ChangeType } from "../utils/enums";
export const make = (routes, context, onStart, onEnd, onError) => {
    const linkProvider = makeLinkProvider(routes, context);
    const navigateProvider = async (id, { match = {}, prepare = true, method = "GET", no = Date.now(), changeType = ChangeType.PUSH }) => {
        const url = linkProvider(id, match);
        if (url) {
            const payload = method === "POST"
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
            const output = await execute(routes, payload, context, prepare, onStart, onError);
            if (onEnd) {
                onEnd(no, output);
            }
        }
        else {
            throw new Error("Unknown link");
        }
    };
    return navigateProvider;
};
//# sourceMappingURL=navigate.js.map