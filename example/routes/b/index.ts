import { makeRoute } from "@webcarrot/router";
import { Route } from "./types";
import { parse } from "./parse";

export const route: Route = makeRoute(
  "b",
  { match: "/b/:bb?", build: "/b/:bb?", parse },
  () => import("./init")
);
