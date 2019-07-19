import * as React from "react";

import {
  Payload,
  execute,
  makeContext,
  makeReactContextProvider,
  ContextWrapper,
  RouteInfo,
  makeReactDisplay,
  makeReactLink,
  Link as NLink
} from "@webcarrot/router";

import { appContext } from "./context";
import { routes, Routes } from "./routes";
import { RouteContext, ComponentProps } from "./types";

const fullContext = makeContext(routes, appContext);

const ReactRouteContext = makeReactContextProvider<
  Routes,
  Payload,
  typeof appContext,
  ComponentProps
>();

const Display = makeReactDisplay(ReactRouteContext);
const Link = makeReactLink(ReactRouteContext);

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
  routeInfo: RouteInfo<Routes, Payload, RouteContext, ComponentProps>;
}) => {
  return (
    <ContextWrapper
      routes={routes}
      ReactContext={ReactRouteContext}
      context={appContext}
      initialInfo={routeInfo}
    >
      <Display bar={1} />
      <Link
        route="a"
        payload={{ params: { zz: "w" } }}
        style={{ color: "red" }}
      >
        test a to zz:w
      </Link>
      <NLink
        route="b"
        ReactContext={ReactRouteContext}
        payload={{ params: { bb: "w" }, query: { id: "" } }}
        style={{ color: "red" }}
      >
        test a to zz:w
      </NLink>
    </ContextWrapper>
  );
};
