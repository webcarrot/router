import { makeRoute } from "@webcarrot/router";
import { Route, Match, Output } from "./types";
import { RouteContext, RouteInintL } from "../types";
import { make as makeMatch } from "@webcarrot/router-match";

const { match, build } = makeMatch<Match, RouteContext>(["/"]);

export const route: Route = makeRoute("home", match, build, (() =>
  import("./init")) as RouteInintL<"home", Match, Output>);
