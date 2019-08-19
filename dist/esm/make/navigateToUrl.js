import { execute } from "../utils";
export const make = (routes, context, onStart, onEnd, onError) => (payload) => execute(routes, payload, context, true, onStart, onError).then(out => {
    onEnd(payload.no, out);
});
//# sourceMappingURL=navigateToUrl.js.map