import { makeRoute, Payload } from "@webcarrot/router";
import { Route, Match } from "./types";
import { RouteContext } from "../types";
import { make as makeMatch } from "@webcarrot/router-match";

const { match, build } = makeMatch<Payload, Match, RouteContext>([
  "/news/:type",
  "/news"
]);

export const route: Route = makeRoute("news", match, build, () =>
  import("./init")
);
