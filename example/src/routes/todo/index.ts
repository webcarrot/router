import { makeRoute, Payload } from "@webcarrot/router";
import { Route, Match } from "./types";
import { RouteContext } from "../types";
import { make as makeMatch } from "@webcarrot/router-match";

const { match, build } = makeMatch<Payload, Match, RouteContext>(["/todo"]);

export const route: Route = makeRoute("todo", match, build, () =>
  import("./init")
);
