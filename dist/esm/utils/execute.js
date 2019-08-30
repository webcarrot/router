export const execute = (routes, payload, context, prepare = true, onStart, onError) => {
    const url = new URL(`route:${payload.url}`);
    return Object.keys(routes)
        .reduce((out, id) => out.then(result => {
        if (result) {
            return result;
        }
        else {
            const route = routes[id];
            return route.execute(url, payload, context, prepare, onStart, onError);
        }
    }), Promise.resolve(null))
        .then(result => {
        if (!result) {
            throw new Error("No route found");
        }
        else {
            return result;
        }
    });
};
//# sourceMappingURL=execute.js.map