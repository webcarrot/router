import {
  RouteAction,
  RouteOutput,
  RouteComponent,
  RouteInterfaceL
} from "../types";

import {
  NewsSourcesResponse,
  NewsArticlesResponse
} from "@webcarrot/router-example/api/news/types";
import { NewsEverythingPayload } from "@webcarrot/router-example/api/news/everything/types";
import { NewsSourcesPayload } from "@webcarrot/router-example/api/news/sources/types";
import { NewsTopHeadlinesPayload } from "@webcarrot/router-example/api/news/topHeadlines/types";
import { Method } from "@webcarrot/router";

export type ID = "news";

type MatchNone = {
  method: Method;
  params?: undefined;
};

export type MatchEverything = {
  method: Method;
  params: {
    type: "everything";
  };
  query?: NewsEverythingPayload;
};

export type MatchSources = {
  method: Method;
  params: {
    type: "sources";
  };
  query?: NewsSourcesPayload;
};

export type MatchTopHeadlines = {
  method: Method;
  params: {
    type: "topHeadlines";
  };
  query?: NewsTopHeadlinesPayload;
};

export type Match =
  | MatchNone
  | MatchEverything
  | MatchSources
  | MatchTopHeadlines;

export type OutputNone = RouteOutput<{ type: "none" }>;

export type OutputEverything = RouteOutput<{
  type: "everything";
  data: NewsArticlesResponse;
}>;

export type OutputSources = RouteOutput<{
  type: "sources";
  data: NewsSourcesResponse;
}>;

export type OutputsTopHeadlines = RouteOutput<{
  type: "topHeadlines";
  data: NewsArticlesResponse;
}>;

export type Output =
  | OutputNone
  | OutputEverything
  | OutputSources
  | OutputsTopHeadlines;

export type Action = RouteAction<Match, Output>;

export type Component = RouteComponent<ID, Match, Output>;

export type ComponentNone = RouteComponent<ID, Match, OutputNone>;
export type ComponentEverything = RouteComponent<ID, Match, OutputEverything>;
export type ComponentSources = RouteComponent<ID, Match, OutputSources>;
export type ComponentTopHeadlines = RouteComponent<
  ID,
  Match,
  OutputsTopHeadlines
>;

export type Route = RouteInterfaceL<ID, Match, Output>;
