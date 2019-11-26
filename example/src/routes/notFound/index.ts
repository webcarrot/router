import { makeRoute, Payload } from "@webcarrot/router";
import { Route, Match, Output } from "./types";
import { RouteContext, RouteInintL } from "../types";
import { make as makeMatch } from "@webcarrot/router-match";

const { match, build } = makeMatch<Payload, Match, RouteContext>(["*"]);

export const route: Route = makeRoute("notFound", match, build, (() =>
  import("./init")) as RouteInintL<"notFound", Match, Output>);
