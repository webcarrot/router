import {
  makeReactContextProvider,
  makeReactDisplay,
  makeReactLink,
  Payload
} from "@webcarrot/router";
import { RoutesType } from "./types";
import { AppContext } from "../app/types";

export const ReactRouteContext = makeReactContextProvider<
  RoutesType,
  Payload,
  AppContext
>();

export const Display = makeReactDisplay(ReactRouteContext);
export const Link = makeReactLink(ReactRouteContext);
