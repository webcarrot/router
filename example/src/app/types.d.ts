import { NewsApiContextValue } from "../api/news/types";
import { TodoApiContextValue } from "../api/todo/types";

import { Routes, ComponentProps, RouteContext } from "../routes/types";
import { Payload, RouteInfo } from "@webcarrot/router";

export type AppContext = {
  newsApi: NewsApiContextValue;
  todoApi: TodoApiContextValue;
};

export type ThemeType = "dark" | "light";

export type AppProps = {
  newsApiContext: NewsApiContextValue;
  todoApiContext: TodoApiContextValue;
};

export type AppState = {
  newsApiEndpoint: string;
  todoApiEndpoint: string;
  route: RouteInfo<Routes, Payload, RouteContext, ComponentProps>;
};
