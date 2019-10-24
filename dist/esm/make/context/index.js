import { make as makeLinkProvider } from "./../link";
import { make as makeNavigateProvider } from "./../navigate";
import { make as makeNavigateToUrlProvider } from "./../navigateToUrl";
import { makeChangeUrl } from "..";
export const make = (routes, context, onStart, onEnd, onError, onChange) => {
    const routeContext = {};
    const fullContext = { ...context, route: routeContext };
    routeContext.makeLink = makeLinkProvider(routes, fullContext);
    routeContext.navigate = makeNavigateProvider(routes, fullContext, onStart, onEnd, onError);
    routeContext.navigateToUrl = makeNavigateToUrlProvider(routes, fullContext, onStart, onEnd, onError);
    routeContext.changeUrl = makeChangeUrl(routes, fullContext, onChange);
    return fullContext;
};
//# sourceMappingURL=index.js.map