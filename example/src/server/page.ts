import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { ServerStyleSheets } from "@material-ui/styles";
import { Context } from "koa";
import {
  makeContext as makeRouteContext,
  execute as executeRoute,
  isRedirect,
  GetPayload,
  PostPayload,
  ChangeType,
  Payload
} from "@webcarrot/router";

import { getManifests } from "../lib/build/manifest";

import { App } from "../app/app";
import { Html } from "../app/html";
import { AppProps, AppState, AppContext } from "../app/types";

import { routes } from "../routes";
import { RouteContext, RoutesType } from "../routes/types";

import { make as makeNewsApi } from "../api/news/make";
import { make as makeTodoApi } from "../api/todo/make";

import { AppConfiguration } from "./types";
import { getBody } from "./utils";

const makeInit = async (): Promise<string> => {
  const { manifests } = await getManifests();
  const legacy = manifests.get("legacy");
  const modern = manifests.get("modern");
  const legacyFiles = JSON.stringify(
    legacy ? [legacy.get("main.js"), legacy.get("vendors~main.js")] : null
  );
  const modernFiles = JSON.stringify(
    modern ? [modern.get("main.js"), modern.get("vendors~main.js")] : null
  );
  return `window.process={env:{NODE_ENV:"${
    process.env.NODE_ENV === "development" ? "development" : "production"
  }"}};function onPolyfill(){(function(d,w,l,m,i){function a(s,e){e=d.createElement('script');e.src=s;d.head.appendChild(e);}i=setInterval(function(){if(window.React&&window.ReactDOM){clearInterval(i);(l&&!(w.fetch&&w.Proxy&&!/(Edge|Trident\\/7\\.)/.test(navigator.userAgent))?l:m).forEach(a);}},5)})(document,window,${legacyFiles},${modernFiles})};`;
};

export const pageHandler = async (
  ctx: Context,
  appConfiguration: AppConfiguration,
  next: () => Promise<any>
) => {
  const method = ctx.method;
  if (method !== "GET" && method !== "POST") {
    return next();
  }
  ctx.compress = true;
  const body: any = await getBody(ctx);

  const newsApi = await makeNewsApi(appConfiguration.news);
  const todoApi = await makeTodoApi();

  const appContext: RouteContext = makeRouteContext<
    RoutesType,
    Payload,
    AppContext
  >(routes, {
    rootPath: "",
    newsApi,
    todoApi
  });

  appContext.route.makeLink("home", {});
  appContext.route.makeLink("news", { type: "everything" });

  const routePayload: Payload =
    method === "GET"
      ? ({
          method: "GET",
          no: 0,
          changeType: ChangeType.PUSH,
          url: ctx.originalUrl || "/"
        } as GetPayload)
      : ({
          method: "POST",
          no: 0,
          changeType: ChangeType.PUSH,
          url: ctx.originalUrl || "/",
          body: body as any
        } as PostPayload);

  const routeState = await executeRoute(routes, routePayload, appContext);

  if (isRedirect(routeState.output.status)) {
    ctx.status = routeState.output.status;
    ctx.set("Location", routeState.output.url);
    return;
  }

  const init = await makeInit();

  const state: AppState = {
    newsApiEndpoint: "/api/news",
    todoApiEndpoint: "/api/todo",
    route: {
      ...routeState,
      route: null,
      Component: null
    }
  };

  const props: AppProps = {
    newsApiContext: newsApi,
    todoApiContext: todoApi,
    route: routeState
  };
  const sheets = new ServerStyleSheets();

  const html = ReactDOM.renderToStaticMarkup(
    sheets.collect(React.createElement(App, props))
  );

  ctx.type = "html";
  ctx.status = routeState.output.status;
  ctx.body =
    "<!doctype html>" +
    ReactDOM.renderToStaticMarkup(
      React.createElement(Html, {
        sheets,
        init,
        state,
        html
      })
    );
};
