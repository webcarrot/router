import { makeRoute } from "@webcarrot/router";
import { Route } from "./types";

export const route: Route = makeRoute(
  "a",
  ["/a/:aa", "/a", { match: () => false }],
  () => import("./init")
);

export { Route };
