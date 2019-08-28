import { makeRoute, Payload } from "@webcarrot/router";
import { Route, Match } from "./types";
import { RouteContext } from "../types";
import { make as makeMatch } from "@webcarrot/router-match";

const { match, build } = makeMatch<Payload, Match, RouteContext>(["*"]);

export const route: Route = makeRoute("notFound", match, build, () =>
  import("./init")
);
