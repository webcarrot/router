import { makeRoute } from "@webcarrot/router";
import { Route, Match, Output } from "./types";
import { RouteContext, RouteInintL } from "../types";
import { make as makeMatch } from "@webcarrot/router-match";

const { match, build } = makeMatch<Match, RouteContext>(["/todo"]);

export const route: Route = makeRoute("todo", match, build, (() =>
  import("./init")) as RouteInintL<"todo", Match, Output>);
