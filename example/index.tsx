import * as React from "react";
import {
  Payload,
  execute,
  makeLink,
  makeNavigate,
  makeContext
} from "@webcarrot/router";

import { appContext } from "./context";
import { routes, Routes } from "./routes";

const payload: Payload = {
  url: "/testB/123",
  no: 0,
  method: "GET"
};

const context = makeContext(routes, appContext);
context.foo();
context.route.makeLink("a", {});
context.route.makeLink("a", { params: { aa: "3" } });
context.route.navigate("a", {}, true, "GET");
context.route.navigate("a", { params: { aa: "3" } }, true, "GET");

const linkProvider = makeLink(routes, context);

linkProvider("a", {});
linkProvider("a", { params: { aa: "3" } });
linkProvider("b", { params: { bb: "2" } });

const navigateProvider = makeNavigate<Routes>(
  routes,
  context,
  () => {},
  (no, err) => console.error(no, err)
);

navigateProvider("a", { params: { aa: "3" } }, true, "POST", {});
navigateProvider("b", { params: { bb: "44" } }, true, "POST", {});

execute<Routes>(routes, payload, context, true).then(info => {
  switch (info.id) {
    case "a": {
      console.log(info.match.params);
      break;
    }
    case "b": {
      console.log(info.match.params ? info.match.params.bb : info.match.params);
      break;
    }
  }
  if (info.Component) {
    return (
      <info.Component
        bar={2}
        foo="test"
        // @ts-ignore
        route={info.route}
        // @ts-ignore
        match={info.match}
        // @ts-ignore
        output={info.output}
      />
    );
  } else {
    return null;
  }
});
