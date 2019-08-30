import { make as makeLinkProvider } from "./../link";
import { make as makeNavigateProvider } from "./../navigate";
import { make as makeNavigateToUrlProvider } from "./../navigateToUrl";
export const make = (routes, context, onStart, onEnd, onError) => {
    const routeContext = {};
    const fullContext = { ...context, route: routeContext };
    routeContext.makeLink = makeLinkProvider(routes, fullContext);
    routeContext.navigate = makeNavigateProvider(routes, fullContext, onStart, onEnd, onError);
    routeContext.navigateToUrl = makeNavigateToUrlProvider(routes, fullContext, onStart, onEnd, onError);
    return fullContext;
};
//# sourceMappingURL=index.js.map