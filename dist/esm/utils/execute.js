export const execute = async (routes, payload, context, prepare = true, onStart, onError) => {
    const url = new URL(`route:${payload.url}`);
    for (let id in routes) {
        const route = routes[id];
        const output = await route.execute(url, payload, context, prepare, onStart, onError);
        if (output) {
            return output;
        }
    }
    throw new Error("No route found");
};
//# sourceMappingURL=execute.js.map