import { makeRoute } from "@webcarrot/router";
import { Route } from "./types";

export const route: Route = makeRoute(
  "a",
  (url, { method }) => {
    const match = url.pathname.match(/^\/a(\/.+)?$/);
    if (match) {
      return {
        method,
        params: {
          aa: match[1] ? match[1].substring(1) : ""
        },
        query: {
          id: url.searchParams.get("id")
        }
      };
    }
    return false;
  },
  match => `/a${match.params.aa ? `/${match.params.aa}` : ""}`,
  () => import("./init")
);
