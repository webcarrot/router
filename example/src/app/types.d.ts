import { NewsApiContextValue } from "../api/news/types";
import { TodoApiContextValue } from "../api/todo/types";

import { Routes, RoutesType } from "../routes/types";
import { RouteInfo } from "@webcarrot/router";

export type AppContext = {
  rootPath: string;
  newsApi: NewsApiContextValue;
  todoApi: TodoApiContextValue;
};

export type ThemeType = "dark" | "light";

export type AppProps = {
  newsApiContext: NewsApiContextValue;
  todoApiContext: TodoApiContextValue;
  route: RouteInfo<RoutesType, AppContext>;
};

export type AppState = {
  newsApiEndpoint: string;
  todoApiEndpoint: string;
  route: RouteInfo<RoutesType, AppContext>;
};
