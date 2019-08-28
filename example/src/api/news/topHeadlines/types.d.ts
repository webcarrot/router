import {
  NewsActionFunction,
  NewsCategory,
  NewsArticlesResponse
} from "../types";

export type NewsTopHeadlinesPayload = {
  /**
   * Keywords or a phrase to search for.
   */
  q?: string;
  /**
   * A comma-seperated string of identifiers (maximum 20) for the news sources or blogs you want headlines from. Use the /sources endpoint to locate these programmatically or look at the sources index.
   */
  sources?: string;
  /**
   * The category you want to get headlines for.
   */
  category?: NewsCategory;
  /**
   * The number of results to return per page. 20 is the default, 100 is the maximum.
   */
  pageSize?: number;
  /**
   * Use this to page through the results.
   */
  page?: number;
};

export { NewsArticlesResponse };

export type NewsTopHeadlinesActionFunction = NewsActionFunction<
  NewsTopHeadlinesPayload,
  NewsArticlesResponse
>;
