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
  Link as NLink,
  LinkMemo
} from "@webcarrot/router";

import { appContext } from "./context";
import { routes } from "./routes";
import { Routes } from "./routes/types";

import { RouteContext, ComponentProps } from "./types";
import { ChangeType } from "../utils/enums";

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
  method: "GET",
  changeType: ChangeType.PUSH
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
        route="b"
        match={{ method: "GET", params: { bb: "23" }, query: { id: "3" } }}
        style={{ color: "red" }}
      >
        test a to zz:w
      </Link>
      <LinkMemo
        ReactContext={ReactRouteContext}
        route="b"
        match={{
          method: "POST",
          params: { bb: "23" },
          query: { id: "3" },
          body: { jasio: "" }
        }}
        style={{ color: "red" }}
      >
        test a to zz:w
      </LinkMemo>
      <NLink
        route="b"
        ReactContext={ReactRouteContext}
        match={{ method: "GET", params: { bb: "23" }, query: { id: "3" } }}
        style={{ color: "red" }}
      >
        test a to zz:w
      </NLink>
    </ContextWrapper>
  );
};
