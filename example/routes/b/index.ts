import { makeRoute } from "@webcarrot/router";
import { Route, Match } from "./types";

export const route: Route = makeRoute(
  "b",
  {
    match: (url, { method, body }) => {
      const match = url.pathname.match(/^\/b(\/.+)?$/);
      if (match) {
        return {
          method,
          body,
          params: {
            bb: match[1] ? match[1].substring(1) : ""
          },
          query: {
            id: url.searchParams.get("id")
          }
        } as Match;
      }
      return false;
    },
    build: match => `/b${match.params.bb ? `/${match.params.bb}` : ""}`
  },
  () => import("./init")
);
