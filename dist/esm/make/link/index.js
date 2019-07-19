export const make = (routes, context) => {
    const linkProvider = (id, payload) => routes[id].build(payload, context);
    return linkProvider;
};
//# sourceMappingURL=index.js.map