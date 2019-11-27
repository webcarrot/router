import {
  makeReactContextProvider,
  makeReactDisplay,
  makeReactLink
} from "@webcarrot/router";
import { RoutesType } from "./types";
import { AppContext } from "../app/types";

export const ReactRouteContext = makeReactContextProvider<
  RoutesType,
  AppContext
>();

export const Display = makeReactDisplay(ReactRouteContext);
export const Link = makeReactLink(ReactRouteContext);
