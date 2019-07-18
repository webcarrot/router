import { makeRoute } from "@webcarrot/router";
import { Route } from "./types";

export const route: Route = makeRoute("b", ["/b/:bb", "/b"], () =>
  import("./init")
);

export { Route };
