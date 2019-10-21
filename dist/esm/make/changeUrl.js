import { ChangeType } from "../utils/enums";
export const make = (routes, context, onStart, onEnd, onError) => {
    const changeUrlProvider = (id, { match = {}, prepare = true, no = Date.now(), changeType = ChangeType.REPLACE }) => {
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
            return route
                .execute(new URL(`route:${payload.url}`), payload, context, prepare, onStart, onError)
                .then(output => {
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
    return changeUrlProvider;
};
//# sourceMappingURL=changeUrl.js.map