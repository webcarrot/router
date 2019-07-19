import { make as makeLinkProvider } from "./../link";
import { make as makeNavigateProvider } from "./../navigate";
export const make = (routes, context, onStart, onEnd, onError) => {
    const routeContext = {};
    const fullContext = Object.assign({}, context, { route: routeContext });
    routeContext.makeLink = makeLinkProvider(routes, fullContext);
    routeContext.navigate = makeNavigateProvider(routes, fullContext, onStart, onEnd, onError);
    return fullContext;
};
//# sourceMappingURL=index.js.map