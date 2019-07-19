import * as React from "react";

import {
  Payload,
  execute,
  makeContext,
  makeReactContextProvider,
  ContextWrapper,
  RouteInfo,
  Display
} from "@webcarrot/router";

import { appContext } from "./context";
import { routes, Routes } from "./routes";
import { RouteContext } from "./types";

const fullContext = makeContext(routes, appContext);

const ReactRouteContext = makeReactContextProvider<
  Routes,
  Payload,
  RouteContext
>();

const payload: Payload = {
  url: "/testB/123",
  no: 0,
  method: "GET"
};

execute<Routes>(routes, payload, fullContext).then(info => {
  <App routeInfo={info} />;
});

const App = ({
  routeInfo
}: {
  routeInfo: RouteInfo<Routes, Payload, RouteContext>;
}) => {
  return (
    <ContextWrapper
      routes={routes}
      ReactContext={ReactRouteContext}
      context={appContext}
      initialInfo={routeInfo}
    >
      <Display ReactContext={ReactRouteContext} />
    </ContextWrapper>
  );
};
