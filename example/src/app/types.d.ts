import { NewsApiContextValue } from "../api/news/types";
import { TodoApiContextValue } from "../api/todo/types";

import { Routes, RouteContext } from "../routes/types";
import { Payload, RouteInfo } from "@webcarrot/router";

export type AppContext = {
  rootPath: string;
  newsApi: NewsApiContextValue;
  todoApi: TodoApiContextValue;
};

export type ThemeType = "dark" | "light";

export type AppProps = {
  newsApiContext: NewsApiContextValue;
  todoApiContext: TodoApiContextValue;
  route: RouteInfo<Routes, Payload, RouteContext>;
};

export type AppState = {
  newsApiEndpoint: string;
  todoApiEndpoint: string;
  route: RouteInfo<Routes, Payload, RouteContext>;
};
