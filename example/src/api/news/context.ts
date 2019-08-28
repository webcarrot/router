import { makeContext } from "@webcarrot/api/context";
import { NewsApiActions } from "./types";

export const ReactNewsApiContext = makeContext<NewsApiActions>();
