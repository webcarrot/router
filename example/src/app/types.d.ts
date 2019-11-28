import { NewsApiContextValue } from "../api/news/types";
import { TodoApiContextValue } from "../api/todo/types";

import { Routes, RoutesType } from "../routes/types";
import { ExtractRouteFullOutput } from "@webcarrot/router";

export type AppContext = {
  rootPath: string;
  newsApi: NewsApiContextValue;
  todoApi: TodoApiContextValue;
};

export type ThemeType = "dark" | "light";

export type AppProps = {
  newsApiContext: NewsApiContextValue;
  todoApiContext: TodoApiContextValue;
  route: ExtractRouteFullOutput<RoutesType, RoutesType["id"], AppContext>;
};

export type AppState = {
  newsApiEndpoint: string;
  todoApiEndpoint: string;
  route: ExtractRouteFullOutput<RoutesType, RoutesType["id"], AppContext>;
};
