import { makeRoute } from "@webcarrot/router";
import { Route } from "./types";

export const route: Route = makeRoute(
  "b",
  (url, { method, body }) => {
    const match = url.pathname.match(/^\/b(\/.+)?$/);
    if (match) {
      const out = {
        params: {
          bb: match[1] ? match[1].substring(1) : ""
        },
        query: {
          id: url.searchParams.get("id")
        }
      };
      if (method === "GET") {
        return { method: "GET", ...out };
      } else {
        return {
          method: "POST",
          ...out,
          body: {
            foo: body.foo
          }
        };
      }
    }
    return false;
  },
  match => `/b${match.params.bb ? `/${match.params.bb}` : ""}`,
  () => import("./init")
);
