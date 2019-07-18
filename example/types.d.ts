import { FullContext, Payload } from "@webcarrot/router";

import { appContext } from "./context";
import { Routes } from "./routes/types";

export type RouteContext = FullContext<Routes, Payload, typeof appContext>;

export type ComponentProps = {
  foo?: string;
  bar: number;
};
