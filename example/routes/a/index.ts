import { makeRoute } from "@webcarrot/router";
import { Route, Match } from "./types";

export const route: Route = makeRoute(
  "a",
  {
    match: (url, { method, body }) => {
      const match = url.pathname.match(/^\/a(\/.+)?$/);
      if (match) {
        return {
          method,
          body,
          params: {
            aa: match[1] ? match[1].substring(1) : "",
            zz: "2"
          },
          query: {
            id: url.searchParams.get("id")
          }
        } as Match;
      }
      return false;
    },
    build: match => `/a${match.params.aa ? `/${match.params.aa}` : ""}`
  },
  () => import("./init")
);
