import {
  NewsActionFunction,
  NewsLanguage,
  NewsSortBy,
  NewsArticlesResponse
} from "../types";

export type NewsEverythingPayload = {
  /**
   * Keywords or phrases to search for in the article title and body.
   *
   * Advanced search is supported here:
   * - Surround phrases with quotes (") for exact match.
   * - Prepend words or phrases that must appear with a + symbol. Eg: +bitcoin
   * - Prepend words that must not appear with a - symbol. Eg: -bitcoin
   * - Alternatively you can use the AND / OR / NOT keywords, and optionally group these with parenthesis. Eg: crypto AND (ethereum OR litecoin) NOT bitcoin.
   *
   * The complete value for q must be URL-encoded.
   */
  q?: string;
  /**
   * Keywords or phrases to search for in the article title only.
   *
   * Advanced search is supported here:
   * - Surround phrases with quotes (") for exact match.
   * - Prepend words or phrases that must appear with a + symbol. Eg: +bitcoin
   * - Prepend words that must not appear with a - symbol. Eg: -bitcoin
   * - Alternatively you can use the AND / OR / NOT keywords, and optionally group these with parenthesis. Eg: crypto AND (ethereum OR litecoin) NOT bitcoin.
   *
   * The complete value for qInTitle must be URL-encoded.
   */
  qInTitle?: string;
  /**
   * A comma-seperated string of identifiers (maximum 20) for the news sources or blogs you want headlines from. Use the /sources endpoint to locate these programmatically or look at the sources index.
   */
  sources?: string;
  /**
   * A comma-seperated string of domains (eg bbc.co.uk, techcrunch.com, engadget.com) to restrict the search to.
   */
  domains?: string;
  /**
   * A comma-seperated string of domains (eg bbc.co.uk, techcrunch.com, engadget.com) to remove from the results.
   */
  excludeDomains?: string;
  /**
   * A date and optional time for the oldest article allowed. This should be in ISO 8601 format (e.g. 2019-08-28 or 2019-08-28T11:45:16) Default: the oldest according to your plan.
   */
  from?: string;
  /**
   * A date and optional time for the newest article allowed. This should be in ISO 8601 format (e.g. 2019-08-28 or 2019-08-28T11:45:16) Default: the newest according to your plan.
   */
  to?: string;
  /**
   * The 2-letter ISO-639-1 code of the language you want to get headlines for. Default: all languages returned.
   */
  language?: NewsLanguage;
  /**
   * The order to sort the articles in. Possible options: relevancy, popularity, publishedAt.
   *
   * Default: publishedAt
   */
  sortBy?: NewsSortBy;
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

export type NewsEverythingActionFunction = NewsActionFunction<
  NewsEverythingPayload,
  NewsArticlesResponse
>;
