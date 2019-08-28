import { NewsApiActions, NewsApiContext, NewsApiContextValue } from "./types";
import { makeApi } from "@webcarrot/api/node";
import { actions } from "./actions";

export const make = async (
  context: NewsApiContext
): Promise<NewsApiContextValue> =>
  makeApi<NewsApiActions, NewsApiContext>({
    actions,
    context
  });
